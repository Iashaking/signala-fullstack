# Signal - AI-Powered Customer Insights Platform

Signal is a powerful web platform that helps founders and product teams discover actionable customer insights by intelligently analyzing conversations from Reddit and YouTube. The application leverages advanced AI to score, filter, and present meaningful market research data through organized Signal Cards.

## Features

- **Multi-Platform Search**: Search across Reddit and YouTube for customer conversations
- **AI-Powered Analysis**: Enhanced keyword analysis with intelligent relevance and urgency scoring
- **Signal Detection**: Automatically categorizes findings as Pain Points, Desires, Feedback, or Questions
- **User Management**: Complete authentication system with Google OAuth integration
- **Subscription Management**: Stripe-powered billing with multiple plan tiers
- **Enterprise Security**: Comprehensive input validation and security protection
- **Responsive Design**: Bootstrap-powered UI with dark theme support

## Tech Stack

- **Backend**: Python Flask with SQLAlchemy ORM
- **Database**: SQLite (with Supabase migration support)
- **Frontend**: Bootstrap 5 with responsive design
- **AI Analysis**: Enhanced keyword analysis with fallback support
- **Authentication**: Google OAuth integration
- **Payments**: Stripe checkout and billing
- **APIs**: Reddit PRAW and YouTube Data API v3

## Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/signal.git
cd signal
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Set up environment variables**
Create a `.env` file with:
```
SESSION_SECRET=your-session-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
STRIPE_SECRET_KEY=your-stripe-secret-key
REDDIT_CLIENT_ID=your-reddit-client-id
REDDIT_CLIENT_SECRET=your-reddit-client-secret
YOUTUBE_API_KEY=your-youtube-api-key
```

4. **Run the application**
```bash
python main.py
```

## Configuration

### Required API Keys

- **Google OAuth**: For user authentication
- **Stripe**: For payment processing
- **Reddit API**: For Reddit content analysis
- **YouTube API**: For YouTube content analysis

### Database Setup

The application uses SQLite by default for maximum compatibility. For production deployments, you can configure PostgreSQL or Supabase.

## Usage

1. **Sign up** using Google authentication
2. **Select a plan** (Free, Starter, or Growth)
3. **Create a search** by entering your business query
4. **Choose platforms** (Reddit, YouTube, or both)
5. **Review results** with AI-powered relevance scoring
6. **Export insights** for further analysis

## Security Features

- Input sanitization and validation
- XSS and injection attack prevention
- Rate limiting and abuse protection
- Secure session management
- HTTPS enforcement

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the GitHub repository.