import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from '../types/database'

// Environment variables validation
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  throw new Error('VITE_SUPABASE_URL is required')
}

if (!supabaseAnonKey) {
  throw new Error('VITE_SUPABASE_ANON_KEY is required')
}

// Create typed Supabase client
export const supabaseClient: SupabaseClient<Database> = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce'
    },
    global: {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  }
)

// Auth state management
export class AuthManager {
  static async signUp(email: string, password: string) {
    try {
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })
      
      if (error) throw error
      return { user: data.user, session: data.session, error: null }
    } catch (error) {
      console.error('Sign up error:', error)
      return { user: null, session: null, error }
    }
  }

  static async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) throw error
      return { user: data.user, session: data.session, error: null }
    } catch (error) {
      console.error('Sign in error:', error)
      return { user: null, session: null, error }
    }
  }

  static async signOut() {
    try {
      const { error } = await supabaseClient.auth.signOut()
      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Sign out error:', error)
      return { error }
    }
  }

  static async resetPassword(email: string) {
    try {
      const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`
      })
      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Reset password error:', error)
      return { error }
    }
  }

  static async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabaseClient.auth.getUser()
      if (error) throw error
      return { user, error: null }
    } catch (error) {
      console.error('Get current user error:', error)
      return { user: null, error }
    }
  }

  static async getCurrentSession() {
    try {
      const { data: { session }, error } = await supabaseClient.auth.getSession()
      if (error) throw error
      return { session, error: null }
    } catch (error) {
      console.error('Get current session error:', error)
      return { session: null, error }
    }
  }
}

// Database operations
export class DatabaseManager {
  // Saved Signals operations
  static async saveSignal(signal: {
    title: string
    snippet: string
    platform: string
    url: string
    relevance_score?: number
    urgency_level?: string
    signal_type?: string
  }) {
    try {
      const { data, error } = await supabaseClient
        .from('saved_signals')
        .insert([signal])
        .select()
        .single()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Save signal error:', error)
      return { data: null, error }
    }
  }

  static async getSavedSignals(limit = 50, offset = 0) {
    try {
      const { data, error } = await supabaseClient
        .from('saved_signals')
        .select('*')
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Get saved signals error:', error)
      return { data: null, error }
    }
  }

  static async deleteSignal(id: string) {
    try {
      const { error } = await supabaseClient
        .from('saved_signals')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Delete signal error:', error)
      return { error }
    }
  }

  // Saved Searches operations
  static async saveSearch(search: {
    name: string
    query: object
    results_count?: number
  }) {
    try {
      const { data, error } = await supabaseClient
        .from('saved_searches')
        .insert([search])
        .select()
        .single()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Save search error:', error)
      return { data: null, error }
    }
  }

  static async getSavedSearches(limit = 50, offset = 0) {
    try {
      const { data, error } = await supabaseClient
        .from('saved_searches')
        .select('*')
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Get saved searches error:', error)
      return { data: null, error }
    }
  }

  static async deleteSearch(id: string) {
    try {
      const { error } = await supabaseClient
        .from('saved_searches')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Delete search error:', error)
      return { error }
    }
  }
}

// Real-time subscriptions
export class RealtimeManager {
  static subscribeToSignals(callback: (payload: any) => void) {
    return supabaseClient
      .channel('saved_signals_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'saved_signals' },
        callback
      )
      .subscribe()
  }

  static subscribeToSearches(callback: (payload: any) => void) {
    return supabaseClient
      .channel('saved_searches_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'saved_searches' },
        callback
      )
      .subscribe()
  }
}

export default supabaseClient