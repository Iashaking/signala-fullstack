import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from './hooks/useAuth';
import { SearchProvider } from './hooks/useSearch';
import { queryClient } from './queryClient';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import BaseLayout from './components/Layout/BaseLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SearchPage from './pages/SearchPage';
import SearchResults from './pages/SearchResults';
import SignalsPage from './pages/SignalsPage';
import SavedSearches from './pages/SavedSearches';
import SettingsPage from './pages/SettingsPage';
import ProfileSettings from './pages/ProfileSettings';
import BillingSettings from './pages/BillingSettings';
import NotFoundPage from './pages/NotFoundPage';
import { Toaster } from '@/components/ui/toaster';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Import custom styles
import './styles/variables.css';
import './styles/layout.css';
import './styles/sidebar.css';
import './styles/search-form.css';
import './styles/signal-card.css';
import './styles/search-results.css';
import './styles/responsive.css';

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <SearchProvider>
            <div className="app-container">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Protected Routes with Layout */}
              <Route path="/search" element={
                <ProtectedRoute>
                  <BaseLayout>
                    <SearchPage />
                  </BaseLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/results" element={
                <ProtectedRoute>
                  <BaseLayout>
                    <SearchResults />
                  </BaseLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/signals" element={
                <ProtectedRoute>
                  <BaseLayout>
                    <SignalsPage />
                  </BaseLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/saved" element={
                <ProtectedRoute>
                  <BaseLayout>
                    <SavedSearches />
                  </BaseLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/settings" element={
                <ProtectedRoute>
                  <BaseLayout>
                    <SettingsPage />
                  </BaseLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/settings/profile" element={
                <ProtectedRoute>
                  <BaseLayout>
                    <ProfileSettings />
                  </BaseLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/settings/billing" element={
                <ProtectedRoute>
                  <BaseLayout>
                    <BillingSettings />
                  </BaseLayout>
                </ProtectedRoute>
              } />
              
              {/* Catch-all route */}
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
            </div>
            <Toaster />
            {/* React Query DevTools - only in development */}
            {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
          </SearchProvider>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default App;