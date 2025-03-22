import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Log important debug info
console.log('Supabase URL:', supabaseUrl ? 'Set' : 'Not set');
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Set' : 'Not set');

// Create a single supabase client for interacting with the database
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'supabase-auth',
    storage: {
      getItem: (key) => {
        if (typeof window === 'undefined') {
          return null;
        }
        console.log('Auth storage getItem:', key);
        return JSON.parse(window.localStorage.getItem(key) || 'null');
      },
      setItem: (key, value) => {
        if (typeof window !== 'undefined') {
          console.log('Auth storage setItem:', key);
          window.localStorage.setItem(key, JSON.stringify(value));
        }
      },
      removeItem: (key) => {
        if (typeof window !== 'undefined') {
          console.log('Auth storage removeItem:', key);
          window.localStorage.removeItem(key);
        }
      },
    },
  },
});

/**
 * Sign in a user with email and password
 */
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return {
    user: data.user,
    session: data.session,
  };
}

/**
 * Sign up a new user with email and password
 */
export async function signUp(
  email: string, 
  password: string, 
  firstName?: string, 
  lastName?: string
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (error) {
    throw error;
  }

  return {
    user: data.user,
    session: data.session,
  };
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    throw error;
  }
  
  return true;
}

/**
 * Get the current logged in user
 */
export async function getUser() {
  const { data } = await supabase.auth.getUser();
  return data?.user || null;
}

/**
 * Get the user from cookies - for use in API routes
 */
export async function getUserFromCookies(cookies: string) {
  if (!cookies) return null;
  
  // Create a new supabase client with cookies
  const cookieClient = createClient(
    supabaseUrl, 
    supabaseAnonKey, 
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
      global: {
        headers: {
          Cookie: cookies,
        },
      },
    }
  );
  
  // Try to get the user
  const { data } = await cookieClient.auth.getUser();
  return data?.user || null;
}

/**
 * Get the current session
 */
export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data?.session || null;
}

/**
 * Reset password for a user
 */
export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  
  if (error) {
    throw error;
  }
  
  return true;
}

/**
 * Update user profile
 */
export async function updateProfile(updates: { firstName?: string; lastName?: string; }) {
  const { error } = await supabase.auth.updateUser({
    data: {
      first_name: updates.firstName,
      last_name: updates.lastName,
    },
  });
  
  if (error) {
    throw error;
  }
  
  return true;
} 