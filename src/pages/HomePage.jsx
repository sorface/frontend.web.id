import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent
} from '@mui/material';
import {
  Devices,
  Apps
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <Box className="home-page-container">
      <Box className="home-page-content">
        {/* Profile Widget Card - Based on provided mockup */}
        <Box className="profile-card-container">
          <Card className="profile-card">
            <CardContent className="profile-card-content">
              <Box className="profile-info-container">
                {/* Gradient ring avatar */}
                <Box className="avatar-gradient-ring">
                  <Avatar 
                    className="profile-avatar"
                    src={user?.avatar || undefined}
                  >
                    {!user?.avatar && (user?.firstName?.[0]?.toUpperCase() || user?.username?.[0]?.toUpperCase() || 'U')}
                  </Avatar>
                </Box>

                {/* Text block */}
                <Box className="profile-text-block">
                  <Typography className="profile-name">
                    {user?.firstName || user?.lastName
                      ? `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim()
                      : user?.username || 'Пользователь'}
                  </Typography>
                  <Typography className="profile-username">
                    @{user?.displayName || user?.username || '—'}
                  </Typography>
                  {user?.email && (
                    <Typography className="profile-email">
                      {user.email}
                    </Typography>
                  )}

                  <Typography className="profile-additional-info">
                    {[
                      user?.birthDate,
                      user?.city
                    ].filter(Boolean).join(' • ')}
                  </Typography>
                </Box>

              </Box>
            </CardContent>
          </Card>
        </Box>
        {/* Security Section */}
        <Box className="section-container">
          <Typography variant="h6" className="section-title">
            Безопасность
          </Typography>

          <Box className="security-cards-grid">
            <Card
              className="feature-card"
              onClick={() => navigate('/sessions')}
            >
              <CardContent className="feature-card-content">
                <Box className="feature-icon-container">
                  <Devices className="feature-icon" />
                </Box>
                <Typography variant="body2" className="feature-card-text">
                  Устройства
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Applications Section */}
        {isAdmin() && (
          <Box className="section-container">
            <Typography variant="h6" className="section-title">
              Администрирование
            </Typography>

            <Box className="admin-cards-grid">
              {/* Карточка управления приложениями - только для админов */}

              <Card
                className="feature-card"
                onClick={() => navigate('/app-management')}
              >
                <CardContent className="feature-card-content">
                  <Box className="feature-icon-container">
                    <Apps className="feature-icon" />
                  </Box>
                  <Typography variant="body2" className="admin-feature-card-text">
                    Управление приложениями
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>
        )}

      </Box>
    </Box>
  );
};

export default HomePage;
