import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { User, CreditCard, Save, Trash2, CheckCircle, XCircle, MessageCircle } from 'lucide-react';

const SettingsPage = () => {
  const [location] = useLocation();
  const currentTab = location.split('/')[2] || 'account';
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showCancelMessage, setShowCancelMessage] = useState(false);
  
  // Check for Stripe checkout results
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      setShowSuccessMessage(true);
      // Clear URL parameters after showing message
      setTimeout(() => {
        window.history.replaceState({}, '', '/settings/billing');
        setShowSuccessMessage(false);
      }, 5000);
    } else if (urlParams.get('canceled') === 'true') {
      setShowCancelMessage(true);
      setTimeout(() => {
        window.history.replaceState({}, '', '/settings/billing');
        setShowCancelMessage(false);
      }, 5000);
    }
  }, []);
  
  // Mock user data - in real app this would come from auth context
  const [userInfo, setUserInfo] = useState({
    username: 'johndoe',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    plan: 'free',
    monthlyResultsUsed: 18,
    maxResults: 25
  });

  const [searchPrefs, setSearchPrefs] = useState({
    defaultMaxResults: '25',
    defaultTimeRange: 'past_month',
    notificationsEnabled: true
  });

  const handleSave = () => {
    // In real app, save to backend
    console.log('Settings saved');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // In real app, delete account
      console.log('Account deletion requested');
    }
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', 
      minHeight: '100vh', 
      padding: '40px 0' 
    }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        {/* Header */}
        <div className="mb-5">
          <h1 className="display-5 fw-bold mb-3" style={{ 
            color: '#1a202c',
            background: 'linear-gradient(135deg, #1a202c 0%, #6366f1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Settings
          </h1>
          <p className="lead" style={{ color: '#64748b' }}>
            Manage your account and preferences
          </p>
        </div>

        {/* Settings Tabs */}
        <div className="mb-4">
          <div 
            className="d-flex gap-2 p-1"
            style={{
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(99, 102, 241, 0.1)'
            }}
          >
            <button
              className={`btn flex-fill d-flex align-items-center justify-content-center py-2 ${currentTab === 'account' ? 'active' : ''}`}
              style={{
                background: currentTab === 'account' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
                color: currentTab === 'account' ? 'white' : '#64748b',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '500',
                fontSize: '14px'
              }}
              onClick={() => window.location.href = '/settings/account'}
            >
              <User size={16} className="me-2" />
              Account
            </button>
            <button
              className={`btn flex-fill d-flex align-items-center justify-content-center py-2 ${currentTab === 'billing' ? 'active' : ''}`}
              style={{
                background: currentTab === 'billing' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
                color: currentTab === 'billing' ? 'white' : '#64748b',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '500',
                fontSize: '14px'
              }}
              onClick={() => window.location.href = '/settings/billing'}
            >
              <CreditCard size={16} className="me-2" />
              Billing
            </button>
            <button
              className={`btn flex-fill d-flex align-items-center justify-content-center py-2 ${currentTab === 'support' ? 'active' : ''}`}
              style={{
                background: currentTab === 'support' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
                color: currentTab === 'support' ? 'white' : '#64748b',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '500',
                fontSize: '14px'
              }}
              onClick={() => window.location.href = '/settings/support'}
            >
              <MessageCircle size={16} className="me-2" />
              Support
            </button>
          </div>
        </div>

        {/* Account Tab */}
        {currentTab === 'account' && (
          <>
            {/* Account Information */}
            <div className="mb-5">
              <div 
                className="card border-0"
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(99, 102, 241, 0.1)'
                }}
              >
                <div className="card-body p-4">
                  <h4 className="mb-4" style={{ 
                    color: '#1a202c',
                    fontWeight: '600',
                    background: 'linear-gradient(135deg, #1a202c 0%, #6366f1 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    Account Information
                  </h4>
                  
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label" style={{ color: '#64748b', fontSize: '14px', fontWeight: '500' }}>
                        Username
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={userInfo.username}
                        onChange={(e) => setUserInfo({...userInfo, username: e.target.value})}
                        style={{
                          border: '1px solid rgba(99, 102, 241, 0.2)',
                          borderRadius: '8px',
                          padding: '12px 16px'
                        }}
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label" style={{ color: '#64748b', fontSize: '14px', fontWeight: '500' }}>
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                        style={{
                          border: '1px solid rgba(99, 102, 241, 0.2)',
                          borderRadius: '8px',
                          padding: '12px 16px'
                        }}
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label" style={{ color: '#64748b', fontSize: '14px', fontWeight: '500' }}>
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={userInfo.firstName}
                        onChange={(e) => setUserInfo({...userInfo, firstName: e.target.value})}
                        style={{
                          border: '1px solid rgba(99, 102, 241, 0.2)',
                          borderRadius: '8px',
                          padding: '12px 16px'
                        }}
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label" style={{ color: '#64748b', fontSize: '14px', fontWeight: '500' }}>
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={userInfo.lastName}
                        onChange={(e) => setUserInfo({...userInfo, lastName: e.target.value})}
                        style={{
                          border: '1px solid rgba(99, 102, 241, 0.2)',
                          borderRadius: '8px',
                          padding: '12px 16px'
                        }}
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label className="form-label" style={{ color: '#64748b', fontSize: '14px', fontWeight: '500' }}>
                        Account Type
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={`${userInfo.plan.charAt(0).toUpperCase() + userInfo.plan.slice(1)} Plan`}
                        disabled
                        style={{
                          background: '#f8fafc',
                          border: '1px solid rgba(99, 102, 241, 0.2)',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          color: '#64748b'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Preferences */}
            <div className="mb-5">
              <div 
                className="card border-0"
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(99, 102, 241, 0.1)'
                }}
              >
                <div className="card-body p-4">
                  <h4 className="mb-4" style={{ 
                    color: '#1a202c',
                    fontWeight: '600',
                    background: 'linear-gradient(135deg, #1a202c 0%, #6366f1 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    Search Preferences
                  </h4>
                  
                  <div className="mb-3">
                    <label className="form-label" style={{ color: '#64748b', fontSize: '14px', fontWeight: '500' }}>
                      Default Max Results
                    </label>
                    <select 
                      className="form-select"
                      value={searchPrefs.defaultMaxResults}
                      onChange={(e) => setSearchPrefs({...searchPrefs, defaultMaxResults: e.target.value})}
                      style={{
                        border: '1px solid rgba(99, 102, 241, 0.2)',
                        borderRadius: '8px',
                        padding: '12px 16px'
                      }}
                    >
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label" style={{ color: '#64748b', fontSize: '14px', fontWeight: '500' }}>
                      Default Time Range
                    </label>
                    <select 
                      className="form-select"
                      value={searchPrefs.defaultTimeRange}
                      onChange={(e) => setSearchPrefs({...searchPrefs, defaultTimeRange: e.target.value})}
                      style={{
                        border: '1px solid rgba(99, 102, 241, 0.2)',
                        borderRadius: '8px',
                        padding: '12px 16px'
                      }}
                    >
                      <option value="past_week">Past Week</option>
                      <option value="past_month">Past Month</option>
                      <option value="past_quarter">Past Quarter</option>
                      <option value="past_year">Past Year</option>
                    </select>
                  </div>
                  
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="notifications"
                      checked={searchPrefs.notificationsEnabled}
                      onChange={(e) => setSearchPrefs({...searchPrefs, notificationsEnabled: e.target.checked})}
                      style={{
                        borderColor: '#6366f1'
                      }}
                    />
                    <label className="form-check-label" htmlFor="notifications" style={{ color: '#374151', fontSize: '14px' }}>
                      Enable email notifications for new signals
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="mb-5">
              <button
                className="btn btn-lg px-4 py-3 me-3"
                onClick={handleSave}
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: '600',
                  color: 'white',
                  boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)'
                }}
              >
                <Save size={16} className="me-2" />
                Save Changes
              </button>
            </div>

            {/* Danger Zone */}
            <div className="mb-5">
              <div 
                className="card border-0"
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.2)'
                }}
              >
                <div className="card-body p-4">
                  <h4 className="mb-3" style={{ color: '#dc2626', fontWeight: '600' }}>
                    Danger Zone
                  </h4>
                  <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '1rem' }}>
                    Permanently delete your account and all data.
                  </p>
                  <button
                    className="btn btn-outline-danger"
                    onClick={handleDeleteAccount}
                    style={{
                      borderRadius: '8px',
                      fontWeight: '500'
                    }}
                  >
                    <Trash2 size={16} className="me-2" />
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Billing Tab */}
        {currentTab === 'billing' && (
          <>
            {/* Success Message */}
            {showSuccessMessage && (
              <div className="mb-4">
                <div 
                  className="alert d-flex align-items-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    borderRadius: '12px',
                    color: '#065f46',
                    padding: '16px'
                  }}
                >
                  <CheckCircle size={20} className="me-3" style={{ color: '#10b981' }} />
                  <div>
                    <strong>Payment Successful!</strong>
                    <div style={{ fontSize: '14px', marginTop: '4px' }}>
                      Your subscription has been activated. Welcome to your new plan!
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Cancel Message */}
            {showCancelMessage && (
              <div className="mb-4">
                <div 
                  className="alert d-flex align-items-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    borderRadius: '12px',
                    color: '#7f1d1d',
                    padding: '16px'
                  }}
                >
                  <XCircle size={20} className="me-3" style={{ color: '#ef4444' }} />
                  <div>
                    <strong>Payment Cancelled</strong>
                    <div style={{ fontSize: '14px', marginTop: '4px' }}>
                      No charges were made. You can try again anytime.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Current Usage */}
            <div className="mb-5">
              <div 
                className="card border-0"
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(99, 102, 241, 0.1)'
                }}
              >
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-4">
                    <div 
                      className="me-3"
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px'
                      }}
                    >
                      📊
                    </div>
                    <div>
                      <h4 style={{ color: '#1a202c', fontWeight: '600', margin: 0 }}>Current Usage</h4>
                      <p style={{ color: '#64748b', margin: 0, fontSize: '14px' }}>
                        {userInfo.plan.charAt(0).toUpperCase() + userInfo.plan.slice(1)} Plan - Track your monthly search results
                      </p>
                    </div>
                  </div>
                  
                  <div className="progress mb-3" style={{ height: '12px', borderRadius: '6px', background: '#f1f5f9' }}>
                    <div 
                      className="progress-bar"
                      style={{
                        width: `${(userInfo.monthlyResultsUsed / userInfo.maxResults) * 100}%`,
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        borderRadius: '6px'
                      }}
                    />
                  </div>
                  
                  <div className="d-flex justify-content-between">
                    <span style={{ color: '#1a202c', fontWeight: '600' }}>{userInfo.monthlyResultsUsed} search results used</span>
                    <span style={{ color: '#64748b' }}>{userInfo.maxResults} limit</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Plans Section */}
            <div className="mb-4">
              <h4 className="mb-3" style={{ 
                color: '#1a202c',
                fontWeight: '600',
                background: 'linear-gradient(135deg, #1a202c 0%, #6366f1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Choose Your Plan
              </h4>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>
                Select the perfect plan for your signal discovery needs
              </p>
            </div>

            {/* Subscription Plans */}
            <div className="row g-4 mb-5">
              {/* Trial Plan */}
              <div className="col-lg-4">
                <div 
                  className={`card border-0 h-100 ${userInfo.plan === 'free' ? 'position-relative' : ''}`}
                  style={{
                    background: 'white',
                    borderRadius: '20px',
                    boxShadow: userInfo.plan === 'free' ? '0 12px 35px rgba(99, 102, 241, 0.2)' : '0 8px 25px rgba(0, 0, 0, 0.08)',
                    border: userInfo.plan === 'free' ? '2px solid #6366f1' : '1px solid rgba(99, 102, 241, 0.1)',
                    transform: userInfo.plan === 'free' ? 'scale(1.02)' : 'scale(1)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {userInfo.plan === 'free' && (
                    <div 
                      className="position-absolute top-0 start-50 translate-middle px-3 py-1"
                      style={{
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        color: 'white',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}
                    >
                      Current Plan
                    </div>
                  )}
                  <div className="card-body p-4 text-center">
                    <h5 style={{ color: '#1a202c', fontWeight: '700', marginBottom: '8px' }}>Trial</h5>
                    <div className="mb-4">
                      <span style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1a202c' }}>$0</span>
                      <span style={{ color: '#64748b', fontSize: '14px' }}>/month</span>
                    </div>
                    <ul className="list-unstyled mb-4" style={{ textAlign: 'left' }}>
                      <li className="mb-2" style={{ color: '#374151', fontSize: '14px' }}>
                        ✓ 25 search results per month
                      </li>
                      <li className="mb-2" style={{ color: '#374151', fontSize: '14px' }}>
                        ✓ Basic signal discovery
                      </li>
                      <li className="mb-2" style={{ color: '#374151', fontSize: '14px' }}>
                        ✓ Platform filtering
                      </li>
                      <li className="mb-2" style={{ color: '#374151', fontSize: '14px' }}>
                        ✓ Community support
                      </li>
                    </ul>
                    {userInfo.plan === 'free' ? (
                      <button 
                        className="btn w-100 py-2"
                        disabled
                        style={{
                          background: '#f1f5f9',
                          color: '#64748b',
                          border: 'none',
                          borderRadius: '12px',
                          fontWeight: '500'
                        }}
                      >
                        Current Plan
                      </button>
                    ) : (
                      <button 
                        className="btn w-100 py-2"
                        style={{
                          background: 'transparent',
                          color: '#6366f1',
                          border: '1px solid #6366f1',
                          borderRadius: '12px',
                          fontWeight: '500'
                        }}
                      >
                        Downgrade
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Starter Plan */}
              <div className="col-lg-4">
                <div 
                  className={`card border-0 h-100 ${userInfo.plan === 'starter' ? 'position-relative' : ''}`}
                  style={{
                    background: 'white',
                    borderRadius: '20px',
                    boxShadow: userInfo.plan === 'starter' ? '0 12px 35px rgba(99, 102, 241, 0.2)' : '0 8px 25px rgba(0, 0, 0, 0.08)',
                    border: userInfo.plan === 'starter' ? '2px solid #6366f1' : '1px solid rgba(99, 102, 241, 0.1)',
                    transform: userInfo.plan === 'starter' ? 'scale(1.02)' : 'scale(1)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {userInfo.plan === 'starter' && (
                    <div 
                      className="position-absolute top-0 start-50 translate-middle px-3 py-1"
                      style={{
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        color: 'white',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}
                    >
                      Current Plan
                    </div>
                  )}
                  <div className="card-body p-4 text-center">
                    <h5 style={{ color: '#1a202c', fontWeight: '700', marginBottom: '8px' }}>Starter</h5>
                    <div className="mb-4">
                      <span style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1a202c' }}>$7</span>
                      <span style={{ color: '#64748b', fontSize: '14px' }}>/month</span>
                    </div>
                    <ul className="list-unstyled mb-4" style={{ textAlign: 'left' }}>
                      <li className="mb-2" style={{ color: '#374151', fontSize: '14px' }}>
                        ✓ 200 search results per month
                      </li>
                      <li className="mb-2" style={{ color: '#374151', fontSize: '14px' }}>
                        ✓ Advanced filtering
                      </li>
                      <li className="mb-2" style={{ color: '#374151', fontSize: '14px' }}>
                        ✓ Export capabilities
                      </li>
                      <li className="mb-2" style={{ color: '#374151', fontSize: '14px' }}>
                        ✓ Email support
                      </li>
                    </ul>
                    {userInfo.plan === 'starter' ? (
                      <button 
                        className="btn w-100 py-2"
                        disabled
                        style={{
                          background: '#f1f5f9',
                          color: '#64748b',
                          border: 'none',
                          borderRadius: '12px',
                          fontWeight: '500'
                        }}
                      >
                        Current Plan
                      </button>
                    ) : (
                      <button 
                        className="btn w-100 py-2"
                        style={{
                          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '12px',
                          fontWeight: '600',
                          boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)'
                        }}
                        onClick={async () => {
                          try {
                            let token = localStorage.getItem('token');
                            
                            if (!token) {
                              // Create demo session for testing
                              const demoResponse = await fetch('/api/auth/demo-login', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' }
                              });
                              
                              if (demoResponse.ok) {
                                const demoData = await demoResponse.json();
                                token = demoData.token;
                                localStorage.setItem('token', token);
                                console.log('Demo user created for billing test');
                              } else {
                                alert('Unable to create demo session');
                                return;
                              }
                            }
                            
                            const response = await fetch('/api/create-checkout-session', {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                              },
                              body: JSON.stringify({ plan: 'starter' })
                            });
                            
                            const data = await response.json();
                            
                            if (data.url) {
                              window.location.href = data.url;
                            } else {
                              console.error('Checkout error:', data);
                              alert('Error: ' + (data.message || 'Unable to create checkout session'));
                            }
                          } catch (error) {
                            console.error('Checkout error:', error);
                            alert('Error creating checkout session');
                          }
                        }}
                      >
                        Upgrade Now
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Plus Plan */}
              <div className="col-lg-4">
                <div 
                  className={`card border-0 h-100 ${userInfo.plan === 'plus' ? 'position-relative' : ''}`}
                  style={{
                    background: 'white',
                    borderRadius: '20px',
                    boxShadow: userInfo.plan === 'plus' ? '0 12px 35px rgba(99, 102, 241, 0.2)' : '0 8px 25px rgba(0, 0, 0, 0.08)',
                    border: userInfo.plan === 'plus' ? '2px solid #6366f1' : '1px solid rgba(99, 102, 241, 0.1)',
                    transform: userInfo.plan === 'plus' ? 'scale(1.02)' : 'scale(1)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {userInfo.plan === 'plus' && (
                    <div 
                      className="position-absolute top-0 start-50 translate-middle px-3 py-1"
                      style={{
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        color: 'white',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}
                    >
                      Current Plan
                    </div>
                  )}
                  <div className="card-body p-4 text-center">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 style={{ color: '#1a202c', fontWeight: '700', margin: 0 }}>Plus</h5>
                      <span 
                        className="badge px-2 py-1"
                        style={{
                          background: 'linear-gradient(135deg, #10b981, #059669)',
                          color: 'white',
                          fontSize: '10px',
                          fontWeight: '600',
                          borderRadius: '6px'
                        }}
                      >
                        POPULAR
                      </span>
                    </div>
                    <div className="mb-4">
                      <span style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1a202c' }}>$15</span>
                      <span style={{ color: '#64748b', fontSize: '14px' }}>/month</span>
                    </div>
                    <ul className="list-unstyled mb-4" style={{ textAlign: 'left' }}>
                      <li className="mb-2" style={{ color: '#374151', fontSize: '14px' }}>
                        ✓ 600 search results per month
                      </li>
                      <li className="mb-2" style={{ color: '#374151', fontSize: '14px' }}>
                        ✓ Advanced AI filtering
                      </li>
                      <li className="mb-2" style={{ color: '#374151', fontSize: '14px' }}>
                        ✓ Priority support
                      </li>
                      <li className="mb-2" style={{ color: '#374151', fontSize: '14px' }}>
                        ✓ Export capabilities
                      </li>
                    </ul>
                    {userInfo.plan === 'plus' ? (
                      <button 
                        className="btn w-100 py-2"
                        disabled
                        style={{
                          background: '#f1f5f9',
                          color: '#64748b',
                          border: 'none',
                          borderRadius: '12px',
                          fontWeight: '500'
                        }}
                      >
                        Current Plan
                      </button>
                    ) : (
                      <button 
                        className="btn w-100 py-2"
                        style={{
                          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '12px',
                          fontWeight: '600',
                          boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)'
                        }}
                        onClick={async () => {
                          try {
                            let token = localStorage.getItem('token');
                            
                            if (!token) {
                              // Create demo session for testing
                              const demoResponse = await fetch('/api/auth/demo-login', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' }
                              });
                              
                              if (demoResponse.ok) {
                                const demoData = await demoResponse.json();
                                token = demoData.token;
                                localStorage.setItem('token', token);
                                console.log('Demo user created for billing test');
                              } else {
                                alert('Unable to create demo session');
                                return;
                              }
                            }
                            
                            const response = await fetch('/api/create-checkout-session', {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                              },
                              body: JSON.stringify({ plan: 'plus' })
                            });
                            
                            const data = await response.json();
                            
                            if (data.url) {
                              window.location.href = data.url;
                            } else {
                              console.error('Checkout error:', data);
                              alert('Error: ' + (data.message || 'Unable to create checkout session'));
                            }
                          } catch (error) {
                            console.error('Checkout error:', error);
                            alert('Error creating checkout session');
                          }
                        }}
                      >
                        Upgrade Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Manage Billing Section */}
            <div className="mb-5">
              <div 
                className="card border-0"
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(99, 102, 241, 0.1)'
                }}
              >
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div 
                      className="me-3"
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px'
                      }}
                    >
                      💳
                    </div>
                    <div>
                      <h4 style={{ color: '#1a202c', fontWeight: '600', margin: 0 }}>Manage Billing</h4>
                      <p style={{ color: '#64748b', margin: 0, fontSize: '14px' }}>
                        Update payment methods, view invoices, and manage your subscription
                      </p>
                    </div>
                  </div>
                  
                  <button
                    className="btn px-4 py-2"
                    style={{
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      border: 'none',
                      borderRadius: '12px',
                      fontWeight: '600',
                      color: 'white',
                      boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)'
                    }}
                    onClick={async () => {
                      try {
                        let token = localStorage.getItem('token');
                        
                        if (!token) {
                          // Create demo session for testing
                          const demoResponse = await fetch('/api/auth/demo-login', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' }
                          });
                          
                          if (demoResponse.ok) {
                            const demoData = await demoResponse.json();
                            token = demoData.token;
                            localStorage.setItem('token', token);
                            console.log('Demo user created for billing test');
                          } else {
                            alert('Unable to create demo session');
                            return;
                          }
                        }
                        
                        const response = await fetch('/api/create-customer-portal-session', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                          }
                        });
                        
                        const data = await response.json();
                        if (data.url) {
                          window.location.href = data.url;
                        } else {
                          console.error('Portal error:', data);
                          alert('Error: ' + (data.message || 'Unable to access billing portal'));
                        }
                      } catch (error) {
                        console.error('Portal error:', error);
                        alert('Error accessing billing portal');
                      }
                    }}
                  >
                    Manage Billing Details
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Support Tab */}
        {currentTab === 'support' && (
          <div className="mb-5">
            <div 
              className="card border-0"
              style={{
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(99, 102, 241, 0.1)'
              }}
            >
              <div className="card-body p-5 text-center">
                <div 
                  className="mb-4"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    boxShadow: '0 20px 40px rgba(99, 102, 241, 0.25)'
                  }}
                >
                  <MessageCircle size={32} color="white" />
                </div>
                
                <h4 className="mb-4" style={{ 
                  color: '#1a202c',
                  fontWeight: '600',
                  background: 'linear-gradient(135deg, #1a202c 0%, #6366f1 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Need Help?
                </h4>
                
                <p style={{ 
                  color: '#64748b', 
                  fontSize: '16px',
                  marginBottom: '2rem',
                  lineHeight: '1.6'
                }}>
                  We're here to help! For any questions, issues, or feedback, please reach out to our support team.
                </p>
                
                <div 
                  className="p-4 mb-4"
                  style={{
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
                    border: '1px solid rgba(99, 102, 241, 0.1)',
                    borderRadius: '12px'
                  }}
                >
                  <p style={{ 
                    color: '#1a202c', 
                    fontWeight: '600',
                    fontSize: '14px',
                    marginBottom: '8px'
                  }}>
                    Email Support
                  </p>
                  <a 
                    href="mailto:support@signala.com"
                    style={{
                      color: '#6366f1',
                      fontSize: '18px',
                      fontWeight: '600',
                      textDecoration: 'none'
                    }}
                    onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                    onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                  >
                    support@signala.com
                  </a>
                </div>
                
                <p style={{ 
                  color: '#10b981', 
                  fontSize: '14px',
                  fontWeight: '500',
                  margin: 0
                }}>
                  ⚡ We will get back to you immediately
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;