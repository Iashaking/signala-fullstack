import { useState } from 'react';
import { useSearch } from '../contexts/SearchContext';
import { Clock, AlertTriangle, ArrowUp, Activity } from 'react-feather';
import { MessageCircle, Play, HelpCircle, Twitter, Lightbulb, Target, TrendingUp } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const SearchPage = () => {
  const [searchType, setSearchType] = useState('');
  const [formData, setFormData] = useState({
    businessIdea: '',
    painPoint1: '',
    painPoint2: '',
    painPoint3: '',
    unmetNeed1: '',
    unmetNeed2: '',
    unmetNeed3: '',
    platforms: ['reddit'],
    timeRange: '',
    maxResults: '10'
  });

  const { executeSearch, isLoading } = useSearch();
  const { user } = useAuth();

  const handleSearchTypeChange = (type: string) => {
    setSearchType(type);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let searchData = {
      businessIdea: '',
      platforms: formData.platforms,
      searchType: searchType,
      intentLevel: 'high',
      timeRange: formData.timeRange,
      maxResults: parseInt(formData.maxResults)
    };

    if (searchType === 'business_idea') {
      searchData.businessIdea = formData.businessIdea;
    } else if (searchType === 'pain_points') {
      searchData.businessIdea = [formData.painPoint1, formData.painPoint2, formData.painPoint3]
        .filter(point => point.trim())
        .join(', ');
    } else if (searchType === 'unmet_needs') {
      searchData.businessIdea = [formData.unmetNeed1, formData.unmetNeed2, formData.unmetNeed3]
        .filter(need => need.trim())
        .join(', ');
    }

    await executeSearch(searchData);
  };

  return (
    <div className="min-vh-100" style={{ 
      background: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>


      <div className="container py-5" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div className="text-center mb-5">
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '24px',
            padding: '60px 40px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            marginBottom: '40px'
          }}>
            <h1 className="display-4 fw-bold text-white mb-4">
              Turn Signals Into Revenue
            </h1>
            <p className="lead text-white mb-0" style={{ 
              maxWidth: '700px', 
              margin: '0 auto', 
              fontSize: '1.25rem', 
              opacity: '0.9',
              lineHeight: '1.6'
            }}>
              Start finding customers looking for your solution today.
            </p>
          </div>
        </div>

        {/* Search Form Container */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '50px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
        }}>
          <form onSubmit={handleSubmit}>
            {/* Step 1: Search Input Method */}
            <div className="mb-5">
              <h3 className="fw-bold mb-4 text-center" style={{ color: '#1a202c', fontSize: '2rem' }}>
                Who can we help you{' '}
                <span style={{ 
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent', 
                  backgroundClip: 'text' 
                }}>
                  find today?
                </span>
              </h3>
              
              <div className="row g-4">
                <div className="col-md-4">
                  <div 
                    className={`card h-100 ${searchType === 'business_idea' ? 'shadow-lg' : 'border-light'}`}
                    style={{ 
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      borderRadius: '20px',
                      background: searchType === 'business_idea' ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(29, 78, 216, 0.1))' : 'white',
                      border: searchType === 'business_idea' ? '2px solid #3b82f6' : '1px solid #e5e7eb'
                    }}
                    onClick={() => handleSearchTypeChange('business_idea')}
                  >
                    <div className="card-body p-4 text-center">
                      <input 
                        className="form-check-input" 
                        type="radio" 
                        name="search_type" 
                        id="business_idea" 
                        value="business_idea"
                        checked={searchType === 'business_idea'}
                        onChange={() => handleSearchTypeChange('business_idea')}
                        style={{ display: 'none' }}
                      />
                      <div className="mb-3">
                        <div style={{ 
                          width: '60px', 
                          height: '60px', 
                          background: 'linear-gradient(45deg, #3b82f6, #1d4ed8)', 
                          borderRadius: '20px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          margin: '0 auto' 
                        }}>
                          <Lightbulb size={28} color="white" />
                        </div>
                      </div>
                      <h5 className="fw-bold" style={{ color: '#1a202c' }}>Describe your product</h5>
                      <p className="text-muted mb-0">Tell us about your startup or product concept</p>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div 
                    className={`card h-100 ${searchType === 'pain_points' ? 'shadow-lg' : 'border-light'}`}
                    style={{ 
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      borderRadius: '20px',
                      background: searchType === 'pain_points' ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(168, 85, 247, 0.1))' : 'white',
                      border: searchType === 'pain_points' ? '2px solid #8b5cf6' : '1px solid #e5e7eb'
                    }}
                    onClick={() => handleSearchTypeChange('pain_points')}
                  >
                    <div className="card-body p-4 text-center">
                      <input 
                        className="form-check-input" 
                        type="radio" 
                        name="search_type" 
                        id="pain_points" 
                        value="pain_points"
                        checked={searchType === 'pain_points'}
                        onChange={() => handleSearchTypeChange('pain_points')}
                        style={{ display: 'none' }}
                      />
                      <div className="mb-3">
                        <div style={{ 
                          width: '60px', 
                          height: '60px', 
                          background: 'linear-gradient(45deg, #8b5cf6, #a855f7)', 
                          borderRadius: '20px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          margin: '0 auto' 
                        }}>
                          <Target size={28} color="white" />
                        </div>
                      </div>
                      <h5 className="fw-bold" style={{ color: '#1a202c' }}>List pain points</h5>
                      <p className="text-muted mb-0">Focus on specific problems to solve</p>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div 
                    className={`card h-100 ${searchType === 'unmet_needs' ? 'shadow-lg' : 'border-light'}`}
                    style={{ 
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      borderRadius: '20px',
                      background: searchType === 'unmet_needs' ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(8, 145, 178, 0.1))' : 'white',
                      border: searchType === 'unmet_needs' ? '2px solid #06b6d4' : '1px solid #e5e7eb'
                    }}
                    onClick={() => handleSearchTypeChange('unmet_needs')}
                  >
                    <div className="card-body p-4 text-center">
                      <input 
                        className="form-check-input" 
                        type="radio" 
                        name="search_type" 
                        id="unmet_needs" 
                        value="unmet_needs"
                        checked={searchType === 'unmet_needs'}
                        onChange={() => handleSearchTypeChange('unmet_needs')}
                        style={{ display: 'none' }}
                      />
                      <div className="mb-3">
                        <div style={{ 
                          width: '60px', 
                          height: '60px', 
                          background: 'linear-gradient(45deg, #06b6d4, #0891b2)', 
                          borderRadius: '20px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          margin: '0 auto' 
                        }}>
                          <TrendingUp size={28} color="white" />
                        </div>
                      </div>
                      <h5 className="fw-bold" style={{ color: '#1a202c' }}>Find unmet needs</h5>
                      <p className="text-muted mb-0">Discover gaps in the market</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Input Fields */}
            <div className="mb-5">
              {searchType === 'business_idea' && (
                <div className="mt-4">
                  <div className="mb-3">
                    <label className="form-label fw-semibold mb-3" style={{ color: '#374151', fontSize: '1.1rem' }}>
                      Describe your business idea or product
                    </label>
                    <textarea 
                      className="form-control" 
                      name="business_idea"
                      placeholder="e.g., A task management app for remote teams with built-in video calling"
                      rows={4}
                      value={formData.businessIdea}
                      onChange={(e) => handleInputChange('businessIdea', e.target.value)}
                      style={{ 
                        border: '2px solid #e5e7eb', 
                        borderRadius: '16px', 
                        padding: '20px', 
                        fontSize: '16px', 
                        background: '#f9fafb',
                        resize: 'vertical',
                        minHeight: '120px'
                      }}
                    />
                  </div>
                </div>
              )}

              {searchType === 'pain_points' && (
                <div className="mt-4">
                  <label className="form-label fw-semibold mb-3" style={{ color: '#374151', fontSize: '1.1rem' }}>
                    What pain points are you solving?
                  </label>
                  <div className="mb-3">
                    <input 
                      type="text" 
                      className="form-control" 
                      name="pain_point_1"
                      placeholder="Pain point #1 (e.g., 'difficulty finding reliable contractors')"
                      value={formData.painPoint1}
                      onChange={(e) => handleInputChange('painPoint1', e.target.value)}
                      style={{ border: '2px solid #e5e7eb', borderRadius: '16px', padding: '16px 20px', fontSize: '16px', background: '#f9fafb' }}
                    />
                  </div>
                  <div className="mb-3">
                    <input 
                      type="text" 
                      className="form-control" 
                      name="pain_point_2"
                      placeholder="Pain point #2 (optional)"
                      value={formData.painPoint2}
                      onChange={(e) => handleInputChange('painPoint2', e.target.value)}
                      style={{ border: '2px solid #e5e7eb', borderRadius: '16px', padding: '16px 20px', fontSize: '16px', background: '#f9fafb' }}
                    />
                  </div>
                  <div className="mb-3">
                    <input 
                      type="text" 
                      className="form-control" 
                      name="pain_point_3"
                      placeholder="Pain point #3 (optional)"
                      value={formData.painPoint3}
                      onChange={(e) => handleInputChange('painPoint3', e.target.value)}
                      style={{ border: '2px solid #e5e7eb', borderRadius: '16px', padding: '16px 20px', fontSize: '16px', background: '#f9fafb' }}
                    />
                  </div>
                </div>
              )}

              {searchType === 'unmet_needs' && (
                <div className="mt-4">
                  <label className="form-label fw-semibold mb-3" style={{ color: '#374151', fontSize: '1.1rem' }}>
                    What unmet needs are you targeting?
                  </label>
                  <div className="mb-3">
                    <input 
                      type="text" 
                      className="form-control" 
                      name="unmet_need_1"
                      placeholder="Unmet need #1 (e.g., 'lactose-free ice cream with better taste')"
                      value={formData.unmetNeed1}
                      onChange={(e) => handleInputChange('unmetNeed1', e.target.value)}
                      style={{ border: '2px solid #e5e7eb', borderRadius: '16px', padding: '16px 20px', fontSize: '16px', background: '#f9fafb' }}
                    />
                  </div>
                  <div className="mb-3">
                    <input 
                      type="text" 
                      className="form-control" 
                      name="unmet_need_2"
                      placeholder="Unmet need #2 (optional)"
                      value={formData.unmetNeed2}
                      onChange={(e) => handleInputChange('unmetNeed2', e.target.value)}
                      style={{ border: '2px solid #e5e7eb', borderRadius: '16px', padding: '16px 20px', fontSize: '16px', background: '#f9fafb' }}
                    />
                  </div>
                  <div className="mb-3">
                    <input 
                      type="text" 
                      className="form-control" 
                      name="unmet_need_3"
                      placeholder="Unmet need #3 (optional)"
                      value={formData.unmetNeed3}
                      onChange={(e) => handleInputChange('unmetNeed3', e.target.value)}
                      style={{ border: '2px solid #e5e7eb', borderRadius: '16px', padding: '16px 20px', fontSize: '16px', background: '#f9fafb' }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Platform Selection */}
            {searchType && (
              <div className="mb-5">
                <h4 className="fw-bold mb-4" style={{ color: '#1a202c' }}>
                  Select platforms to search
                </h4>
                
                <div className="row g-3">
                  <div className="col-md-3">
                    <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '16px', background: 'linear-gradient(135deg, #f8fafc, #ffffff)' }}>
                      <div className="card-body p-4 text-center">
                        <div className="mb-3">
                          <div style={{ 
                            width: '48px', 
                            height: '48px', 
                            background: 'rgba(255, 69, 0, 0.1)', 
                            borderRadius: '12px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            margin: '0 auto' 
                          }}>
                            <MessageCircle style={{ width: '24px', height: '24px', color: '#ff4500' }} />
                          </div>
                        </div>
                        <h6 className="fw-bold mb-1" style={{ color: '#1a202c' }}>Reddit</h6>
                        <small className="text-success fw-semibold">✓ Active</small>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-3">
                    <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '16px', background: 'linear-gradient(135deg, #f8fafc, #ffffff)' }}>
                      <div className="card-body p-4 text-center">
                        <div className="mb-3">
                          <div style={{ 
                            width: '48px', 
                            height: '48px', 
                            background: 'rgba(255, 0, 0, 0.1)', 
                            borderRadius: '12px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            margin: '0 auto' 
                          }}>
                            <Play style={{ width: '24px', height: '24px', color: '#ff0000' }} />
                          </div>
                        </div>
                        <h6 className="fw-bold mb-1" style={{ color: '#1a202c' }}>YouTube</h6>
                        <small className="text-success fw-semibold">✓ Active</small>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-3">
                    <div className="card border-0 h-100" style={{ borderRadius: '16px', background: '#f9fafb', opacity: '0.7' }}>
                      <div className="card-body p-4 text-center">
                        <div className="mb-3">
                          <div style={{ 
                            width: '48px', 
                            height: '48px', 
                            background: 'rgba(168, 85, 247, 0.1)', 
                            borderRadius: '12px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            margin: '0 auto' 
                          }}>
                            <HelpCircle style={{ width: '24px', height: '24px', color: '#a855f7' }} />
                          </div>
                        </div>
                        <h6 className="fw-bold mb-1" style={{ color: '#6b7280' }}>Quora</h6>
                        <small className="text-muted">Coming soon</small>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-3">
                    <div className="card border-0 h-100" style={{ borderRadius: '16px', background: '#f9fafb', opacity: '0.7' }}>
                      <div className="card-body p-4 text-center">
                        <div className="mb-3">
                          <div style={{ 
                            width: '48px', 
                            height: '48px', 
                            background: 'rgba(29, 161, 242, 0.1)', 
                            borderRadius: '12px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            margin: '0 auto' 
                          }}>
                            <Twitter style={{ width: '24px', height: '24px', color: '#1da1f2' }} />
                          </div>
                        </div>
                        <h6 className="fw-bold mb-1" style={{ color: '#6b7280' }}>Twitter</h6>
                        <small className="text-muted">Coming soon</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Optional Filters */}
            {searchType && (
              <div className="mb-5">
                <h4 className="fw-bold mb-4" style={{ color: '#1a202c' }}>
                  Optional filters
                </h4>
                
                <div className="row g-4">
                  <div className="col-md-6">
                    <label htmlFor="max_results" className="form-label fw-semibold mb-3" style={{ color: '#374151' }}>Max Results</label>
                    <select 
                      className="form-select" 
                      name="max_results" 
                      id="max_results"
                      value={formData.maxResults}
                      onChange={(e) => handleInputChange('maxResults', e.target.value)}
                      style={{ 
                        border: '2px solid #e5e7eb', 
                        borderRadius: '16px', 
                        padding: '16px 20px', 
                        fontSize: '16px', 
                        background: '#f9fafb' 
                      }}
                    >
                      <option value="10">10 results</option>
                      <option value="25">25 results</option>
                      <option value="50">50 results</option>
                    </select>
                  </div>
                  
                  <div className="col-md-6">
                    <label htmlFor="freshness" className="form-label fw-semibold mb-3" style={{ color: '#374151' }}>Time Range</label>
                    <select 
                      className="form-select" 
                      name="freshness" 
                      id="freshness"
                      value={formData.timeRange}
                      onChange={(e) => handleInputChange('timeRange', e.target.value)}
                      style={{ 
                        border: '2px solid #e5e7eb', 
                        borderRadius: '16px', 
                        padding: '16px 20px', 
                        fontSize: '16px', 
                        background: '#f9fafb' 
                      }}
                    >
                      <option value="">All time</option>
                      <option value="Past 7 days">Past 7 days</option>
                      <option value="Past 30 days">Past 30 days</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            {searchType && (
              <div className="text-center">
                <button 
                  type="submit" 
                  className="btn btn-lg px-5 py-3"
                  disabled={isLoading}
                  style={{ 
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', 
                    border: 'none', 
                    borderRadius: '20px', 
                    color: 'white',
                    fontWeight: '700',
                    fontSize: '18px',
                    boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-3" role="status" />
                      Finding conversations...
                    </>
                  ) : (
                    <>
                      Find Conversations
                    </>
                  )}
                </button>
                <p className="text-muted mt-3 mb-0">
                  Free to start, costly not to.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Add floating animation styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15) !important;
        }
        
        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(99, 102, 241, 0.6) !important;
        }
      `}</style>
    </div>
  );
};

export default SearchPage;