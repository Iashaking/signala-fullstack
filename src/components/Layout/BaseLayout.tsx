import { useState } from 'react';
import Sidebar from '../Navigation/Sidebar';
import MobileNavbar from '../Navigation/MobileNavbar';
import { useAuth } from '../../contexts/AuthContext';

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="app-container">
      {/* Mobile Navbar */}
      <MobileNavbar onMenuToggle={handleSidebarToggle} />
      
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
      
      {/* Mobile Overlay */}
      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`}
        onClick={handleSidebarClose}
      />
      
      {/* Main Content */}
      <div className="main-content">
        <div className="page-container">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;