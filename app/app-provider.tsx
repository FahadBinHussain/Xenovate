"use client";

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';

interface AppProviderProps {
  children: React.ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
  const { loading } = useAuth();
  const pathname = usePathname();
  
  // Log navigation events to help debug auth issues
  useEffect(() => {
    console.log(`Navigation to: ${pathname}, loading: ${loading}`);
  }, [pathname, loading]);

  return (
    <>
      <Header />
      <main>
        {children}
      </main>
    </>
  );
} 