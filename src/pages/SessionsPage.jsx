import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Alert,
  CircularProgress,
  Paper,
  Avatar,
  Divider,
  Button,
  IconButton,
  Tooltip,
  Fade,
  Slide,
  Collapse,
  Badge,
  Stack
} from '@mui/material';
import {
  Security,
  Computer,
  Smartphone,
  Tablet,
  DevicesOther,
  Schedule,
  CheckCircle,
  Cancel,
  ExpandMore,
  ExpandLess,
  Refresh,
  Warning,
  Info,
  LocationOn,
  Public,
  Wifi,
  WifiOff
} from '@mui/icons-material';
import { useQuery } from '@apollo/client';
import { GET_USER_SESSIONS } from '../apollo/queries';
import { FullScreenLoader } from '../components/LoadingBar';

const getDeviceIcon = (deviceType) => {
  switch (deviceType?.toLowerCase()) {
    case 'mobile':
    case 'phone':
      return <Smartphone />;
    case 'tablet':
      return <Tablet />;
    case 'desktop':
    case 'computer':
      return <Computer />;
    default:
      return <DevicesOther />;
  }
};

const getBrowserIcon = (browser) => {
  const browserName = browser?.toLowerCase() || '';
  // В реальном приложении здесь можно использовать иконки браузеров
  return browser || 'Неизвестный браузер';
};

const getActivityStatus = (session) => {
  if (!session.active) return { label: 'Неактивна', color: 'default' };
  
  if (!session.lastAccessTime) return { label: 'Активна', color: 'success' };
  
  const now = new Date();
  // Convert Unix timestamp (seconds) to milliseconds for JavaScript Date
  const lastAccess = new Date(parseInt(session.lastAccessTime) * 1000);
  const diffInMinutes = Math.floor((now - lastAccess) / (1000 * 60));
  
  if (diffInMinutes < 30) {
    return { label: 'Онлайн', color: 'success' };
  } else if (diffInMinutes < 60 * 24) {
    return { label: 'Активна', color: 'warning' };
  } else {
    return { label: 'Неактивна', color: 'default' };
  }
};

const SessionCard = ({ session, isExpanded, onToggleExpand }) => {
  const [showDetails, setShowDetails] = useState(false);

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Неизвестно';
    return new Date(parseInt(timestamp) * 1000).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeAgo = (timestamp) => {
    if (!timestamp) return 'Неизвестно';
    const now = new Date();
    const sessionDate = new Date(parseInt(timestamp) * 1000);
    const diffInMs = now - sessionDate;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays} ${diffInDays === 1 ? 'день' : diffInDays < 5 ? 'дня' : 'дней'} назад`;
    } else if (diffInHours > 0) {
      return `${diffInHours} ${diffInHours === 1 ? 'час' : diffInHours < 5 ? 'часа' : 'часов'} назад`;
    } else {
      return 'Менее часа назад';
    }
  };

  const status = getActivityStatus(session);
  const isOnline = status.color === 'success';
  const isActive = status.color === 'warning';

  return (
    <Fade in={true} timeout={300}>
      <Card sx={{ 
        mb: 2, 
        width: '100%',
        maxWidth: 'none',
        boxSizing: 'border-box',
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        background: isOnline 
          ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.02) 0%, rgba(76, 175, 80, 0.05) 100%)'
          : isActive
          ? 'linear-gradient(135deg, rgba(255, 152, 0, 0.02) 0%, rgba(255, 152, 0, 0.05) 100%)'
          : 'linear-gradient(135deg, rgba(0, 0, 0, 0.01) 0%, rgba(0, 0, 0, 0.03) 100%)',
        border: isOnline 
          ? '1px solid rgba(76, 175, 80, 0.2)' 
          : isActive
          ? '1px solid rgba(255, 152, 0, 0.2)'
          : '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: isOnline 
          ? '0 4px 20px rgba(76, 175, 80, 0.1)' 
          : '0 2px 12px rgba(0, 0, 0, 0.06)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: isOnline 
            ? '0 8px 32px rgba(76, 175, 80, 0.15)' 
            : '0 6px 20px rgba(0, 0, 0, 0.1)',
        }
      }}>
        {/* Status Indicator Bar */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: isOnline 
              ? 'linear-gradient(90deg, #4caf50, #66bb6a)'
              : isActive
              ? 'linear-gradient(90deg, #ff9800, #ffb74d)'
              : 'linear-gradient(90deg, #9e9e9e, #bdbdbd)',
            animation: isOnline ? 'shimmer 2s infinite' : 'none',
            '@keyframes shimmer': {
              '0%': { opacity: 0.8 },
              '50%': { opacity: 1 },
              '100%': { opacity: 0.8 },
            }
          }}
        />

        <CardContent sx={{ p: 0 }}>
          <Box sx={{ 
            p: { xs: 2, sm: 3 }, 
            pb: showDetails ? { xs: 1, sm: 2 } : { xs: 2, sm: 3 } 
          }}>
            {/* Desktop Layout */}
            <Box 
              display={{ xs: 'none', md: 'flex' }} 
              alignItems="center" 
              justifyContent="space-between"
            >
              {/* Left Section - Device Info */}
              <Box display="flex" alignItems="center" flex={1} minWidth={0}>
                {/* Device Icon */}
                <Box sx={{ position: 'relative', mr: 2 }}>
                  <Avatar sx={{ 
                    width: 48,
                    height: 48,
                    bgcolor: isOnline ? 'success.light' : isActive ? 'warning.light' : 'grey.100',
                    color: isOnline ? 'success.contrastText' : isActive ? 'warning.contrastText' : 'grey.600',
                    fontSize: 20,
                    border: isOnline ? '2px solid rgba(76, 175, 80, 0.3)' : isActive ? '2px solid rgba(255, 152, 0, 0.3)' : '2px solid rgba(0, 0, 0, 0.1)'
                  }}>
                    {getDeviceIcon(session.deviceType)}
                  </Avatar>
                  {/* Online Indicator */}
                  {isOnline && (
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: -2,
                        right: -2,
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        bgcolor: 'success.main',
                        border: '3px solid white',
                        animation: 'pulse 2s infinite',
                        '@keyframes pulse': {
                          '0%': { transform: 'scale(1)', opacity: 1 },
                          '50%': { transform: 'scale(1.1)', opacity: 0.8 },
                          '100%': { transform: 'scale(1)', opacity: 1 },
                        }
                      }}
                    />
                  )}
                </Box>

                {/* Device Details */}
                <Box flex={1} minWidth={0}>
                  <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        color: 'text.primary',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {session.device || 'Неизвестное устройство'}
                    </Typography>
                    <Chip
                      icon={isOnline ? <Wifi /> : isActive ? <WifiOff /> : <Cancel />}
                      label={status.label}
                      color={status.color}
                      size="small"
                      sx={{ 
                        fontWeight: 500,
                        fontSize: '0.75rem',
                        height: 24,
                        '& .MuiChip-icon': {
                          fontSize: 14
                        }
                      }}
                    />
                  </Box>

                  <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                    {session.deviceBrand && (
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          fontSize: '0.875rem'
                        }}
                      >
                        <Computer sx={{ mr: 0.5, fontSize: 14 }} />
                        {session.deviceBrand}
                      </Typography>
                    )}
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        fontSize: '0.875rem'
                      }}
                    >
                      <Public sx={{ mr: 0.5, fontSize: 14 }} />
                      {session.browser || 'Неизвестный браузер'}
                    </Typography>
                  </Stack>
                </Box>
              </Box>

              {/* Right Section - Time & Actions */}
              <Box display="flex" alignItems="center" gap={2}>
                {/* Time Info */}
                <Box textAlign="right" minWidth={120}>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      fontSize: '0.875rem',
                      mb: 0.5
                    }}
                  >
                    <Schedule sx={{ mr: 0.5, fontSize: 14 }} />
                    {session.lastAccessTime ? getTimeAgo(session.lastAccessTime) : getTimeAgo(session.createdAt)}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{ fontSize: '0.75rem' }}
                  >
                    {formatDate(session.createdAt)}
                  </Typography>
                </Box>

                {/* Expand Button */}
                <Tooltip title={showDetails ? "Скрыть детали" : "Показать детали"}>
                  <IconButton 
                    onClick={() => setShowDetails(!showDetails)}
                    size="small"
                    sx={{ 
                      transition: 'all 0.2s',
                      transform: showDetails ? 'rotate(180deg)' : 'rotate(0deg)',
                      bgcolor: 'action.hover',
                      '&:hover': {
                        bgcolor: 'action.selected',
                        transform: showDetails ? 'rotate(180deg) scale(1.1)' : 'rotate(0deg) scale(1.1)'
                      }
                    }}
                  >
                    <ExpandMore fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            {/* Mobile/Tablet Layout */}
            <Box display={{ xs: 'block', md: 'none' }}>
              {/* Header Row */}
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Box display="flex" alignItems="center" flex={1} minWidth={0}>
                  {/* Device Icon */}
                  <Box sx={{ position: 'relative', mr: 2 }}>
                    <Avatar sx={{ 
                      width: { xs: 40, sm: 44 },
                      height: { xs: 40, sm: 44 },
                      bgcolor: isOnline ? 'success.light' : isActive ? 'warning.light' : 'grey.100',
                      color: isOnline ? 'success.contrastText' : isActive ? 'warning.contrastText' : 'grey.600',
                      fontSize: { xs: 18, sm: 20 },
                      border: isOnline ? '2px solid rgba(76, 175, 80, 0.3)' : isActive ? '2px solid rgba(255, 152, 0, 0.3)' : '2px solid rgba(0, 0, 0, 0.1)'
                    }}>
                      {getDeviceIcon(session.deviceType)}
                    </Avatar>
                    {/* Online Indicator */}
                    {isOnline && (
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: -2,
                          right: -2,
                          width: { xs: 14, sm: 16 },
                          height: { xs: 14, sm: 16 },
                          borderRadius: '50%',
                          bgcolor: 'success.main',
                          border: '3px solid white',
                          animation: 'pulse 2s infinite',
                          '@keyframes pulse': {
                            '0%': { transform: 'scale(1)', opacity: 1 },
                            '50%': { transform: 'scale(1.1)', opacity: 0.8 },
                            '100%': { transform: 'scale(1)', opacity: 1 },
                          }
                        }}
                      />
                    )}
                  </Box>

                  {/* Device Name & Status */}
                  <Box flex={1} minWidth={0}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600,
                        fontSize: { xs: '1rem', sm: '1.1rem' },
                        color: 'text.primary',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        mb: 0.5
                      }}
                    >
                      {session.device || 'Неизвестное устройство'}
                    </Typography>
                    <Chip
                      icon={isOnline ? <Wifi /> : isActive ? <WifiOff /> : <Cancel />}
                      label={status.label}
                      color={status.color}
                      size="small"
                      sx={{ 
                        fontWeight: 500,
                        fontSize: { xs: '0.7rem', sm: '0.75rem' },
                        height: { xs: 20, sm: 24 },
                        '& .MuiChip-icon': {
                          fontSize: { xs: 12, sm: 14 }
                        }
                      }}
                    />
                  </Box>
                </Box>

                {/* Expand Button */}
                <Tooltip title={showDetails ? "Скрыть детали" : "Показать детали"}>
                  <IconButton 
                    onClick={() => setShowDetails(!showDetails)}
                    size="small"
                    sx={{ 
                      transition: 'all 0.2s',
                      transform: showDetails ? 'rotate(180deg)' : 'rotate(0deg)',
                      bgcolor: 'action.hover',
                      '&:hover': {
                        bgcolor: 'action.selected',
                        transform: showDetails ? 'rotate(180deg) scale(1.1)' : 'rotate(0deg) scale(1.1)'
                      }
                    }}
                  >
                    <ExpandMore fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>

              {/* Device Details Row */}
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={{ xs: 1, sm: 2 }} 
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                mb={2}
                flexWrap="wrap"
              >
                {session.deviceBrand && (
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      fontSize: { xs: '0.8rem', sm: '0.875rem' }
                    }}
                  >
                    <Computer sx={{ mr: 0.5, fontSize: { xs: 12, sm: 14 } }} />
                    {session.deviceBrand}
                  </Typography>
                )}
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    fontSize: { xs: '0.8rem', sm: '0.875rem' }
                  }}
                >
                  <Public sx={{ mr: 0.5, fontSize: { xs: 12, sm: 14 } }} />
                  {session.browser || 'Неизвестный браузер'}
                </Typography>
              </Stack>

              {/* Time Info Row */}
              <Box 
                display="flex" 
                alignItems="center" 
                justifyContent="space-between"
                sx={{ 
                  bgcolor: 'grey.50', 
                  p: 1.5, 
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    fontSize: { xs: '0.8rem', sm: '0.875rem' }
                  }}
                >
                  <Schedule sx={{ mr: 0.5, fontSize: { xs: 12, sm: 14 } }} />
                  {session.lastAccessTime ? getTimeAgo(session.lastAccessTime) : getTimeAgo(session.createdAt)}
                </Typography>
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ 
                    fontSize: { xs: '0.7rem', sm: '0.75rem' },
                    textAlign: 'right'
                  }}
                >
                  {formatDate(session.createdAt)}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Expanded Details */}
          <Collapse in={showDetails} timeout="auto" unmountOnExit>
            <Box sx={{ 
              bgcolor: 'grey.50', 
              borderTop: '1px solid',
              borderColor: 'divider',
              p: 3
            }}>
              <Stack spacing={2}>
                {session.lastAccessTime && session.lastAccessTime !== session.createdAt && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontSize: '0.875rem' }}>
                      Последний доступ
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                      {formatDate(session.lastAccessTime)}
                    </Typography>
                  </Box>
                )}
                
                {session.id && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontSize: '0.875rem' }}>
                      ID сессии
                    </Typography>
                    <Typography 
                      variant="body2" 
                      fontFamily="monospace" 
                      sx={{ 
                        bgcolor: 'white', 
                        p: 1.5, 
                        borderRadius: 1,
                        wordBreak: 'break-all',
                        fontSize: '0.8rem',
                        border: '1px solid',
                        borderColor: 'divider'
                      }}
                    >
                      {session.id}
                    </Typography>
                  </Box>
                )}
              </Stack>
            </Box>
          </Collapse>
        </CardContent>
      </Card>
    </Fade>
  );
};

const SessionsPage = () => {
  const { data, loading, error, refetch } = useQuery(GET_USER_SESSIONS);
  const [expandedSections, setExpandedSections] = useState({
    active: true,
    inactive: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        flexDirection="column"
        justifyContent="center" 
        alignItems="center" 
        minHeight="60vh"
        gap={2}
        px={{ xs: 2, sm: 3, md: 4 }}
        py={{ xs: 2, sm: 3 }}
      >
        <CircularProgress size={{ xs: 40, sm: 48 }} thickness={4} />
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{
            fontSize: { xs: '0.875rem', sm: '1rem' }
          }}
        >
          Загрузка сессий...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        width: '100%', 
        maxWidth: 'none',
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 2, sm: 3 }
      }}>
        <Box display="flex" alignItems="center" mb={3}>
          <Security sx={{ 
            mr: 2, 
            fontSize: { xs: 24, sm: 32 }, 
            color: 'error.main' 
          }} />
          <Typography 
            variant="h4" 
            component="h1" 
            color="error.main"
            sx={{
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
            }}
          >
            Ошибка загрузки
          </Typography>
        </Box>
        <Alert 
          severity="error" 
          action={
            <Button 
              color="inherit" 
              size="small" 
              onClick={() => refetch()}
              sx={{
                fontSize: { xs: '0.75rem', sm: '0.875rem' }
              }}
            >
              <Refresh sx={{ mr: 1, fontSize: { xs: 16, sm: 18 } }} />
              Повторить
            </Button>
          }
          sx={{
            borderRadius: { xs: 2, sm: 3 }
          }}
        >
          <Typography 
            variant="subtitle2" 
            gutterBottom
            sx={{
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            Не удалось загрузить сессии
          </Typography>
          <Typography 
            variant="body2"
            sx={{
              fontSize: { xs: '0.8rem', sm: '0.875rem' }
            }}
          >
            {error.message}
          </Typography>
        </Alert>
      </Box>
    );
  }

  const sessions = data?.sessionGetAllByUser || [];
  const activeSessions = sessions.filter(session => {
    const status = getActivityStatus(session);
    return status.color === 'success' || status.color === 'warning';
  });
  const inactiveSessions = sessions.filter(session => {
    const status = getActivityStatus(session);
    return status.color === 'default';
  });

  return (
    <Box sx={{ 
      width: '100%', 
      maxWidth: 'none',
      px: { xs: 2, sm: 3, md: 4 },
      py: { xs: 2, sm: 3 }
    }}>
      {/* Header */}
      <Slide direction="down" in={true} timeout={600}>
        <Box sx={{ mb: { xs: 3, sm: 4 } }}>
          <Box 
            display="flex" 
            alignItems={{ xs: 'flex-start', sm: 'center' }} 
            justifyContent="space-between" 
            mb={2}
            flexDirection={{ xs: 'column', sm: 'row' }}
            gap={{ xs: 2, sm: 0 }}
          >
            <Box display="flex" alignItems="center" flex={1}>
              <Box
                sx={{
                  width: { xs: 40, sm: 48 },
                  height: { xs: 40, sm: 48 },
                  borderRadius: 2,
                  bgcolor: 'primary.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                  flexShrink: 0
                }}
              >
                <Security sx={{ 
                  fontSize: { xs: 20, sm: 24 }, 
                  color: 'primary.contrastText' 
                }} />
              </Box>
              <Box minWidth={0} flex={1}>
                <Typography 
                  variant="h4" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 700,
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
                    lineHeight: 1.2
                  }}
                >
                  Управление сессиями
                </Typography>
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    mt: 0.5
                  }}
                >
                  Мониторинг и контроль доступа к вашему аккаунту
                </Typography>
              </Box>
            </Box>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={() => refetch()}
              sx={{ 
                borderRadius: 2,
                minWidth: { xs: '100%', sm: 'auto' },
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              Обновить
            </Button>
          </Box>
        </Box>
      </Slide>

      {sessions.length === 0 ? (
        <Fade in={true} timeout={800}>
          <Alert 
            severity="info" 
            sx={{ 
              borderRadius: 3,
              '& .MuiAlert-icon': {
                fontSize: 28
              }
            }}
          >
            <Typography variant="subtitle2" gutterBottom>
              Нет активных сессий
            </Typography>
            <Typography variant="body2">
              У вас пока нет активных сессий входа в систему.
            </Typography>
          </Alert>
        </Fade>
      ) : (
        <Box sx={{ width: '100%', maxWidth: 'none' }}>
          {/* Активные сессии */}
          {activeSessions.length > 0 && (
            <Fade in={true} timeout={800}>
              <Paper 
                sx={{ 
                  p: { xs: 2, sm: 3 }, 
                  mb: { xs: 2, sm: 3 }, 
                  width: '100%', 
                  maxWidth: 'none',
                  borderRadius: { xs: 2, sm: 3 },
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(76, 175, 80, 0.2)'
                }}
              >
                <Box 
                  display="flex" 
                  alignItems="center" 
                  justifyContent="space-between"
                  mb={2}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => toggleSection('active')}
                >
                  <Box display="flex" alignItems="center" flex={1} minWidth={0}>
                    <CheckCircle sx={{ 
                      mr: 1, 
                      color: 'success.main', 
                      fontSize: { xs: 20, sm: 24 },
                      flexShrink: 0
                    }} />
                    <Typography 
                      variant="h6" 
                      color="success.main" 
                      sx={{ 
                        fontWeight: 600,
                        fontSize: { xs: '1rem', sm: '1.25rem' },
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      Активные сессии
                    </Typography>
                    <Chip 
                      label={activeSessions.length} 
                      size="small" 
                      color="success" 
                      sx={{ 
                        ml: 1, 
                        fontWeight: 600,
                        fontSize: { xs: '0.7rem', sm: '0.75rem' },
                        height: { xs: 20, sm: 24 }
                      }}
                    />
                  </Box>
                  <IconButton size="small">
                    {expandedSections.active ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </Box>
                
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  paragraph
                  sx={{
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                    mb: { xs: 1, sm: 2 }
                  }}
                >
                  Эти устройства в настоящее время имеют доступ к вашей учетной записи.
                </Typography>

                <Collapse in={expandedSections.active} timeout="auto" unmountOnExit>
                  <Box sx={{ width: '100%' }}>
                    {activeSessions.map((session, index) => (
                      <Slide 
                        key={session.id || Math.random()} 
                        direction="up" 
                        in={true} 
                        timeout={300 + index * 100}
                      >
                        <Box>
                          <SessionCard session={session} />
                        </Box>
                      </Slide>
                    ))}
                  </Box>
                </Collapse>
              </Paper>
            </Fade>
          )}

          {/* Неактивные сессии */}
          {inactiveSessions.length > 0 && (
            <Fade in={true} timeout={1000}>
              <Paper 
                sx={{ 
                  p: { xs: 2, sm: 3 }, 
                  width: '100%', 
                  maxWidth: 'none',
                  borderRadius: { xs: 2, sm: 3 },
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(0, 0, 0, 0.08)'
                }}
              >
                <Box 
                  display="flex" 
                  alignItems="center" 
                  justifyContent="space-between"
                  mb={2}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => toggleSection('inactive')}
                >
                  <Box display="flex" alignItems="center" flex={1} minWidth={0}>
                    <Cancel sx={{ 
                      mr: 1, 
                      color: 'text.secondary', 
                      fontSize: { xs: 20, sm: 24 },
                      flexShrink: 0
                    }} />
                    <Typography 
                      variant="h6" 
                      color="text.secondary" 
                      sx={{ 
                        fontWeight: 600,
                        fontSize: { xs: '1rem', sm: '1.25rem' },
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      Недавние сессии
                    </Typography>
                    <Chip 
                      label={inactiveSessions.length} 
                      size="small" 
                      color="default" 
                      sx={{ 
                        ml: 1, 
                        fontWeight: 600,
                        fontSize: { xs: '0.7rem', sm: '0.75rem' },
                        height: { xs: 20, sm: 24 }
                      }}
                    />
                  </Box>
                  <IconButton size="small">
                    {expandedSections.inactive ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </Box>
                
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  paragraph
                  sx={{
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                    mb: { xs: 1, sm: 2 }
                  }}
                >
                  Эти устройства недавно имели доступ к вашей учетной записи, но больше не активны.
                </Typography>

                <Collapse in={expandedSections.inactive} timeout="auto" unmountOnExit>
                  <Box sx={{ width: '100%' }}>
                    {inactiveSessions.map((session, index) => (
                      <Slide 
                        key={session.id || Math.random()} 
                        direction="up" 
                        in={true} 
                        timeout={300 + index * 100}
                      >
                        <Box>
                          <SessionCard session={session} />
                        </Box>
                      </Slide>
                    ))}
                  </Box>
                </Collapse>
              </Paper>
            </Fade>
          )}
        </Box>
      )}

      {/* Security Info */}
      <Fade in={true} timeout={1200}>
        <Box mt={{ xs: 3, sm: 4 }}>
          <Alert 
            severity="info" 
            sx={{ 
              borderRadius: { xs: 2, sm: 3 },
              '& .MuiAlert-icon': {
                fontSize: { xs: 24, sm: 28 }
              }
            }}
          >
            <Typography 
              variant="subtitle2" 
              gutterBottom 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              <Warning sx={{ mr: 1, fontSize: { xs: 18, sm: 20 } }} />
              Безопасность аккаунта
            </Typography>
            <Typography 
              variant="body2"
              sx={{
                fontSize: { xs: '0.8rem', sm: '0.875rem' }
              }}
            >
              Если вы видите незнакомые устройства или подозрительную активность,
              рекомендуется сменить пароль и обратиться к администратору.
            </Typography>
          </Alert>
        </Box>
      </Fade>
    </Box>
  );
};

export default SessionsPage;
