import { createContext, useContext, useState, ReactNode } from 'react';
import { useLocation } from 'wouter';
import { apiRequest } from '../lib/queryClient';

interface SearchData {
  businessIdea: string;
  platforms: string[];
  searchType: string;
  intentLevel: string;
  timeRange: string;
  maxResults: number;
}

interface Signal {
  id: number;
  platform: string;
  title: string;
  snippet: string;
  url: string;
  source: string;
  relevanceScore: number;
  urgencyLevel: string;
  signalType: string;
  engagement?: {
    upvotes?: number;
    comments?: number;
    views?: number;
  };
}

interface SearchContextType {
  results: Signal[];
  isLoading: boolean;
  currentQuery: SearchData | null;
  savedSearches: any[];
  executeSearch: (searchData: SearchData) => Promise<void>;
  saveSearch: (name?: string) => Promise<void>;
  loadSavedSearches: () => Promise<void>;
  exportResults: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [results, setResults] = useState<Signal[]>([
    {
      id: 1,
      platform: 'Reddit',
      title: 'Looking for a productivity app that actually works',
      snippet: 'I\'ve tried so many productivity apps but they\'re all either too complex or missing key features. Need something simple but powerful for task management and time tracking.',
      url: 'https://reddit.com/r/productivity/comments/example1',
      source: 'r/productivity',
      relevanceScore: 92,
      urgencyLevel: 'High',
      signalType: 'Pain Point',
      engagement: {
        upvotes: 247,
        comments: 68,
        views: 1250
      }
    },
    {
      id: 2,
      platform: 'Twitter',
      title: 'Why don\'t project management tools integrate with everything?',
      snippet: 'Seriously frustrated with switching between 5 different tools just to manage one project. There has to be a better way to centralize everything.',
      url: 'https://twitter.com/user/status/example2',
      source: '@productmanager_sarah',
      relevanceScore: 88,
      urgencyLevel: 'Medium',
      signalType: 'Unmet Need',
      engagement: {
        upvotes: 156,
        comments: 32,
        views: 890
      }
    },
    {
      id: 3,
      platform: 'LinkedIn',
      title: 'Small business owners: what\'s your biggest operational challenge?',
      snippet: 'Running a 10-person team and drowning in manual processes. Looking for automation solutions that won\'t break the bank or require a PhD to set up.',
      url: 'https://linkedin.com/posts/example3',
      source: 'Small Business Community',
      relevanceScore: 85,
      urgencyLevel: 'High',
      signalType: 'Business Need',
      engagement: {
        upvotes: 89,
        comments: 45,
        views: 560
      }
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuery, setCurrentQuery] = useState<SearchData | null>(null);
  const [savedSearches, setSavedSearches] = useState<any[]>([
    {
      id: 1,
      name: 'Productivity App Pain Points',
      query: {
        businessIdea: 'productivity and task management app',
        platforms: ['Reddit', 'Twitter'],
        searchType: 'pain_points',
        intentLevel: 'high',
        timeRange: 'Past 30 days',
        maxResults: 50
      },
      createdAt: new Date('2024-01-15'),
      resultCount: 127
    },
    {
      id: 2,
      name: 'Project Management Gaps',
      query: {
        businessIdea: 'project management and collaboration tools',
        platforms: ['LinkedIn', 'Twitter'],
        searchType: 'unmet_needs',
        intentLevel: 'medium',
        timeRange: 'Past 7 days',
        maxResults: 25
      },
      createdAt: new Date('2024-01-10'),
      resultCount: 89
    }
  ]);
  const [, navigate] = useLocation();

  const executeSearch = async (searchData: SearchData) => {
    setIsLoading(true);
    try {
      const response = await apiRequest({
        method: 'POST',
        url: '/api/search',
        body: searchData
      });
      setResults(response.signals || []);
      setCurrentQuery(searchData);
      navigate('/results');
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSearch = async (name: string = '') => {
    if (!currentQuery) return;
    
    try {
      const searchName = name || `Search - ${new Date().toLocaleDateString()}`;
      await apiRequest({
        method: 'POST',
        url: '/api/searches/save',
        body: {
          name: searchName,
          query: currentQuery,
          resultsCount: results.length
        }
      });
      
      loadSavedSearches();
    } catch (error) {
      console.error('Failed to save search:', error);
    }
  };

  const loadSavedSearches = async () => {
    try {
      const response = await apiRequest({
        method: 'GET',
        url: '/api/searches'
      });
      setSavedSearches(response.searches || []);
    } catch (error) {
      console.error('Failed to load saved searches:', error);
    }
  };

  const exportResults = () => {
    if (!results.length) return;
    
    const csvContent = results.map(signal => ({
      Platform: signal.platform,
      Title: signal.title,
      Snippet: signal.snippet,
      Relevance: `${Math.round(signal.relevanceScore * 100)}%`,
      Urgency: signal.urgencyLevel,
      Type: signal.signalType,
      URL: signal.url
    }));

    const csv = [
      Object.keys(csvContent[0]).join(','),
      ...csvContent.map(row => Object.values(row).map(val => `"${val}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `signal-results-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const value = {
    results,
    isLoading,
    currentQuery,
    savedSearches,
    executeSearch,
    saveSearch,
    loadSavedSearches,
    exportResults
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within SearchProvider');
  }
  return context;
};