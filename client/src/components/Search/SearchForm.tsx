import { useState } from 'react';
import { Search, Loader } from 'react-feather';
import { useSearch } from '../../contexts/SearchContext';

const SearchForm = () => {
  const [formData, setFormData] = useState({
    businessIdea: '',
    platforms: ['reddit', 'youtube'],
    searchType: 'business_idea',
    intentLevel: 'All',
    timeRange: 'All time',
    maxResults: 25
  });

  const { executeSearch, isLoading } = useSearch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await executeSearch(formData);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePlatformToggle = (platform: string) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  return (
    <div className="search-form-container">
      <form onSubmit={handleSubmit} className="search-form">
        {/* Business Idea Input */}
        <div className="form-group">
          <label className="form-label">
            {formData.searchType === 'business_idea' ? 'Business Idea' : 'Pain Point'}
          </label>
          <textarea
            className="form-control"
            value={formData.businessIdea}
            onChange={(e) => handleInputChange('businessIdea', e.target.value)}
            placeholder={
              formData.searchType === 'business_idea'
                ? "Describe your business idea (e.g., 'AI-powered fitness app for busy professionals')"
                : "Describe the pain point you want to investigate"
            }
            rows={3}
            required
          />
          <div className="char-count">
            {formData.businessIdea.length}/500 characters
          </div>
        </div>

        {/* Search Type Toggle */}
        <div className="form-group">
          <label className="form-label">Search Type</label>
          <div className="search-type-toggle">
            <button
              type="button"
              className={`toggle-btn ${formData.searchType === 'business_idea' ? 'active' : ''}`}
              onClick={() => handleInputChange('searchType', 'business_idea')}
            >
              Business Idea
            </button>
            <button
              type="button"
              className={`toggle-btn ${formData.searchType === 'pain_point' ? 'active' : ''}`}
              onClick={() => handleInputChange('searchType', 'pain_point')}
            >
              Pain Point
            </button>
          </div>
        </div>

        {/* Platform Selection */}
        <div className="form-group">
          <label className="form-label">Platforms</label>
          <div className="platform-checkboxes">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.platforms.includes('reddit')}
                onChange={() => handlePlatformToggle('reddit')}
              />
              <span className="platform-badge reddit">Reddit</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.platforms.includes('youtube')}
                onChange={() => handlePlatformToggle('youtube')}
              />
              <span className="platform-badge youtube">YouTube</span>
            </label>
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Intent Level</label>
            <select
              className="form-select"
              value={formData.intentLevel}
              onChange={(e) => handleInputChange('intentLevel', e.target.value)}
            >
              <option value="All">All Levels</option>
              <option value="High">High Intent</option>
              <option value="Medium">Medium Intent</option>
              <option value="Low">Low Intent</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Time Range</label>
            <select
              className="form-select"
              value={formData.timeRange}
              onChange={(e) => handleInputChange('timeRange', e.target.value)}
            >
              <option value="All time">All Time</option>
              <option value="Past 7 days">Past 7 Days</option>
              <option value="Past 30 days">Past 30 Days</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Max Results</label>
            <select
              className="form-select"
              value={formData.maxResults}
              onChange={(e) => handleInputChange('maxResults', parseInt(e.target.value))}
            >
              <option value={10}>10 Results</option>
              <option value={25}>25 Results</option>
              <option value={50}>50 Results</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="search-btn"
          disabled={isLoading || !formData.businessIdea.trim() || formData.platforms.length === 0}
        >
          {isLoading ? (
            <>
              <Loader className="spinner" size={18} />
              <span>Searching...</span>
            </>
          ) : (
            <>
              <Search size={18} />
              <span>Find Signals</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default SearchForm;