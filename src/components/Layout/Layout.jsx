import React, { useState } from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, Avatar, Menu, MenuItem, Button } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { config } from '../../config/env';

const Layout = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();

    // Create and submit logout form
    const form = document.createElement('form');
    
    form.method = 'POST';
    form.action = `${config.API_URL}/logout?redirect-location=${encodeURIComponent(window.location.href)}`;
    document.body.appendChild(form);

    form.submit();

    // Fallback local logout
    logout();
  };

  if (!isAuthenticated) {
    return (
      <Box sx={{ width: '100%', minHeight: '100vh' }}>
        {children}
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top Navigation Bar */}
      <AppBar 
        position="static" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: '#ffffff',
          color: '#000000',
          boxShadow: '0 0 0 rgba(0, 0, 0, 0)'
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1, color: '#000000' }}>
            {config.APP_NAME}
            <Typography
              component="span"
              variant="caption"
              sx={{
                ml: 1,
                color: '#666666',
                fontSize: '0.7rem',
                fontWeight: 400
              }}
            >
              v{config.APP_VERSION}
            </Typography>
          </Typography>

          {/* Logout Button */}
          <Button
            variant="outlined"
            onClick={handleLogout}
            sx={{
              ml: 2,
              color: '#000000',
              borderColor: '#000000',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                borderColor: '#000000'
              }
            }}
          >
            Выйти
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            flex: 1,
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#ffffff',
            maxWidth: '1200px',
            width: '100%',
            mx: 'auto',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;