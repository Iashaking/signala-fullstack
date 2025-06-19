// src/AppComponent.tsx
import { Router, Switch, Route, Redirect } from "wouter";
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

// Import or create your queryClient instance for QueryClientProvider
import { queryClient } from "./lib/queryClient";

function AppComponent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();

  const toggleSidebar = () => setSidebarOpen((o) => !o);
  const closeSidebar = () => setSidebarOpen(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading…</p>
      </div>
    );
  }

  return (
    <Router>
      {isAuthenticated && (
        <>
          {sidebarOpen && (
            <div
              className="position-fixed top-0 start-0 w-100 h-100"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
              onClick={closeSidebar}
            />
          )}
          <MobileNavbar onMenuToggle={toggleSidebar} />
          <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        </>
      )}

      <main style={{ marginLeft: isAuthenticated ? '280px' : '0px' }}>
        <QueryClientProvider client={queryClient}>
          {isAuthenticated ? (
            <SearchProvider>
              <Switch>
                <Route path="/" component={() => <Redirect to="/search" />} />
                <Route path="/search" component={SearchPage} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/results" component={ResultsPage} />
                <Route path="/signals/current" component={CurrentSignalsPage} />
                <Route path="/signals/saved" component={SavedSignalsPage} />
                <Route path="/settings/:tab?" component={SettingsPage} />
                <Route component={NotFound} />
              </Switch>
            </SearchProvider>
          ) : (
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/email-confirmation" component={EmailConfirmationPage} />
              <Route component={NotFound} />
            </Switch>
          )}
        </QueryClientProvider>
        <Toaster />
      </main>
    </Router>
  );
}

export default AppComponent;
