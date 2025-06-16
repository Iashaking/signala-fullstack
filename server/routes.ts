import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema } from "@shared/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";

const JWT_SECRET = process.env.JWT_SECRET || "signal-secret-key";

// Supabase configuration
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
let supabase: any = null;

if (supabaseUrl && supabaseServiceKey) {
  supabase = createClient(supabaseUrl, supabaseServiceKey);
}

// Stripe configuration
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Social media API search functions
async function searchReddit(query: string, limit: number = 10) {
  try {
    const response = await axios.get(`https://www.reddit.com/search.json`, {
      params: {
        q: query,
        limit,
        sort: 'relevance',
        t: 'week'
      },
      headers: {
        'User-Agent': 'SignalDiscovery/1.0'
      }
    });

    return response.data.data.children.map((post: any, index: number) => ({
      id: `reddit_${index + 1}`,
      platform: 'reddit',
      title: post.data.title,
      snippet: post.data.selftext?.substring(0, 200) + '...' || 'No content preview available',
      url: `https://reddit.com${post.data.permalink}`,
      source: post.data.subreddit_name_prefixed,
      signalType: 'Discussion',
      engagement: {
        upvotes: post.data.ups,
        comments: post.data.num_comments,
        views: post.data.view_count || 0
      },
      createdAt: new Date(post.data.created_utc * 1000)
    }));
  } catch (error) {
    console.error('Reddit API error:', error);
    return [];
  }
}

async function searchYouTube(query: string, limit: number = 10) {
  const youtubeApiKey = process.env.YOUTUBE_API_KEY;
  if (!youtubeApiKey) {
    console.warn('YouTube API key not configured');
    return [];
  }

  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: query,
        maxResults: limit,
        type: 'video',
        order: 'relevance',
        publishedAfter: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        key: youtubeApiKey
      }
    });

    return response.data.items.map((video: any, index: number) => ({
      id: `youtube_${index + 1}`,
      platform: 'youtube',
      title: video.snippet.title,
      snippet: video.snippet.description?.substring(0, 200) + '...' || 'No description available',
      url: `https://youtube.com/watch?v=${video.id.videoId}`,
      source: video.snippet.channelTitle,
      signalType: 'Video Content',
      engagement: {
        views: 0, // Would need additional API call for view count
        comments: 0,
        upvotes: 0
      },
      createdAt: new Date(video.snippet.publishedAt)
    }));
  } catch (error) {
    console.error('YouTube API error:', error);
    return [];
  }
}

async function searchTwitter(query: string, limit: number = 10) {
  const twitterBearerToken = process.env.TWITTER_BEARER_TOKEN;
  if (!twitterBearerToken) {
    console.warn('Twitter API key not configured');
    return [];
  }

  try {
    const response = await axios.get('https://api.twitter.com/2/tweets/search/recent', {
      params: {
        query: `${query} -is:retweet lang:en`,
        max_results: limit,
        'tweet.fields': 'author_id,created_at,public_metrics,context_annotations',
        'user.fields': 'username,name'
      },
      headers: {
        'Authorization': `Bearer ${twitterBearerToken}`
      }
    });

    return response.data.data?.map((tweet: any, index: number) => ({
      id: `twitter_${index + 1}`,
      platform: 'twitter',
      title: tweet.text.substring(0, 100) + '...',
      snippet: tweet.text,
      url: `https://twitter.com/user/status/${tweet.id}`,
      source: 'Twitter',
      signalType: 'Social Media',
      engagement: {
        upvotes: tweet.public_metrics?.like_count || 0,
        comments: tweet.public_metrics?.reply_count || 0,
        views: tweet.public_metrics?.impression_count || 0
      },
      createdAt: new Date(tweet.created_at)
    })) || [];
  } catch (error) {
    console.error('Twitter API error:', error);
    return [];
  }
}

// Relevance scoring algorithm
function calculateRelevanceScore(signal: any, businessIdea: string, searchType: string, intentLevel: string): number {
  let score = 0.5; // Base score

  // Keyword matching
  const keywords = businessIdea.toLowerCase().split(' ');
  const content = (signal.title + ' ' + signal.snippet).toLowerCase();
  const keywordMatches = keywords.filter(keyword => content.includes(keyword)).length;
  score += (keywordMatches / keywords.length) * 0.3;

  // Engagement scoring
  const engagement = signal.engagement;
  if (engagement) {
    const totalEngagement = (engagement.upvotes || 0) + (engagement.comments || 0) + (engagement.views || 0) / 100;
    score += Math.min(totalEngagement / 1000, 0.2);
  }

  // Recency bonus
  if (signal.createdAt) {
    const daysSinceCreated = (Date.now() - new Date(signal.createdAt).getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceCreated <= 7) score += 0.1;
    else if (daysSinceCreated <= 30) score += 0.05;
  }

  return Math.min(Math.max(score, 0), 1);
}

function calculateUrgencyLevel(signal: any, timeRange: string): string {
  const daysSinceCreated = signal.createdAt 
    ? (Date.now() - new Date(signal.createdAt).getTime()) / (1000 * 60 * 60 * 24)
    : 365;

  const engagement = signal.engagement;
  const totalEngagement = (engagement?.upvotes || 0) + (engagement?.comments || 0);

  if (daysSinceCreated <= 1 && totalEngagement > 100) return 'Critical';
  if (daysSinceCreated <= 7 && totalEngagement > 50) return 'High';
  if (daysSinceCreated <= 30 && totalEngagement > 20) return 'Medium';
  return 'Low';
}

// CSV conversion utility
function convertToCSV(signals: any[]): string {
  if (signals.length === 0) return '';
  
  const headers = ['Platform', 'Title', 'Snippet', 'URL', 'Source', 'Relevance Score', 'Urgency Level', 'Signal Type', 'Upvotes', 'Comments', 'Views'];
  const csvRows = [headers.join(',')];
  
  signals.forEach(signal => {
    const row = [
      signal.platform || '',
      `"${(signal.title || '').replace(/"/g, '""')}"`,
      `"${(signal.snippet || '').replace(/"/g, '""')}"`,
      signal.url || '',
      signal.source || '',
      signal.relevanceScore || 0,
      signal.urgencyLevel || '',
      signal.signalType || '',
      signal.engagement?.upvotes || 0,
      signal.engagement?.comments || 0,
      signal.engagement?.views || 0
    ];
    csvRows.push(row.join(','));
  });
  
  return csvRows.join('\n');
}

const authenticateToken = async (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    let user = await storage.getUser(decoded.userId);
    
    // If user not found but token is valid, check if it's the demo user and recreate
    if (!user && decoded.userId === 1) {
      const hashedPassword = await bcrypt.hash('demo123', 10);
      user = await storage.createUser({
        username: 'demo',
        email: 'demo@signal.com',
        password: hashedPassword
      });
    }
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/auth/register", async (req, res) => {
    try {
      const result = insertUserSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid input data" });
      }

      const { username, email, password } = result.data;

      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "User with this email already exists" });
      }

      const existingUsername = await storage.getUserByUsername(username);
      if (existingUsername) {
        return res.status(400).json({ message: "Username already taken" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await storage.createUser({
        username,
        email,
        password: hashedPassword
      });

      res.status(201).json({ message: "User created successfully", userId: user.id });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
      }

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/auth/verify", authenticateToken, async (req: any, res) => {
    res.json({
      user: {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email
      }
    });
  });

  // Demo user endpoint for testing billing
  app.post("/api/auth/demo-login", async (req, res) => {
    try {
      // Create or get demo user
      let user = await storage.getUserByEmail('demo@signal.com');
      
      if (!user) {
        const hashedPassword = await bcrypt.hash('demo123', 10);
        user = await storage.createUser({
          username: 'demo',
          email: 'demo@signal.com',
          password: hashedPassword
        });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });
    } catch (error) {
      console.error("Demo login error:", error);
      res.status(500).json({ message: "Demo login failed" });
    }
  });

  app.post("/api/search", authenticateToken, async (req: any, res) => {
    try {
      const { businessIdea, platforms, searchType, intentLevel, timeRange, maxResults } = req.body;
      
      if (!businessIdea || !platforms || platforms.length === 0) {
        return res.status(400).json({ message: "Business idea and platforms are required" });
      }

      const signals = [];
      
      // Reddit API integration
      if (platforms.includes('reddit')) {
        try {
          const redditSignals = await searchReddit(businessIdea, maxResults || 10);
          signals.push(...redditSignals);
        } catch (error) {
          console.error("Reddit search failed:", error);
        }
      }

      // YouTube API integration
      if (platforms.includes('youtube')) {
        try {
          const youtubeSignals = await searchYouTube(businessIdea, maxResults || 10);
          signals.push(...youtubeSignals);
        } catch (error) {
          console.error("YouTube search failed:", error);
        }
      }

      // Twitter/X API integration
      if (platforms.includes('twitter')) {
        try {
          const twitterSignals = await searchTwitter(businessIdea, maxResults || 10);
          signals.push(...twitterSignals);
        } catch (error) {
          console.error("Twitter search failed:", error);
        }
      }

      // Apply relevance scoring and filtering
      const scoredSignals = signals.map(signal => ({
        ...signal,
        relevanceScore: calculateRelevanceScore(signal, businessIdea, searchType, intentLevel),
        urgencyLevel: calculateUrgencyLevel(signal, timeRange)
      })).sort((a, b) => b.relevanceScore - a.relevanceScore);

      res.json({ signals: scoredSignals.slice(0, maxResults || 20) });
    } catch (error) {
      console.error("Search error:", error);
      res.status(500).json({ message: "Search failed" });
    }
  });

  // Stripe payment routes
  app.post("/api/create-checkout-session", authenticateToken, async (req: any, res) => {
    try {
      const { plan } = req.body;
      const user = req.user;

      if (!plan || !['starter', 'plus'].includes(plan)) {
        return res.status(400).json({ message: "Invalid plan" });
      }

      const prices: { [key: string]: number } = {
        starter: 700, // $7.00 in cents
        plus: 1500    // $15.00 in cents
      };

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `Signal Discovery ${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`,
                description: plan === 'starter' 
                  ? '200 search results per month with advanced filtering'
                  : '600 search results per month with advanced AI filtering and priority support'
              },
              unit_amount: prices[plan],
              recurring: {
                interval: 'month'
              }
            },
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `https://${req.headers.host}/settings/billing?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `https://${req.headers.host}/settings/billing?canceled=true`,
        client_reference_id: user.id.toString(),
        metadata: {
          userId: user.id.toString(),
          plan: plan
        }
      });

      res.json({ url: session.url });
    } catch (error: any) {
      console.error("Stripe checkout error:", error);
      res.status(500).json({ message: "Error creating checkout session: " + error.message });
    }
  });

  app.post("/api/create-customer-portal-session", authenticateToken, async (req: any, res) => {
    try {
      const user = req.user;
      
      // Create customer portal session
      // Note: In production, you'd store the actual Stripe customer ID with the user
      const customers = await stripe.customers.list({
        email: user.email,
        limit: 1
      });

      let customerId;
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
      } else {
        const customer = await stripe.customers.create({
          email: user.email,
          name: user.username
        });
        customerId = customer.id;
      }

      const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `https://${req.headers.host}/settings/billing`,
      });

      res.json({ url: session.url });
    } catch (error: any) {
      console.error("Stripe portal error:", error);
      res.status(500).json({ message: "Error creating portal session: " + error.message });
    }
  });

  // Saved searches endpoints
  app.get("/api/saved-searches", authenticateToken, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const savedSearches = await storage.getSavedSearches(userId);
      res.json({ searches: savedSearches });
    } catch (error) {
      console.error("Get saved searches error:", error);
      res.status(500).json({ message: "Failed to fetch saved searches" });
    }
  });

  app.post("/api/saved-searches", authenticateToken, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const { name, searchData } = req.body;
      
      if (!name || !searchData) {
        return res.status(400).json({ message: "Name and search data are required" });
      }

      const savedSearch = await storage.createSavedSearch({
        name,
        userId,
        businessIdea: searchData.businessIdea || '',
        platforms: searchData.platforms || [],
        searchType: searchData.searchType || 'all',
        intentLevel: searchData.intentLevel || 'medium',
        timeRange: searchData.timeRange || 'week',
        maxResults: searchData.maxResults || 20
      });

      res.status(201).json({ search: savedSearch });
    } catch (error) {
      console.error("Save search error:", error);
      res.status(500).json({ message: "Failed to save search" });
    }
  });

  app.delete("/api/saved-searches/:id", authenticateToken, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const searchId = parseInt(req.params.id);
      
      await storage.deleteSavedSearch(searchId, userId);
      res.json({ message: "Search deleted successfully" });
    } catch (error) {
      console.error("Delete saved search error:", error);
      res.status(500).json({ message: "Failed to delete search" });
    }
  });

  // Saved signals endpoints
  app.get("/api/saved-signals", authenticateToken, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const savedSignals = await storage.getSavedSignals(userId);
      res.json({ signals: savedSignals });
    } catch (error) {
      console.error("Get saved signals error:", error);
      res.status(500).json({ message: "Failed to fetch saved signals" });
    }
  });

  app.post("/api/saved-signals", authenticateToken, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const { signalData } = req.body;
      
      if (!signalData) {
        return res.status(400).json({ message: "Signal data is required" });
      }

      const savedSignal = await storage.createSavedSignal({
        userId,
        platform: signalData.platform,
        title: signalData.title,
        snippet: signalData.snippet,
        url: signalData.url,
        source: signalData.source,
        relevanceScore: signalData.relevanceScore,
        urgencyLevel: signalData.urgencyLevel,
        signalType: signalData.signalType,
        engagement: JSON.stringify(signalData.engagement || {})
      });

      res.status(201).json({ signal: savedSignal });
    } catch (error) {
      console.error("Save signal error:", error);
      res.status(500).json({ message: "Failed to save signal" });
    }
  });

  app.delete("/api/saved-signals/:id", authenticateToken, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const signalId = parseInt(req.params.id);
      
      await storage.deleteSavedSignal(signalId, userId);
      res.json({ message: "Signal deleted successfully" });
    } catch (error) {
      console.error("Delete saved signal error:", error);
      res.status(500).json({ message: "Failed to delete signal" });
    }
  });

  // Export functionality
  app.post("/api/export-results", authenticateToken, async (req: any, res) => {
    try {
      const { signals, format } = req.body;
      
      if (!signals || !Array.isArray(signals)) {
        return res.status(400).json({ message: "Signals array is required" });
      }

      if (format === 'csv') {
        const csv = convertToCSV(signals);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="signals-export.csv"');
        res.send(csv);
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'attachment; filename="signals-export.json"');
        res.json({ signals, exportedAt: new Date().toISOString() });
      }
    } catch (error) {
      console.error("Export error:", error);
      res.status(500).json({ message: "Export failed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
