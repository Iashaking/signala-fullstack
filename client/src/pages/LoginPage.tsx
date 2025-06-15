import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Lock, Mail } from 'react-feather';
import { FaReddit, FaYoutube, FaTwitter, FaTiktok, FaLinkedin } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const [, navigate] = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [currentPlatform, setCurrentPlatform] = useState(0);

  const { signIn, signInWithGoogle } = useAuth();

  const platforms = [
    { name: 'Reddit', icon: FaReddit, color: '#FF4500' },
    { name: 'YouTube', icon: FaYoutube, color: '#FF0000' },
    { name: 'Twitter', icon: FaTwitter, color: '#1DA1F2' },
    { name: 'TikTok', icon: FaTiktok, color: '#000000' },
    { name: 'LinkedIn', icon: FaLinkedin, color: '#0077B5' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlatform(prev => (prev + 1) % platforms.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [platforms.length]);

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await signIn(formData.email, formData.password);
      navigate('/search');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-vh-100" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 30%, #f1f5f9 70%, #f8fafc 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* 3D Background Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '8%',
        width: '120px',
        height: '120px',
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        borderRadius: '24px',
        transform: 'rotate(15deg)',
        opacity: '0.08',
        filter: 'blur(1px)'
      }} />
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '10%',
        width: '80px',
        height: '80px',
        background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
        borderRadius: '50%',
        opacity: '0.1'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '15%',
        width: '100px',
        height: '100px',
        background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
        borderRadius: '20px',
        transform: 'rotate(-25deg)',
        opacity: '0.06'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '5%',
        width: '150px',
        height: '150px',
        background: 'linear-gradient(135deg, #10b981, #06b6d4)',
        borderRadius: '30px',
        transform: 'rotate(10deg)',
        opacity: '0.05'
      }} />

      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100 py-5">
          <div className="col-md-6 col-lg-5">
            <div className="card border-0" style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.3)'
            }}>
              <div className="card-body p-5">
                <div className="text-center mb-5">
                  <div 
                    className="d-inline-flex align-items-center justify-content-center mb-4"
                    style={{
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      borderRadius: '20px',
                      boxShadow: '0 20px 40px rgba(99, 102, 241, 0.25)',
                      transform: 'translateY(-2px)'
                    }}
                  >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="m21 21-4.35-4.35"/>
                    </svg>
                  </div>
                  <h1 
                    className="fw-bold mb-3"
                    style={{
                      fontSize: '2.25rem',
                      color: '#1f2937',
                      letterSpacing: '-0.025em',
                      lineHeight: '1.2'
                    }}
                  >
                    Welcome Back
                  </h1>
                  <p className="mb-4" style={{ 
                    fontSize: '1.125rem', 
                    color: '#6b7280',
                    lineHeight: '1.6'
                  }}>
                    Sign in to continue discovering signals
                  </p>
                </div>

                {/* Platform Ticker */}
                <div className="mb-5 text-center p-4" style={{ 
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)', 
                  borderRadius: '16px', 
                  border: '1px solid rgba(99, 102, 241, 0.1)' 
                }}>
                  <h6 style={{ color: '#374151', fontWeight: '600', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
                    Discover signals across
                  </h6>
                  <div 
                    id="platform-ticker" 
                    style={{ 
                      color: '#6366f1', 
                      fontWeight: '700', 
                      fontSize: '1.25rem', 
                      minHeight: '2rem', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    {React.createElement(platforms[currentPlatform].icon, {
                      size: 20,
                      style: { color: platforms[currentPlatform].color }
                    })}
                    {platforms[currentPlatform].name}
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="alert alert-danger mb-4" role="alert" style={{ borderRadius: '12px' }}>
                    {error}
                  </div>
                )}

                {/* Google Sign In */}
                <div className="d-grid mb-4">
                  <button 
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="btn btn-light btn-lg d-flex align-items-center justify-content-center"
                    style={{
                      background: 'white',
                      color: '#374151',
                      border: '2px solid #e5e7eb',
                      fontWeight: '600',
                      borderRadius: '12px',
                      padding: '14px 20px',
                      fontSize: '16px',
                      transition: 'all 0.2s'
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" className="me-3">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </button>
                </div>

                {/* Divider */}
                <div className="text-center mb-4">
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1" style={{ height: '1px', background: '#e5e7eb' }}></div>
                    <span className="px-3 text-muted" style={{ fontSize: '0.875rem' }}>or</span>
                    <div className="flex-grow-1" style={{ height: '1px', background: '#e5e7eb' }}></div>
                  </div>
                </div>

                {/* Email Login Form */}
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label fw-semibold" style={{ color: '#374151', fontSize: '0.875rem' }}>
                      Email
                    </label>
                    <div className="input-group">
                      <span 
                        className="input-group-text"
                        style={{ 
                          background: '#f9fafb', 
                          border: '2px solid #e5e7eb',
                          borderRight: 'none',
                          borderRadius: '8px 0 0 8px'
                        }}
                      >
                        <Mail size={18} className="text-muted" />
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter your email"
                        required
                        style={{
                          border: '2px solid #e5e7eb',
                          borderLeft: 'none',
                          borderRadius: '0 8px 8px 0',
                          fontSize: '16px',
                          padding: '12px 16px'
                        }}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-semibold" style={{ color: '#374151', fontSize: '0.875rem' }}>
                      Password
                    </label>
                    <div className="input-group">
                      <span 
                        className="input-group-text"
                        style={{ 
                          background: '#f9fafb', 
                          border: '2px solid #e5e7eb',
                          borderRight: 'none',
                          borderRadius: '8px 0 0 8px'
                        }}
                      >
                        <Lock size={18} className="text-muted" />
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder="Enter your password"
                        required
                        style={{
                          border: '2px solid #e5e7eb',
                          borderLeft: 'none',
                          borderRadius: '0 8px 8px 0',
                          fontSize: '16px',
                          padding: '12px 16px'
                        }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn w-100 py-3 mb-4"
                    style={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      border: 'none',
                      borderRadius: '12px',
                      color: 'white',
                      fontWeight: '600',
                      fontSize: '16px',
                      boxShadow: '0 10px 25px rgba(99, 102, 241, 0.3)',
                      transition: 'all 0.2s'
                    }}
                  >
                    Sign In
                  </button>

                  <p className="text-center text-muted mb-0" style={{ fontSize: '0.875rem' }}>
                    Don't have an account?{' '}
                    <Link 
                      to="/register" 
                      style={{ 
                        color: '#6366f1', 
                        textDecoration: 'none',
                        fontWeight: '600'
                      }}
                    >
                      Create Account
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;