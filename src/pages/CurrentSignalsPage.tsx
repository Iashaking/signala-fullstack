import { useState } from 'react';
import { useSearch } from '../contexts/SearchContext';
import { Clock, ExternalLink, MessageCircle, ArrowUp, Star, Download, Share2, Grid, List, Filter, Search, ChevronDown } from 'lucide-react';

const CurrentSignalsPage = () => {
  const { results, exportResults } = useSearch();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [sortBy, setSortBy] = useState('recent');
  const [quickSearch, setQuickSearch] = useState('');
  const [platformFilters, setPlatformFilters] = useState({
    reddit: false,
    youtube: false,
    twitter: false,
    linkedin: false
  });

  const [favoritedSignals, setFavoritedSignals] = useState<Set<number>>(new Set());
  const [userPlan, setUserPlan] = useState('free'); // 'free', 'premium', 'enterprise'
  const [availableCredits, setAvailableCredits] = useState(25);
  const [currentResultsShown, setCurrentResultsShown] = useState(25);
  const [totalAvailableResults, setTotalAvailableResults] = useState(127); // Mock total from search
  
  const handleLoadMore = () => {
    if (availableCredits > 0 && currentResultsShown < totalAvailableResults) {
      const additionalResults = Math.min(25, availableCredits, totalAvailableResults - currentResultsShown);
      setCurrentResultsShown(prev => prev + additionalResults);
      setAvailableCredits(prev => prev - additionalResults);
      // In real implementation, this would fetch more results from the API
    }
  };

  const canLoadMore = currentResultsShown < totalAvailableResults && availableCredits > 0;

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'reddit': return '#ff4500';
      case 'twitter': return '#1da1f2';
      case 'linkedin': return '#0077b5';
      default: return '#6366f1';
    }
  };

  const handleFavorite = (signalId: number) => {
    const newFavorites = new Set(favoritedSignals);
    if (newFavorites.has(signalId)) {
      newFavorites.delete(signalId);
    } else {
      newFavorites.add(signalId);
    }
    setFavoritedSignals(newFavorites);
  };

  const filteredResults = results?.filter(signal => {
    // Quick search filter
    if (quickSearch && !signal.title.toLowerCase().includes(quickSearch.toLowerCase()) && 
        !signal.snippet.toLowerCase().includes(quickSearch.toLowerCase())) {
      return false;
    }

    // Platform filters
    const platformFilterActive = Object.values(platformFilters).some(f => f);
    if (platformFilterActive && !platformFilters[signal.platform.toLowerCase() as keyof typeof platformFilters]) {
      return false;
    }



    return true;
  });

  const sortedResults = filteredResults?.sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return b.id - a.id; // Newest first
      case 'platform':
        return a.platform.localeCompare(b.platform);
      case 'title':
        return a.title.localeCompare(b.title);
      case 'relevance':
        return b.relevanceScore - a.relevanceScore;
      default:
        return 0;
    }
  });

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', 
      minHeight: '100vh', 
      padding: '40px 0' 
    }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        {/* Header */}
        <div className="mb-5 text-center">
          <h1 className="display-5 fw-bold mb-3" style={{ 
            color: '#1a202c',
            background: 'linear-gradient(135deg, #1a202c 0%, #6366f1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Current Signals
          </h1>
          <p className="lead" style={{ color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
            Latest conversations and signals from your searches
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-4">
          {/* Quick Search */}
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="position-relative">
                <div 
                  className="input-group"
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    overflow: 'hidden'
                  }}
                >
                  <span className="input-group-text bg-transparent border-0 ps-3">
                    <Search size={18} style={{ color: '#6366f1' }} />
                  </span>
                  <input
                    type="text"
                    className="form-control border-0 ps-2"
                    placeholder="Quick search conversations..."
                    value={quickSearch}
                    onChange={(e) => setQuickSearch(e.target.value)}
                    style={{ 
                      fontSize: '15px',
                      padding: '14px 16px 14px 8px',
                      background: 'transparent'
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex justify-content-end align-items-center gap-2">
              <span className="text-muted small">
                {sortedResults?.length || 0} signals found
              </span>
              <button 
                className="btn btn-outline-primary btn-sm"
                onClick={exportResults}
              >
                <Download size={14} className="me-1" />
                Export CSV
              </button>
            </div>
          </div>

          {/* Platform Filters */}
          <div className="row mb-4">
            <div className="col-12">
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
                  <h6 className="card-title mb-3" style={{ 
                    color: '#1a202c', 
                    fontSize: '16px', 
                    fontWeight: '600',
                    background: 'linear-gradient(135deg, #1a202c 0%, #6366f1 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    Platform Filters
                  </h6>
                  <div className="d-flex flex-wrap gap-3">
                    {Object.entries(platformFilters).map(([platform, checked]) => (
                      <div key={platform} className="form-check" style={{ marginBottom: '8px' }}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`filter-${platform}`}
                          checked={checked}
                          onChange={(e) => setPlatformFilters(prev => ({
                            ...prev,
                            [platform]: e.target.checked
                          }))}
                          style={{
                            borderColor: checked ? '#6366f1' : '#d1d5db',
                            backgroundColor: checked ? '#6366f1' : 'white'
                          }}
                        />
                        <label className="form-check-label" htmlFor={`filter-${platform}`} style={{
                          fontSize: '14px',
                          fontWeight: '500',
                          color: '#374151',
                          marginLeft: '8px'
                        }}>
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sort Options */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="dropdown">
              <button 
                className="btn btn-outline-secondary btn-sm dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
              >
                Sort by: {sortBy === 'recent' ? 'Most Recent' : sortBy === 'title' ? 'Title' : sortBy === 'platform' ? 'Platform' : 'Relevance'}
              </button>
              <ul className="dropdown-menu">
                <li><button className="dropdown-item" onClick={() => setSortBy('recent')}>Most Recent</button></li>
                <li><button className="dropdown-item" onClick={() => setSortBy('title')}>Title (A-Z)</button></li>
                <li><button className="dropdown-item" onClick={() => setSortBy('platform')}>Platform</button></li>
                <li><button className="dropdown-item" onClick={() => setSortBy('relevance')}>Relevance Score</button></li>
              </ul>
            </div>

            <div className="btn-group btn-group-sm" role="group">
              <button
                type="button"
                className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => setViewMode('list')}
              >
                <List size={14} />
              </button>
              <button
                type="button"
                className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className={viewMode === 'grid' ? 'row g-4' : ''}>
          {sortedResults?.map((signal) => (
            <div key={signal.id} className={viewMode === 'grid' ? 'col-md-6 col-lg-4' : 'mb-4'}>
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
                    <div className="d-flex align-items-center gap-3 flex-wrap">
                      <span 
                        className="badge rounded-pill px-3 py-2"
                        style={{ 
                          background: `linear-gradient(135deg, ${getPlatformColor(signal.platform)}, ${getPlatformColor(signal.platform)}dd)`,
                          color: 'white',
                          fontSize: '12px',
                          fontWeight: '600',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        {signal.platform}
                      </span>
                      <span className="text-muted small">
                        {signal.relevanceScore}% match
                      </span>
                    </div>
                    <div className="d-flex gap-2">
                      <button 
                        className="btn btn-sm"
                        style={{
                          background: favoritedSignals.has(signal.id) ? '#fbbf24' : 'transparent',
                          border: favoritedSignals.has(signal.id) ? '1px solid #fbbf24' : '1px solid #e5e7eb',
                          color: favoritedSignals.has(signal.id) ? 'white' : '#6b7280'
                        }}
                        onClick={() => handleFavorite(signal.id)}
                      >
                        <Star size={14} fill={favoritedSignals.has(signal.id) ? 'white' : 'none'} />
                      </button>
                      <a 
                        href={signal.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-primary"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>

                  {/* Content */}
                  <h5 className="card-title mb-3" style={{ color: '#1a202c', lineHeight: '1.4' }}>
                    {signal.title}
                  </h5>
                  <p className="card-text text-muted mb-3" style={{ lineHeight: '1.6' }}>
                    {signal.snippet}
                  </p>

                  {/* Footer */}
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-3">
                      <span className="text-muted small">
                        {signal.source}
                      </span>
                      <span 
                        className="badge rounded-pill"
                        style={{ 
                          backgroundColor: '#f3f4f6',
                          color: '#374151',
                          fontSize: '11px'
                        }}
                      >
                        {signal.signalType}
                      </span>
                    </div>
                    {signal.engagement && (
                      <div className="d-flex align-items-center gap-3 text-muted small">
                        <span className="d-flex align-items-center gap-1">
                          <ArrowUp size={14} />
                          {signal.engagement.upvotes}
                        </span>
                        <span className="d-flex align-items-center gap-1">
                          <MessageCircle size={14} />
                          {signal.engagement.comments}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Results Section */}
        {sortedResults && sortedResults.length > 0 && (
          <div className="mt-5">
            <div 
              className="d-flex justify-content-between align-items-center p-4" 
              style={{ 
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
                borderRadius: '20px', 
                border: '1px solid rgba(99, 102, 241, 0.1)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div>
                <div className="mb-1">
                  <span className="fw-semibold" style={{ 
                    color: '#1a202c',
                    fontSize: '16px'
                  }}>
                    Showing {sortedResults.length} of {totalAvailableResults} available results
                  </span>
                </div>
                <div className="small" style={{ color: '#64748b' }}>
                  {userPlan === 'free' && (
                    <>Available credits: <span className="fw-semibold">{availableCredits}</span> • <a href="/settings/billing" className="text-decoration-none" style={{ color: '#6366f1' }}>Upgrade for more</a></>
                  )}
                  {userPlan !== 'free' && (
                    <>Credits remaining: <span className="fw-semibold">{availableCredits}</span></>
                  )}
                </div>
              </div>
              
              {canLoadMore ? (
                <button 
                  className="btn px-4 py-2"
                  onClick={handleLoadMore}
                  style={{
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: '600',
                    color: 'white',
                    fontSize: '14px',
                    boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.3)';
                  }}
                >
                  Load More Results
                </button>
              ) : (
                <div className="text-center">
                  {currentResultsShown >= totalAvailableResults ? (
                    <span className="text-muted small">All results loaded</span>
                  ) : availableCredits === 0 ? (
                    <div>
                      <div className="text-muted small mb-2">No credits remaining</div>
                      <a 
                        href="/settings/billing" 
                        className="btn btn-sm"
                        style={{
                          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                          border: 'none',
                          borderRadius: '8px',
                          fontWeight: '500',
                          color: 'white',
                          fontSize: '12px'
                        }}
                      >
                        Upgrade Plan
                      </a>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Empty State */}
        {(!sortedResults || sortedResults.length === 0) && (
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
                <Filter size={48} color="white" />
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
                No signals found
              </h3>
              <p style={{ 
                color: '#64748b', 
                fontSize: '16px',
                maxWidth: '400px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}>
                Try adjusting your filters or run a new search to find relevant conversations.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentSignalsPage;