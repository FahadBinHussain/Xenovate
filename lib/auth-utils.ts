/**
 * Authentication utilities for the application
 */

import { createClient } from '@supabase/supabase-js';

// Default route to redirect to after login
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

// Auth-related utility functions
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Helper function to validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Helper function to check password strength
export const isStrongPassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

// Helper function to get error message from Supabase error
export const getAuthErrorMessage = (error: any): string => {
  if (!error) return "An unknown error occurred";
  
  if (typeof error === 'string') return error;
  
  if (error.message) {
    if (error.message.includes('Invalid login credentials')) {
      return "Invalid email or password";
    }
    return error.message;
  }
  
  return "Authentication failed. Please try again.";
}; 