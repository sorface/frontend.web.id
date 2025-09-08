// Environment configuration helper for Vite
// Access environment variables using import.meta.env

export const config = {
  // App Environment
  APP_ENV: import.meta.env.VITE_APP_ENV || 'development',
  
  // API Configuration
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  GRAPHQL_ENDPOINT: import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql',
  
  // Application Settings
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Passport Client',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '0.1.0',
  
  // Debug Settings
  DEBUG: import.meta.env.VITE_DEBUG === 'true',
  LOG_LEVEL: import.meta.env.VITE_LOG_LEVEL || 'info',
  
  // Apollo Client Settings
  APOLLO_DEVTOOLS: import.meta.env.VITE_APOLLO_DEVTOOLS === 'true',
  
  // Authentication
  AUTH_TOKEN_KEY: import.meta.env.VITE_AUTH_TOKEN_KEY || 'auth_token',
  REFRESH_TOKEN_KEY: import.meta.env.VITE_REFRESH_TOKEN_KEY || 'refresh_token',
  
  // Session Configuration
  SESSION_TIMEOUT: parseInt(import.meta.env.VITE_SESSION_TIMEOUT) || 3600000,
  
  // Development helpers
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

// Helper function to log configuration in development
if (config.DEBUG && config.isDevelopment) {
  console.log('Environment Configuration:', config);
}

export default config;
