import { useState } from 'react';
import { Link } from 'wouter';
import { Search, Radio, Clock, Eye, Calendar, Layers, Compass } from 'react-feather';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();

  // Mock recent searches - replace with real data
  const recentSearches = [
    {
      id: 1,
      query: 'project management pain points',
      created_at: new Date('2024-12-15T10:30:00'),
      results: Array(15).fill(null)
    },
    {
      id: 2,
      query: 'remote work challenges',
      created_at: new Date('2024-12-14T15:45:00'),
      results: Array(22).fill(null)
    },
    {
      id: 3,
      query: 'e-commerce conversion optimization',
      created_at: new Date('2024-12-13T09:15:00'),
      results: Array(18).fill(null)
    }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to search page with query
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="row mb-5">
        <div className="col-12">
          <h1 style={{ 
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent', 
            backgroundClip: 'text', 
            fontWeight: '700', 
            fontSize: '2.5rem', 
            marginBottom: '0.75rem' 
          }}>
            Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}!
          </h1>
          <p style={{ color: '#6b7280', fontSize: '1.2rem', marginBottom: '0' }}>
            Discover customer conversations that matter to your business.
          </p>
        </div>
      </div>

      {/* Search Form */}
      <div className="row mb-6">
        <div className="col-12">
          <div className="card" style={{ 
            background: 'rgba(255, 255, 255, 0.95)', 
            backdropFilter: 'blur(20px)', 
            border: '1px solid rgba(0, 0, 0, 0.08)', 
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
            borderRadius: '16px'
          }}>
            <div className="card-body p-5">
              <div className="d-flex align-items-center mb-4">
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', 
                  borderRadius: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  marginRight: '1rem' 
                }}>
                  <Search size={24} color="white" />
                </div>
                <h3 style={{ 
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent', 
                  backgroundClip: 'text', 
                  fontWeight: '700', 
                  marginBottom: '0' 
                }}>
                  Search Customer Conversations
                </h3>
              </div>
              
              <form onSubmit={handleSearchSubmit}>
                <div className="row g-4">
                  <div className="col-md-9">
                    <label htmlFor="query" className="form-label" style={{ fontSize: '1.1rem', fontWeight: '600' }}>
                      Search Query
                    </label>
                    <input 
                      type="text" 
                      className="form-control form-control-lg" 
                      id="query" 
                      name="query" 
                      placeholder="e.g., 'project management pain points', 'remote work challenges'..."
                      required
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ fontSize: '1.1rem', padding: '1rem 1.25rem' }}
                    />
                    <div className="form-text" style={{ color: '#6b7280', fontSize: '0.95rem', marginTop: '0.75rem' }}>
                      Describe the customer problem or desire you want to find conversations about.
                    </div>
                  </div>
                  <div className="col-md-3 d-flex align-items-end">
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-lg w-100" 
                      style={{ 
                        padding: '1rem', 
                        fontSize: '1.1rem', 
                        fontWeight: '600',
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        border: 'none'
                      }}
                    >
                      <Radio className="me-2" size={20} />
                      Find Signals
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div className="row mb-5">
          <div className="col-12">
            <div className="d-flex align-items-center mb-4">
              <div style={{ 
                width: '40px', 
                height: '40px', 
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', 
                borderRadius: '10px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                marginRight: '0.75rem' 
              }}>
                <Clock size={20} color="white" />
              </div>
              <h4 style={{ 
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent', 
                backgroundClip: 'text', 
                fontWeight: '700', 
                marginBottom: '0' 
              }}>
                Recent Searches
              </h4>
            </div>
            
            <div className="row">
              {recentSearches.map((search) => (
                <div key={search.id} className="col-md-6 col-lg-4 mb-4">
                  <div className="card h-100" style={{ 
                    background: 'rgba(255, 255, 255, 0.95)', 
                    backdropFilter: 'blur(10px)', 
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    borderRadius: '12px'
                  }}>
                    <div className="card-body p-4">
                      <h6 className="card-title text-truncate" style={{ 
                        color: '#1f2937', 
                        fontWeight: '600', 
                        marginBottom: '1rem' 
                      }}>
                        {search.query}
                      </h6>
                      <p className="card-text mb-2">
                        <small style={{ color: '#6b7280' }}>
                          <Calendar className="me-1" size={14} />
                          {formatDate(search.created_at)}
                        </small>
                      </p>
                      <p className="card-text mb-3">
                        <small style={{ color: '#6b7280' }}>
                          <Layers className="me-1" size={14} />
                          {search.results.length} results found
                        </small>
                      </p>
                      <Link 
                        href={`/search/results/${search.id}`} 
                        className="btn btn-outline-primary btn-sm"
                        style={{ borderColor: '#6366f1', color: '#6366f1' }}
                      >
                        <Eye className="me-1" size={14} />
                        View Results
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Getting Started Guide */}
      {recentSearches.length === 0 && (
        <div className="row">
          <div className="col-12">
            <div className="card" style={{ 
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)', 
              backdropFilter: 'blur(20px)', 
              border: '1px solid #6366f1',
              borderRadius: '16px'
            }}>
              <div className="card-body p-5">
                <div className="d-flex align-items-center mb-4">
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', 
                    borderRadius: '12px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginRight: '1rem' 
                  }}>
                    <Compass size={24} color="white" />
                  </div>
                  <h4 style={{ 
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', 
                    WebkitBackgroundClip: 'text', 
                    WebkitTextFillColor: 'transparent', 
                    backgroundClip: 'text', 
                    fontWeight: '700', 
                    marginBottom: '0' 
                  }}>
                    Getting Started with Signal
                  </h4>
                </div>
                <div className="row mt-4">
                  <div className="col-md-4 mb-4">
                    <div className="d-flex">
                      <div className="flex-shrink-0">
                        <div style={{ 
                          width: '40px', 
                          height: '40px', 
                          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', 
                          borderRadius: '50%', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          color: 'white', 
                          fontWeight: '700' 
                        }}>
                          1
                        </div>
                      </div>
                      <div className="ms-3">
                        <h6 style={{ color: '#1f2937', fontWeight: '600' }}>Define Your Search</h6>
                        <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0' }}>
                          Enter a specific customer problem or desire you want to research.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4 mb-4">
                    <div className="d-flex">
                      <div className="flex-shrink-0">
                        <div style={{ 
                          width: '40px', 
                          height: '40px', 
                          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', 
                          borderRadius: '50%', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          color: 'white', 
                          fontWeight: '700' 
                        }}>
                          2
                        </div>
                      </div>
                      <div className="ms-3">
                        <h6 style={{ color: '#1f2937', fontWeight: '600' }}>Review Signal Cards</h6>
                        <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0' }}>
                          Analyze AI-scored results from Reddit and YouTube conversations.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4 mb-4">
                    <div className="d-flex">
                      <div className="flex-shrink-0">
                        <div style={{ 
                          width: '40px', 
                          height: '40px', 
                          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', 
                          borderRadius: '50%', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          color: 'white', 
                          fontWeight: '700' 
                        }}>
                          3
                        </div>
                      </div>
                      <div className="ms-3">
                        <h6 style={{ color: '#1f2937', fontWeight: '600' }}>Engage with Customers</h6>
                        <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0' }}>
                          Use direct links to connect with potential customers.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;