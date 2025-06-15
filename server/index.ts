import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { createClient } from '@supabase/supabase-js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdn.jsdelivr.net"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", supabaseUrl]
    }
  }
}));

app.use(compression());
app.use(morgan('combined'));
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-domain.com'] 
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from the built React app
app.use(express.static(join(__dirname, 'dist')));

// API Routes
app.post('/api/search', async (req, res) => {
  try {
    const { businessIdea, platforms, searchType, intentLevel, timeRange, maxResults } = req.body;
    
    // Input validation
    if (!businessIdea || !platforms || platforms.length === 0) {
      return res.status(400).json({ 
        error: 'Business idea and at least one platform are required' 
      });
    }

    // Call the Python backend search API
    const pythonBackendUrl = process.env.PYTHON_BACKEND_URL || 'http://localhost:5000';
    const searchResponse = await fetch(`${pythonBackendUrl}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        business_idea: businessIdea,
        platforms,
        search_type: searchType,
        intent_level: intentLevel,
        time_range: timeRange,
        max_results: maxResults
      })
    });

    if (!searchResponse.ok) {
      throw new Error(`Search API error: ${searchResponse.status}`);
    }

    const searchData = await searchResponse.json();
    res.json(searchData);

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ 
      error: 'Search failed. Please try again.' 
    });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    res.json({
      user: data.user,
      token: data.session?.access_token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, username } = req.body;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username
        }
      }
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({
      message: 'Registration successful. Please check your email to verify your account.',
      user: data.user
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.get('/api/auth/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    res.json({ user: data.user });

  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

app.post('/api/signals/save', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const { data: user } = await supabase.auth.getUser(token);
    
    if (!user.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { signal } = req.body;
    
    const { data, error } = await supabase
      .from('saved_signals')
      .insert([{
        user_id: user.user.id,
        title: signal.title,
        snippet: signal.snippet,
        platform: signal.platform,
        url: signal.url,
        relevance_score: signal.relevance_score,
        urgency_level: signal.urgency_level,
        signal_type: signal.signal_type
      }]);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Signal saved successfully', data });

  } catch (error) {
    console.error('Save signal error:', error);
    res.status(500).json({ error: 'Failed to save signal' });
  }
});

app.get('/api/signals', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const { data: user } = await supabase.auth.getUser(token);
    
    if (!user.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { data, error } = await supabase
      .from('saved_signals')
      .select('*')
      .eq('user_id', user.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ signals: data });

  } catch (error) {
    console.error('Get signals error:', error);
    res.status(500).json({ error: 'Failed to get signals' });
  }
});

app.post('/api/searches/save', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const { data: user } = await supabase.auth.getUser(token);
    
    if (!user.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { name, query, results_count } = req.body;
    
    const { data, error } = await supabase
      .from('saved_searches')
      .insert([{
        user_id: user.user.id,
        name,
        query,
        results_count
      }]);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Search saved successfully', data });

  } catch (error) {
    console.error('Save search error:', error);
    res.status(500).json({ error: 'Failed to save search' });
  }
});

app.get('/api/searches', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const { data: user } = await supabase.auth.getUser(token);
    
    if (!user.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { data, error } = await supabase
      .from('saved_searches')
      .select('*')
      .eq('user_id', user.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ searches: data });

  } catch (error) {
    console.error('Get searches error:', error);
    res.status(500).json({ error: 'Failed to get searches' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Catch all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Serving React app from: ${join(__dirname, 'dist')}`);
});

export default app;