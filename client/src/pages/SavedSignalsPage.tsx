import { useState } from 'react';
import { useSearch } from '../contexts/SearchContext';
import { Clock, Play, Edit, Trash2, MoreVertical, Plus } from 'lucide-react';
import { Link } from 'wouter';

const SavedSignalsPage = () => {
  const { savedSearches } = useSearch();

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'reddit': return '#ff4500';
      case 'twitter': return '#1da1f2';
      case 'linkedin': return '#0077b5';
      default: return '#6366f1';
    }
  };

  const getSearchTypeLabel = (type: string) => {
    switch (type) {
      case 'business_idea': return 'Business Idea';
      case 'pain_points': return 'Pain Points';
      case 'unmet_needs': return 'Unmet Needs';
      default: return type;
    }
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', 
      minHeight: '100vh', 
      padding: '40px 0' 
    }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h1 className="display-5 fw-bold mb-3" style={{ 
              color: '#1a202c',
              background: 'linear-gradient(135deg, #1a202c 0%, #6366f1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Saved Searches
            </h1>
            <p className="lead" style={{ color: '#64748b' }}>
              Manage and re-run your saved search queries
            </p>
          </div>
          <Link href="/search">
            <button 
              className="btn btn-lg px-4 py-3"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                border: 'none',
                borderRadius: '16px',
                fontWeight: '600',
                color: 'white',
                boxShadow: '0 8px 25px rgba(99, 102, 241, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(99, 102, 241, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.3)';
              }}
            >
              <Plus size={20} className="me-2" />
              New Search
            </button>
          </Link>
        </div>

        {/* Saved Searches Grid */}
        <div className="row g-4">
          {savedSearches.map((search) => (
            <div key={search.id} className="col-md-6 col-lg-4">
              <div 
                className="card border-0 h-100"
                style={{ 
                  borderRadius: '20px',
                  transition: 'all 0.3s ease',
                  background: 'white',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(99, 102, 241, 0.1)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
                }}
              >
                <div className="card-body p-4">
                  {/* Header */}
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="card-title mb-0" style={{ 
                      color: '#1a202c', 
                      lineHeight: '1.4',
                      background: 'linear-gradient(135deg, #1a202c 0%, #6366f1 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      fontWeight: '600'
                    }}>
                      {search.name}
                    </h5>
                    <div className="dropdown">
                      <button 
                        className="btn btn-sm btn-outline-secondary border-0"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <MoreVertical size={16} />
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <button className="dropdown-item d-flex align-items-center">
                            <Play size={14} className="me-2" />
                            Run Search
                          </button>
                        </li>
                        <li>
                          <button className="dropdown-item d-flex align-items-center">
                            <Edit size={14} className="me-2" />
                            Edit
                          </button>
                        </li>
                        <li><hr className="dropdown-divider" /></li>
                        <li>
                          <button className="dropdown-item d-flex align-items-center text-danger">
                            <Trash2 size={14} className="me-2" />
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Search Query */}
                  <div className="mb-3">
                    <p className="text-muted small mb-2 fw-medium">Search Query:</p>
                    <p className="small mb-0" style={{ color: '#374151', lineHeight: '1.5' }}>
                      {search.query.businessIdea}
                    </p>
                  </div>

                  {/* Search Details */}
                  <div className="mb-3">
                    <div className="d-flex flex-wrap gap-1 mb-2">
                      {search.query.platforms.map((platform: string) => (
                        <span 
                          key={platform}
                          className="badge rounded-pill px-2 py-1"
                          style={{ 
                            background: `linear-gradient(135deg, ${getPlatformColor(platform)}, ${getPlatformColor(platform)}dd)`,
                            color: 'white',
                            fontSize: '11px',
                            fontWeight: '600',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                          }}
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                    <span 
                      className="badge rounded-pill px-2 py-1"
                      style={{ 
                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
                        color: '#6366f1',
                        fontSize: '11px',
                        fontWeight: '600',
                        border: '1px solid rgba(99, 102, 241, 0.2)'
                      }}
                    >
                      {getSearchTypeLabel(search.query.searchType)}
                    </span>
                  </div>

                  {/* Search Settings */}
                  <div className="mb-3">
                    <div className="row g-2 small text-muted">
                      <div className="col-6">
                        <span className="fw-medium">Results:</span> {search.query.maxResults}
                      </div>
                      <div className="col-6">
                        <span className="fw-medium">Time:</span> {search.query.timeRange}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                    <div className="d-flex align-items-center gap-1 text-muted small">
                      <Clock size={12} />
                      {formatDate(search.createdAt)}
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <span className="text-muted small">
                        {search.resultCount} results
                      </span>
                      <Link href="/signals/current">
                        <button 
                          className="btn btn-sm"
                          style={{ 
                            fontSize: '12px', 
                            padding: '6px 12px',
                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            border: 'none',
                            borderRadius: '8px',
                            color: 'white',
                            fontWeight: '500',
                            boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)',
                            textDecoration: 'none'
                          }}
                        >
                          View Results
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {(!savedSearches || savedSearches.length === 0) && (
          <div className="text-center py-5">
            <div className="mb-4">
              <div 
                className="mx-auto mb-4"
                style={{
                  width: '120px',
                  height: '120px',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)',
                  position: 'relative'
                }}
              >
                <Plus size={48} color="white" />
                <div 
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '-10px',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                    opacity: 0.8
                  }}
                />
              </div>
              <h3 className="mb-3" style={{ 
                color: '#1a202c',
                fontWeight: '600',
                background: 'linear-gradient(135deg, #1a202c 0%, #6366f1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                No saved searches yet
              </h3>
              <p style={{ 
                color: '#64748b', 
                fontSize: '16px',
                maxWidth: '500px',
                margin: '0 auto 2rem auto',
                lineHeight: '1.6'
              }}>
                Save your search queries to easily run them again later and track results over time.
              </p>
              <Link href="/search">
                <button 
                  className="btn btn-lg px-4 py-3"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    border: 'none',
                    borderRadius: '16px',
                    fontWeight: '600',
                    color: 'white',
                    boxShadow: '0 8px 25px rgba(99, 102, 241, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 35px rgba(99, 102, 241, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.3)';
                  }}
                >
                  <Plus size={20} className="me-2" />
                  Create Your First Search
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedSignalsPage;