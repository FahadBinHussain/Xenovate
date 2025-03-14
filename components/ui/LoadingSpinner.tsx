"use client";

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

export function LoadingSpinner({ size = 'md', message = 'Loading...' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
      <div 
        className={`${sizeClasses[size]} rounded-full border-t-transparent border-primary animate-spin`}
        role="status"
        aria-label="Loading"
      />
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
} 