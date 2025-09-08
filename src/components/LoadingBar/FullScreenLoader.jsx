import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import LoadingBar from './LoadingBar';
import './FullScreenLoader.css';

const FullScreenLoader = ({ message = 'Загрузка...' }) => {
  return (
    <Box className="full-screen-loader">
      <Paper 
        elevation={3}
        className="full-screen-loader-content"
        sx={{
          p: 4,
          textAlign: 'center',
          borderRadius: 3,
          maxWidth: 400,
          width: '100%',
          mx: 2
        }}
      >
        <LoadingBar message={message} showMessage={false} />
        <Typography 
          variant="h6" 
          color="text.primary"
          sx={{ mt: 3, mb: 1, fontWeight: 500 }}
        >
          {message}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          Пожалуйста, подождите...
        </Typography>
      </Paper>
    </Box>
  );
};

export default FullScreenLoader;
