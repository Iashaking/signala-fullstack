import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Auth helper functions
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

export const getCurrentSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession()
  return { session, error }
}

// Database helper functions
export const saveSignal = async (signal: {
  title: string
  snippet: string
  platform: string
  url: string
  relevance_score?: number
  urgency_level?: string
  signal_type?: string
}) => {
  const { data, error } = await supabase
    .from('saved_signals')
    .insert([signal])
    .select()
  return { data, error }
}

export const getSavedSignals = async () => {
  const { data, error } = await supabase
    .from('saved_signals')
    .select('*')
    .order('created_at', { ascending: false })
  return { data, error }
}

export const saveSearch = async (search: {
  name: string
  query: object
  results_count?: number
}) => {
  const { data, error } = await supabase
    .from('saved_searches')
    .insert([search])
    .select()
  return { data, error }
}

export const getSavedSearches = async () => {
  const { data, error } = await supabase
    .from('saved_searches')
    .select('*')
    .order('created_at', { ascending: false })
  return { data, error }
}

export default supabase