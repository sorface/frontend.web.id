import React, { createContext, useContext, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_AUTHORIZED_ACCOUNT } from '../apollo/queries';
import { config } from '../config/env';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const { refetch: refetchUser } = useQuery(GET_AUTHORIZED_ACCOUNT, {
    errorPolicy: 'all',
    onCompleted: (data) => {
      if (data && data.accountGetAuthorized) {
        setUser(data.accountGetAuthorized);
        setIsAuthenticated(true);
      }
      setLoading(false);
    },
    onError: (error) => {
      // console.error('Auth error:', error);
      setLoading(false);
      
      // Проверяем, является ли ошибка 401 (Unauthorized)
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        const graphQLError = error.graphQLErrors[0];
        if (graphQLError.extensions && graphQLError.extensions.status === 401) {
          // Редирект на OAuth2 авторизацию
          const currentUrl = encodeURIComponent(window.location.href);
          const oauthUrl = `${config.API_URL}/oauth2/authorization/passport?redirect-location=${currentUrl}`;
          window.location.href = oauthUrl;
          return;
        }
      }
      
      // Если это сетевая ошибка 401
      if (error.networkError && error.networkError.statusCode === 401) {
        const currentUrl = encodeURIComponent(window.location.href);
        const oauthUrl = `${config.API_URL}/oauth2/authorization/passport?redirect-location=${currentUrl}`;
        window.location.href = oauthUrl;
        return;
      }
      
      // Для других ошибок просто сбрасываем состояние
      setUser(null);
      setIsAuthenticated(false);
    }
  });

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
    refetchUser();
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setUser(null);
  };

  const refreshUser = () => {
    refetchUser();
  };

  const hasRole = (roleCode) => {
    return user?.roles?.some(role => role.code === roleCode);
  };

  const isAdmin = () => {
    return hasRole('ROLE_ADMIN');
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    refreshUser,
    hasRole,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
