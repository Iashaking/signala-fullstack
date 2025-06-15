import { useState } from 'react';
import { Search, Activity, Settings, TrendingUp, Bookmark, User, CreditCard, MessageCircle, ChevronDown, ChevronRight } from 'react-feather';
import { Link, useLocation } from 'wouter';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [location] = useLocation();
  const [signalsExpanded, setSignalsExpanded] = useState(location.includes('/signals') || location.includes('/results'));
  const [settingsExpanded, setSettingsExpanded] = useState(location.includes('/settings'));

  const isActive = (path: string) => location === path;
  const isActiveSection = (section: string) => location.includes(section);

  return (
    <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '280px',
      height: '100vh',
      background: 'white',
      boxShadow: '4px 0 20px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '24px 20px',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <Link href="/search" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '12px',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '18px'
            }}>
              S
            </div>
            <div>
              <h5 style={{ color: '#1a202c', margin: 0, fontWeight: '700' }}>Signal</h5>
              <small style={{ color: '#6b7280' }}>Discovery Platform</small>
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '20px 0', overflow: 'auto' }}>
        {/* Search */}
        <Link 
          href="/search" 
          style={{ textDecoration: 'none' }}
          onClick={onClose}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px 20px',
            color: isActive('/search') ? '#6366f1' : '#374151',
            background: isActive('/search') ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
            borderRight: isActive('/search') ? '3px solid #6366f1' : 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}>
            <Search size={18} style={{ marginRight: '12px' }} />
            <span style={{ fontWeight: '500' }}>Search</span>
          </div>
        </Link>

        {/* Signals Section */}
        <div style={{ marginTop: '8px' }}>
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 20px',
              color: isActiveSection('/signals') || isActiveSection('/results') ? '#6366f1' : '#374151',
              background: isActiveSection('/signals') || isActiveSection('/results') ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
              borderRight: isActiveSection('/signals') || isActiveSection('/results') ? '3px solid #6366f1' : 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onClick={() => setSignalsExpanded(!signalsExpanded)}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Activity size={18} style={{ marginRight: '12px' }} />
              <span style={{ fontWeight: '500' }}>Signals</span>
            </div>
            {signalsExpanded ? 
              <ChevronDown size={16} /> : 
              <ChevronRight size={16} />
            }
          </div>
          
          {signalsExpanded && (
            <div style={{ marginLeft: '20px' }}>
              <Link 
                href="/signals/current" 
                style={{ textDecoration: 'none' }}
                onClick={onClose}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 20px',
                  color: isActive('/signals') ? '#6366f1' : '#6b7280',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.2s ease'
                }}>
                  <TrendingUp size={16} style={{ marginRight: '10px' }} />
                  <span>Current Signals</span>
                </div>
              </Link>
              
              <Link 
                href="/signals/saved" 
                style={{ textDecoration: 'none' }}
                onClick={onClose}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 20px',
                  color: isActive('/signals/saved') ? '#6366f1' : '#6b7280',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.2s ease'
                }}>
                  <Bookmark size={16} style={{ marginRight: '10px' }} />
                  <span>Saved Signals</span>
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* Settings Section */}
        <div style={{ marginTop: '8px' }}>
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 20px',
              color: isActiveSection('/settings') ? '#6366f1' : '#374151',
              background: isActiveSection('/settings') ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
              borderRight: isActiveSection('/settings') ? '3px solid #6366f1' : 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onClick={() => setSettingsExpanded(!settingsExpanded)}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Settings size={18} style={{ marginRight: '12px' }} />
              <span style={{ fontWeight: '500' }}>Settings</span>
            </div>
            {settingsExpanded ? 
              <ChevronDown size={16} /> : 
              <ChevronRight size={16} />
            }
          </div>
          
          {settingsExpanded && (
            <div style={{ marginLeft: '20px' }}>
              <Link 
                href="/settings/account" 
                style={{ textDecoration: 'none' }}
                onClick={onClose}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 20px',
                  color: location.includes('/settings/account') ? '#6366f1' : '#6b7280',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.2s ease'
                }}>
                  <User size={16} style={{ marginRight: '10px' }} />
                  <span>Account</span>
                </div>
              </Link>
              
              <Link 
                href="/settings/billing" 
                style={{ textDecoration: 'none' }}
                onClick={onClose}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 20px',
                  color: location.includes('/settings/billing') ? '#6366f1' : '#6b7280',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.2s ease'
                }}>
                  <CreditCard size={16} style={{ marginRight: '10px' }} />
                  <span>Billing</span>
                </div>
              </Link>
              
              <Link 
                href="/settings/support" 
                style={{ textDecoration: 'none' }}
                onClick={onClose}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 20px',
                  color: location.includes('/settings/support') ? '#6366f1' : '#6b7280',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.2s ease'
                }}>
                  <MessageCircle size={16} style={{ marginRight: '10px' }} />
                  <span>Support</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* User Profile */}
      <div style={{
        padding: '20px',
        borderTop: '1px solid #e5e7eb',
        background: '#f9fafb'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            background: '#e5e7eb',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '12px'
          }}>
            <User size={16} color="#6b7280" />
          </div>
          <div>
            <div style={{ color: '#1a202c', fontSize: '14px', fontWeight: '500' }}>Development User</div>
            <div style={{ color: '#6b7280', fontSize: '12px' }}>dev@signal.com</div>
          </div>
        </div>
        <Link 
          href="/login" 
          style={{ 
            textDecoration: 'none',
            display: 'block',
            padding: '8px 12px',
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            color: '#374151',
            fontSize: '14px',
            textAlign: 'center',
            transition: 'all 0.2s ease'
          }}
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;