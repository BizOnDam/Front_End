import React from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './contexts/AuthContext';
import { ServiceProvider } from './contexts/ServiceContext';
import { setupTokenInterceptor } from './api/tokenInterceptor';
import App from './App'

setupTokenInterceptor();
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ServiceProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ServiceProvider>
  </React.StrictMode>
);
