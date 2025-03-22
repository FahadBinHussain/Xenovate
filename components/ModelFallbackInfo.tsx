"use client";

import { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

interface FallbackState {
  originalModel: string;
  currentModel: string;
  reason: string;
  timestamp: number;
}

const ModelFallbackInfo = () => {
  const [fallbackInfo, setFallbackInfo] = useState<FallbackState | null>(null);
  
  useEffect(() => {
    // Check for fallback info in localStorage
    const checkFallbackInfo = () => {
      try {
        const storedInfo = localStorage.getItem('ai_model_fallback');
        if (storedInfo) {
          const parsedInfo = JSON.parse(storedInfo) as FallbackState;
          
          // Only show fallback info if it's less than 1 hour old
          const oneHourAgo = Date.now() - 60 * 60 * 1000;
          if (parsedInfo.timestamp > oneHourAgo) {
            setFallbackInfo(parsedInfo);
            return;
          }
          
          // Clear old fallback info
          localStorage.removeItem('ai_model_fallback');
        }
        
        setFallbackInfo(null);
      } catch (error) {
        console.error('Error checking fallback info:', error);
        setFallbackInfo(null);
      }
    };
    
    // Check immediately and then every 5 seconds
    checkFallbackInfo();
    const interval = setInterval(checkFallbackInfo, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  if (!fallbackInfo) return null;
  
  return (
    <Alert variant="warning" className="mb-4">
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>Model Fallback</AlertTitle>
      <AlertDescription>
        Using <strong>{fallbackInfo.currentModel}</strong> instead of{' '}
        <strong>{fallbackInfo.originalModel}</strong> due to:{' '}
        {fallbackInfo.reason}
      </AlertDescription>
    </Alert>
  );
};

export default ModelFallbackInfo; 