export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      saved_signals: {
        Row: {
          id: string
          user_id: string
          title: string
          snippet: string | null
          platform: string
          url: string
          relevance_score: number | null
          urgency_level: string | null
          signal_type: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          snippet?: string | null
          platform: string
          url: string
          relevance_score?: number | null
          urgency_level?: string | null
          signal_type?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          snippet?: string | null
          platform?: string
          url?: string
          relevance_score?: number | null
          urgency_level?: string | null
          signal_type?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_signals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      saved_searches: {
        Row: {
          id: string
          user_id: string
          name: string
          query: Json
          results_count: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          query: Json
          results_count?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          query?: Json
          results_count?: number | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_searches_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helper types for components
export type SavedSignal = Database['public']['Tables']['saved_signals']['Row']
export type SavedSearch = Database['public']['Tables']['saved_searches']['Row']
export type InsertSignal = Database['public']['Tables']['saved_signals']['Insert']
export type InsertSearch = Database['public']['Tables']['saved_searches']['Insert']

// Search query structure
export interface SearchQuery {
  business_idea: string
  platforms: string[]
  intent_level: string
  max_results: number
  time_range?: string
  urgency_filter?: string
}

// Signal data structure from Python backend
export interface Signal {
  title: string
  snippet: string
  platform: string
  url: string
  relevance_score: number
  urgency_level: string
  signal_type: string
  source: string
  timestamp?: string
  author?: string
  engagement?: {
    upvotes?: number
    comments?: number
    views?: number
  }
}

// Search result structure
export interface SearchResult {
  query: SearchQuery
  signals: Signal[]
  total_results: number
  search_time: number
  platforms_searched: string[]
  summary?: {
    high_urgency: number
    medium_urgency: number
    low_urgency: number
    top_keywords: string[]
  }
}

// Auth types
export interface User {
  id: string
  email: string
  created_at: string
  updated_at: string
}

export interface Session {
  access_token: string
  refresh_token: string
  expires_in: number
  user: User
}