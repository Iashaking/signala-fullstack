import { useState } from 'react';
import { Grid, List, Filter, Download, Bookmark } from 'react-feather';
import SignalCard from '../Signal/SignalCard';
import { useSearch } from '../../contexts/SearchContext';

const SearchResults = () => {
  const { results, isLoading, saveSearch, exportResults } = useSearch();
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [filterBy, setFilterBy] = useState('all');

  const handleSaveSignal = async (signal: any) => {
    console.log('Saving signal:', signal);
  };

  const handleShareSignal = async (signal: any) => {
    if (navigator.share) {
      await navigator.share({
        title: signal.title,
        text: signal.snippet,
        url: signal.url
      });
    } else {
      navigator.clipboard.writeText(signal.url);
    }
  };

  const filteredResults = results?.filter(signal => {
    if (filterBy === 'all') return true;
    if (filterBy === 'high-urgency') return signal.urgencyLevel === 'High';
    if (filterBy === 'reddit') return signal.platform === 'reddit';
    if (filterBy === 'youtube') return signal.platform === 'youtube';
    return true;
  });

  const sortedResults = filteredResults?.sort((a, b) => {
    switch (sortBy) {
      case 'relevance':
        return b.relevanceScore - a.relevanceScore;
      case 'urgency':
        const urgencyOrder: Record<string, number> = { 'High': 3, 'Medium': 2, 'Low': 1 };
        return urgencyOrder[b.urgencyLevel] - urgencyOrder[a.urgencyLevel];
      case 'date':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  if (isLoading) {
    return (
      <div className="results-loading">
        <div className="loading-spinner" />
        <p>Finding relevant signals...</p>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="results-empty">
        <h3>No signals found</h3>
        <p>Try adjusting your search criteria or expanding your platform selection.</p>
      </div>
    );
  }

  return (
    <div className="search-results">
      {/* Results Header */}
      <div className="results-header">
        <div className="results-info">
          <h2>Search Results</h2>
          <p>{results.length} signals found</p>
        </div>

        <div className="results-controls">
          {/* View Mode Toggle */}
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={16} />
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List size={16} />
            </button>
          </div>

          {/* Sort Dropdown */}
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="relevance">Sort by Relevance</option>
            <option value="urgency">Sort by Urgency</option>
            <option value="date">Sort by Date</option>
          </select>

          {/* Filter Dropdown */}
          <select
            className="filter-select"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
          >
            <option value="all">All Signals</option>
            <option value="high-urgency">High Urgency</option>
            <option value="reddit">Reddit Only</option>
            <option value="youtube">YouTube Only</option>
          </select>

          {/* Action Buttons */}
          <button className="action-btn" onClick={() => saveSearch()}>
            <Bookmark size={16} />
            Save Search
          </button>

          <button className="action-btn" onClick={exportResults}>
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Results Grid/List */}
      <div className={`results-container ${viewMode}`}>
        {sortedResults?.map((signal, index) => (
          <SignalCard
            key={`${signal.platform}-${signal.id || index}`}
            signal={signal}
            onSave={handleSaveSignal}
            onShare={handleShareSignal}
          />
        ))}
      </div>

      {/* Load More / Pagination */}
      {results.length >= 25 && (
        <div className="results-pagination">
          <button className="load-more-btn">
            Load More Results
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;