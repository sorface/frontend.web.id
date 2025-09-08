import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import './LoadingBar.css';

const LoadingBar = ({ message = 'Загрузка...', showMessage = true }) => {
  return (
    <Box className="loading-bar-container">
      <Box className="loading-bar-content">
        <LinearProgress 
          className="loading-bar-progress"
          sx={{
            height: 4,
            borderRadius: 2,
            backgroundColor: 'rgba(25, 118, 210, 0.1)',
            '& .MuiLinearProgress-bar': {
              borderRadius: 2,
              backgroundColor: '#1976d2',
            }
          }}
        />
        {showMessage && (
          <Typography 
            variant="body2" 
            color="text.secondary"
            className="loading-bar-message"
            sx={{ mt: 2 }}
          >
            {message}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default LoadingBar;
