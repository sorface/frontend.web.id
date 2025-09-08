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

const HomePage = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        flex: 1,
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 64px)',
        p: 0,
        '@media (max-width: 768px)': {
          minHeight: 'calc(100vh - 56px)', // Меньшая высота header на мобильных
          pt: 1
        }
      }}
    >
      <Box sx={{
        maxWidth: 600,
        width: '100%',
        px: 3,
        '@media (max-width: 768px)': {
          px: 2, // Меньшие отступы на мобильных
          maxWidth: '100%'
        },
        '@media (max-width: 480px)': {
          px: 1 // Минимальные отступы на очень маленьких экранах
        }
      }}>
        {/* Profile Widget Card - Based on provided mockup */}
        <Box sx={{ mb: 3 }}>
          <Card
            sx={{
              width: '100%',
              backgroundColor: '#f6f7fb',
              border: '1px solid #eceef3',
              borderRadius: '28px',
              boxShadow: '0 4px 18px rgba(24, 39, 75, 0.05)',
              transition: 'transform .2s ease',
              '&:hover': { transform: 'translateY(-1px)' }
            }}
          >
            <CardContent sx={{ p: 3, '@media (min-width: 480px)': { p: 4 } }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2.5
              }}>
                {/* Gradient ring avatar */}
                <Box sx={{
                  p: '3px',
                  borderRadius: '50%',
                  background: 'conic-gradient(from 180deg, #FF4D97, #7B61FF, #FF8A00, #FF4D97)'
                }}>
                  <Avatar
                    sx={{
                      width: 72,
                      height: 72,
                      bgcolor: '#ffffff',
                      color: '#2c2c2c',
                      border: '3px solid #ffffff',
                      fontSize: '1.4rem',
                      fontWeight: 700
                    }}
                  >
                    {user?.firstName?.[0]?.toUpperCase() || user?.username?.[0]?.toUpperCase() || 'U'}
                  </Avatar>
                </Box>

                {/* Text block */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#1f2330',
                    lineHeight: 1.2,
                    mb: 0.5,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {user?.firstName || user?.lastName
                      ? `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim()
                      : user?.username || 'Пользователь'}
                  </Typography>
                  <Typography sx={{
                    color: '#7d8399',
                    fontSize: '1rem',
                    mb: 0.5,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    @{user?.displayName || user?.username || '—'}
                  </Typography>
                  {user?.email && (
                    <Typography sx={{
                      color: '#7d8399',
                      fontSize: '1rem',
                      mb: 0.5,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {user.email}
                    </Typography>
                  )}

                  <Typography sx={{ color: '#7d8399', fontSize: '1rem' }}>
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
        <Box sx={{
          mt: 4,
          '@media (max-width: 768px)': {
            mt: 3
          },
          '@media (max-width: 480px)': {
            mt: 2
          }
        }}>
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              fontWeight: 600,
              color: '#333333',
              fontSize: '1.25rem',
              '@media (max-width: 768px)': {
                mb: 2,
                fontSize: '1.1rem'
              },
              '@media (max-width: 480px)': {
                mb: 1.5,
                fontSize: '1rem',
                textAlign: 'center'
              }
            }}
          >
            Безопасность
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              justifyContent: 'flex-start',
              mb: 5,
              '& > *': {
                flex: '1 1 calc(25% - 12px)',
                minWidth: '140px',
                maxWidth: '200px'
              },
              '@media (max-width: 900px)': {
                gap: 1.5,
                '& > *': {
                  flex: '1 1 calc(50% - 6px)',
                  minWidth: '120px'
                }
              },
              '@media (max-width: 600px)': {
                gap: 1,
                '& > *': {
                  flex: '1 1 calc(50% - 4px)',
                  minWidth: '100px'
                }
              },
              '@media (max-width: 480px)': {
                gap: 1,
                mb: 3,
                '& > *': {
                  flex: '1 1 100%',
                  maxWidth: 'none'
                }
              }
            }}
          >
            <Card
              sx={{
                backgroundColor: '#f6f7fb',
                border: '1px solid #eceef3',
                borderRadius: '20px',
                boxShadow: '0 4px 18px rgba(24, 39, 75, 0.05)',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
                height: '140px',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': { transform: 'translateY(-1px)' }
              }}
              onClick={() => navigate('/sessions')}
            >
              <CardContent sx={{
                p: 3,
                textAlign: 'center',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                '&:last-child': { pb: 3 }
              }}>
                <Box sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  '@media (max-width: 768px)': {
                    width: 40,
                    height: 40,
                    mb: 1.5
                  },
                  '@media (max-width: 480px)': {
                    width: 36,
                    height: 36,
                    mb: 1
                  }
                }}>
                  <Devices sx={{
                    fontSize: 24,
                    color: '#757575',
                    '@media (max-width: 768px)': {
                      fontSize: 20
                    },
                    '@media (max-width: 480px)': {
                      fontSize: 18
                    }
                  }} />
                </Box>
                <Typography variant="body2" sx={{
                  fontWeight: 500,
                  color: '#333333',
                  fontSize: '0.875rem',
                  lineHeight: 1.2
                }}>
                  Устройства
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Applications Section */}
        {isAdmin() && (
          <Box sx={{
            mt: 4,
            '@media (max-width: 768px)': {
              mt: 3
            },
            '@media (max-width: 480px)': {
              mt: 2
            }
          }}>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontWeight: 600,
                color: '#333333',
                fontSize: '1.25rem',
                '@media (max-width: 768px)': {
                  mb: 2,
                  fontSize: '1.1rem'
                },
                '@media (max-width: 480px)': {
                  mb: 1.5,
                  fontSize: '1rem',
                  textAlign: 'center'
                }
              }}
            >
              Администрирование
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                justifyContent: 'flex-start',
                '& > *': {
                  flex: '1 1 calc(25% - 12px)',
                  minWidth: '140px',
                  maxWidth: '200px'
                },
                '@media (max-width: 900px)': {
                  gap: 1.5,
                  '& > *': {
                    flex: '1 1 calc(50% - 6px)',
                    minWidth: '120px'
                  }
                },
                '@media (max-width: 600px)': {
                  gap: 1,
                  '& > *': {
                    flex: '1 1 calc(50% - 4px)',
                    minWidth: '100px'
                  }
                },
                '@media (max-width: 480px)': {
                  gap: 1,
                  '& > *': {
                    flex: '1 1 100%',
                    maxWidth: 'none'
                  }
                }
              }}
            >
              {/* Карточка управления приложениями - только для админов */}

              <Card
                sx={{
                  backgroundColor: '#f6f7fb',
                  border: '1px solid #eceef3',
                  borderRadius: '20px',
                  boxShadow: '0 4px 18px rgba(24, 39, 75, 0.05)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                  height: '140px',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': { transform: 'translateY(-1px)' }
                }}
                onClick={() => navigate('/app-management')}
              >
                <CardContent sx={{
                  p: 3,
                  textAlign: 'center',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  '&:last-child': { pb: 3 }
                }}>
                  <Box sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    '@media (max-width: 768px)': {
                      width: 40,
                      height: 40,
                      mb: 1.5
                    },
                    '@media (max-width: 480px)': {
                      width: 36,
                      height: 36,
                      mb: 1
                    }
                  }}>
                    <Apps sx={{
                      fontSize: 24,
                      color: '#757575',
                      '@media (max-width: 768px)': {
                        fontSize: 20
                      },
                      '@media (max-width: 480px)': {
                        fontSize: 18
                      }
                    }} />
                  </Box>
                  <Typography variant="body2" sx={{
                    fontWeight: 500,
                    color: '#333333',
                    fontSize: '0.875rem',
                    lineHeight: 1.3,
                    '@media (max-width: 480px)': {
                      fontSize: '0.8rem',
                      lineHeight: 1.2
                    }
                  }}>
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
