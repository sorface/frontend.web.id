import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Grid,
  Alert,
  CircularProgress,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_APPLICATIONS } from '../apollo/queries';
import { useAuth } from '../contexts/AuthContext';

const AppManagementPage = () => {
  const { user } = useAuth();
  const [selectedApp, setSelectedApp] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Проверяем, есть ли у пользователя роль ROLE_ADMIN
  const isAdmin = user?.roles?.some(role => role.code === 'ROLE_ADMIN');

  const { data, loading, error, refetch } = useQuery(GET_ALL_APPLICATIONS, {
    skip: !isAdmin
  });

  const handleRefresh = () => {
    refetch();
  };

  const handleViewApp = (app) => {
    setSelectedApp(app);
    setIsViewDialogOpen(true);
  };

  const handleEditApp = (app) => {
    setSelectedApp(app);
    setIsEditDialogOpen(true);
  };

  const handleDeleteApp = (app) => {
    // TODO: Implement delete functionality
    console.log('Delete app:', app);
  };

  const handleCreateApp = () => {
    setSelectedApp(null);
    setIsCreateDialogOpen(true);
  };

  if (!isAdmin) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          У вас нет прав для доступа к управлению приложениями. Требуется роль ROLE_ADMIN.
        </Alert>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Ошибка при загрузке приложений: {error.message}
        </Alert>
      </Box>
    );
  }

  const applications = data?.applicationGetAll || [];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight={600}>
          Управление приложениями
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Обновить">
            <IconButton onClick={handleRefresh} color="primary">
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateApp}
            sx={{ textTransform: 'none' }}
          >
            Создать приложение
          </Button>
        </Box>
      </Box>

      <Card>
        <CardContent sx={{ p: 0 }}>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Название</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Client ID</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Методы аутентификации</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Типы грантов</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Создано</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applications.map((app, index) => (
                  <TableRow key={app.clientId || index} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight={500}>
                        {app.clientName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontFamily="monospace" fontSize="0.8rem">
                        {app.clientId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {app.methods?.map((method, idx) => (
                          <Chip
                            key={idx}
                            label={method.method}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: '0.7rem' }}
                          />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {app.grantTypes?.map((grant, idx) => (
                          <Chip
                            key={idx}
                            label={grant.grantType}
                            size="small"
                            variant="outlined"
                            color="primary"
                            sx={{ fontSize: '0.7rem' }}
                          />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(app.clientIdIssueAt).toLocaleDateString('ru-RU')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Tooltip title="Просмотр">
                          <IconButton
                            size="small"
                            onClick={() => handleViewApp(app)}
                            color="primary"
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Редактировать">
                          <IconButton
                            size="small"
                            onClick={() => handleEditApp(app)}
                            color="primary"
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Удалить">
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteApp(app)}
                            color="error"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {applications.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Приложения не найдены
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Создайте первое приложение, нажав кнопку "Создать приложение"
          </Typography>
        </Box>
      )}

      {/* Диалог просмотра приложения */}
      <Dialog
        open={isViewDialogOpen}
        onClose={() => setIsViewDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Детали приложения</DialogTitle>
        <DialogContent>
          {selectedApp && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Название"
                  value={selectedApp.clientName}
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Client ID"
                  value={selectedApp.clientId}
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Redirect URIs:
                </Typography>
                {selectedApp.redirectUris?.map((uri, idx) => (
                  <Chip
                    key={idx}
                    label={uri.url}
                    size="small"
                    sx={{ mr: 1, mb: 1 }}
                  />
                ))}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Scopes:
                </Typography>
                {selectedApp.scopes?.map((scope, idx) => (
                  <Chip
                    key={idx}
                    label={scope.scope}
                    size="small"
                    color="secondary"
                    sx={{ mr: 1, mb: 1 }}
                  />
                ))}
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={selectedApp.clientSetting?.requireConcept || false}
                      disabled
                    />
                  }
                  label="Требовать концепт"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={selectedApp.clientSetting?.requireProofKey || false}
                      disabled
                    />
                  }
                  label="Требовать Proof Key"
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsViewDialogOpen(false)}>
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>

      {/* Диалог редактирования приложения */}
      <Dialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Редактировать приложение</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            Функция редактирования будет реализована в следующих версиях
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditDialogOpen(false)}>
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>

      {/* Диалог создания приложения */}
      <Dialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Создать приложение</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            Функция создания приложений будет реализована в следующих версиях
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCreateDialogOpen(false)}>
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AppManagementPage;