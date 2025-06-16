import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Mail, CheckCircle } from 'react-feather';
import { FaReddit, FaYoutube, FaTwitter, FaTiktok, FaLinkedin } from 'react-icons/fa';

const EmailConfirmationPage = () => {
  const [currentPlatform, setCurrentPlatform] = useState(0);

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

  // Get email from URL params or localStorage
  const displayEmail = new URLSearchParams(window.location.search).get('email') || localStorage.getItem('pendingEmail') || 'your email';

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
              <div className="card-body p-5 text-center">
                {/* Success Icon */}
                <div 
                  className="d-inline-flex align-items-center justify-content-center mb-4"
                  style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    borderRadius: '20px',
                    boxShadow: '0 20px 40px rgba(16, 185, 129, 0.25)',
                    transform: 'translateY(-2px)'
                  }}
                >
                  <CheckCircle size={40} color="white" />
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
                  Check Your Email
                </h1>

                <p className="mb-4" style={{ 
                  fontSize: '1.125rem', 
                  color: '#6b7280',
                  lineHeight: '1.6'
                }}>
                  We've sent a confirmation link to
                </p>

                <div className="mb-4 p-3" style={{
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
                  borderRadius: '12px',
                  border: '1px solid rgba(99, 102, 241, 0.1)'
                }}>
                  <div className="d-flex align-items-center justify-content-center">
                    <Mail size={20} className="me-2" style={{ color: '#6366f1' }} />
                    <span style={{ 
                      color: '#6366f1',
                      fontWeight: '600',
                      fontSize: '1.1rem'
                    }}>
                      {displayEmail}
                    </span>
                  </div>
                </div>

                <div className="mb-5 p-4" style={{
                  background: '#f8fafc',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0'
                }}>
                  <h6 style={{ color: '#374151', fontWeight: '600', marginBottom: '1rem' }}>
                    What's next?
                  </h6>
                  <ol className="text-start" style={{ color: '#6b7280', fontSize: '0.9rem', paddingLeft: '1.2rem' }}>
                    <li className="mb-2">Check your email inbox (and spam folder)</li>
                    <li className="mb-2">Click the confirmation link in the email</li>
                    <li className="mb-2">You'll be redirected to the login page</li>
                    <li>Sign in with your credentials to access the platform</li>
                  </ol>
                </div>

                {/* Platform Ticker */}
                <div className="mb-4 text-center p-4" style={{ 
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)', 
                  borderRadius: '16px', 
                  border: '1px solid rgba(99, 102, 241, 0.1)' 
                }}>
                  <h6 style={{ color: '#374151', fontWeight: '600', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
                    Soon you'll be discovering signals across
                  </h6>
                  <div 
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

                <div className="text-center">
                  <p className="text-muted mb-3" style={{ fontSize: '0.875rem' }}>
                    Didn't receive the email? Check your spam folder or
                  </p>
                  <Link 
                    to="/register" 
                    className="btn btn-outline-primary"
                    style={{ 
                      borderRadius: '8px',
                      padding: '8px 16px',
                      fontSize: '0.875rem',
                      borderColor: '#6366f1',
                      color: '#6366f1'
                    }}
                  >
                    Try Again
                  </Link>
                </div>

                <hr className="my-4" style={{ border: 'none', height: '1px', background: '#e2e8f0' }} />

                <p className="text-center text-muted mb-0" style={{ fontSize: '0.875rem' }}>
                  Already confirmed your email?{' '}
                  <Link 
                    to="/login" 
                    style={{ 
                      color: '#6366f1', 
                      textDecoration: 'none',
                      fontWeight: '600'
                    }}
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmationPage;