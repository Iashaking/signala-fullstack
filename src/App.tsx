import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import { SearchProvider } from "./contexts/SearchContext";
import { Toaster } from "@/components/ui/toaster";
import Sidebar from "./components/Navigation/Sidebar";
import MobileNavbar from "./components/Navigation/MobileNavbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EmailConfirmationPage from "./pages/EmailConfirmationPage";
import SearchPage from "./pages/SearchPage";
import ResultsPage from "./pages/ResultsPage";
import CurrentSignalsPage from "./pages/CurrentSignalsPage";
import SavedSignalsPage from "./pages/SavedSignalsPage";
import NotFound from "@/pages/not-found";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SettingsPage from "./pages/SettingsPage";

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();

  const handleMenuToggle = () => setSidebarOpen(!sidebarOpen);
  const handleSidebarClose = () => setSidebarOpen(false);

  // 1. Block rendering completely while auth is loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="d-flex"
      style={{
        height: '100vh',
        width: '100%',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
      }}
    >
      {isAuthenticated && (
        <>
          {/* Mobile sidebar overlay */}
          {sidebarOpen && (
            <div
              className="position-fixed top-0 start-0 w-100 h-100"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999 }}
              onClick={handleSidebarClose}
            />
          )}

          <MobileNavbar onMenuToggle={handleMenuToggle} />
          <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
        </>
      )}

      <main
        className="flex-grow-1"
        style={{
          marginLeft: isAuthenticated ? '280px' : '0px',
          background: 'white',
          overflow: 'auto',
          minHeight: '100vh'
        }}
      >
        <Switch>
          {/* Public routes */}
          <Route path="/" component={Home} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/email-confirmation" component={EmailConfirmationPage} />

          {/* Protected routes - only render these when authenticated */}
          {isAuthenticated && (
            <>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/search" component={SearchPage} />
              <Route path="/results" component={ResultsPage} />
              <Route path="/signals" component={CurrentSignalsPage} />
              <Route path="/signals/current" component={CurrentSignalsPage} />
              <Route path="/signals/saved" component={SavedSignalsPage} />
              <Route path="/saved" component={SavedSignalsPage} />
              <Route path="/settings/:tab?" component={SettingsPage} />
            </>
          )}

          {/* Catch-all redirect for unauthenticated users */}
          {!isAuthenticated && (
            <Route path="*">
              <Redirect to="/login" />
            </Route>
          )}

          <Route component={NotFound} />
        </Switch>
      </main>

      <Toaster />
    </div>
  );
}
