import { ExternalLink, Bookmark, Share, MoreHorizontal } from 'react-feather';

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

interface SignalCardProps {
  signal: Signal;
  onSave: (signal: Signal) => void;
  onShare: (signal: Signal) => void;
}

const SignalCard = ({ signal, onSave, onShare }: SignalCardProps) => {
  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getRelevanceWidth = (score: number) => {
    return Math.max(20, Math.min(100, score * 100));
  };

  const getPlatformBadge = (platform: string) => {
    switch (platform) {
      case 'reddit':
        return <span className="platform-badge reddit">Reddit</span>;
      case 'youtube':
        return <span className="platform-badge youtube">YouTube</span>;
      default:
        return <span className="platform-badge">{platform}</span>;
    }
  };

  return (
    <div className="signal-card">
      <div className="signal-header">
        <div className="platform-info">
          {getPlatformBadge(signal.platform)}
          <span className="source-link">
            <a href={signal.url} target="_blank" rel="noopener noreferrer">
              {signal.source}
              <ExternalLink size={14} />
            </a>
          </span>
        </div>
        <div className="signal-actions">
          <button className="action-btn" onClick={() => onSave(signal)}>
            <Bookmark size={16} />
          </button>
          <button className="action-btn" onClick={() => onShare(signal)}>
            <Share size={16} />
          </button>
          <button className="action-btn">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      <div className="signal-content">
        <h3 className="signal-title">{signal.title}</h3>
        <p className="signal-snippet">{signal.snippet}</p>
      </div>

      <div className="signal-metrics">
        <div className="metric-item">
          <label>Relevance</label>
          <div className="relevance-bar">
            <div 
              className="relevance-fill"
              style={{ width: `${getRelevanceWidth(signal.relevanceScore)}%` }}
            />
          </div>
          <span className="metric-value">{Math.round(signal.relevanceScore * 100)}%</span>
        </div>

        <div className="metric-item">
          <label>Urgency</label>
          <div className="urgency-indicator">
            <div 
              className="urgency-dot"
              style={{ backgroundColor: getUrgencyColor(signal.urgencyLevel) }}
            />
            <span className="urgency-text">{signal.urgencyLevel}</span>
          </div>
        </div>

        <div className="metric-item">
          <label>Type</label>
          <span className="signal-type">{signal.signalType}</span>
        </div>
      </div>

      {signal.engagement && (
        <div className="signal-engagement">
          <span className="engagement-item">
            👍 {signal.engagement.upvotes || 0}
          </span>
          <span className="engagement-item">
            💬 {signal.engagement.comments || 0}
          </span>
          {signal.engagement.views && (
            <span className="engagement-item">
              👁 {signal.engagement.views}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SignalCard;