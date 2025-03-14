"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase, signIn, signUp, signOut as supabaseSignOut, getUser } from '@/lib/supabase';

type User = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
};

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName?: string, lastName?: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if user is logged in on component mount
    const checkLoginStatus = async () => {
      try {
        const supabaseUser = await getUser();
        
        if (supabaseUser) {
          const userData: User = {
            id: supabaseUser.id,
            email: supabaseUser.email || '',
            firstName: supabaseUser.user_metadata?.first_name,
            lastName: supabaseUser.user_metadata?.last_name,
          };
          setUser(userData);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  // Setup auth state listener in a separate effect to avoid navigation issues
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state change:", event, "Path:", pathname);

        if (session && session.user) {
          const userData: User = {
            id: session.user.id,
            email: session.user.email || '',
            firstName: session.user.user_metadata?.first_name,
            lastName: session.user.user_metadata?.last_name,
          };
          setUser(userData);
          setIsLoggedIn(true);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setIsLoggedIn(false);
          // Only redirect to home on explicit sign out, not on initial session check
          if (pathname !== '/') {
            router.push('/');
          }
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [pathname, router]);

  const login = async (email: string, password: string) => {
    try {
      const { user: supabaseUser } = await signIn(email, password);
      
      if (supabaseUser) {
        const userData: User = {
          id: supabaseUser.id,
          email: supabaseUser.email || '',
          firstName: supabaseUser.user_metadata?.first_name,
          lastName: supabaseUser.user_metadata?.last_name,
        };
        setUser(userData);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string, firstName?: string, lastName?: string) => {
    try {
      const { user: supabaseUser } = await signUp(email, password, firstName, lastName);
      
      if (supabaseUser) {
        const userData: User = {
          id: supabaseUser.id,
          email: supabaseUser.email || '',
          firstName,
          lastName,
        };
        setUser(userData);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await supabaseSignOut();
      setUser(null);
      setIsLoggedIn(false);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}