"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, ChevronDown } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

interface ModelInfo {
  name: string;
  status: 'available' | 'not_available' | 'quota_exceeded' | 'timeout' | 'error';
  message?: string;
}

const ModelStatus = () => {
  const [models, setModels] = useState<ModelInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timedOut, setTimedOut] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (loading) {
        setTimedOut(true);
      }
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, [loading]);

  const fetchModels = async () => {
    setLoading(true);
    setError(null);
    setTimedOut(false);

    try {
      const response = await fetch('/api/models');
      if (!response.ok) {
        throw new Error(`Error fetching models: ${response.status}`);
      }
      const data = await response.json();
      setModels(data.models || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch model status');
      console.error('Error fetching model status:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  const getStatusColor = (status: ModelInfo['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-500';
      case 'quota_exceeded':
        return 'bg-yellow-500';
      case 'timeout':
        return 'bg-orange-500';
      case 'not_available':
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: ModelInfo['status']) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'quota_exceeded':
        return 'Quota Exceeded';
      case 'timeout':
        return 'Timeout';
      case 'not_available':
        return 'Not Available';
      case 'error':
        return 'Error';
      default:
        return 'Unknown';
    }
  };

  const getOverallStatus = (): { color: string, text: string } => {
    if (loading) return { color: 'bg-gray-500', text: 'Checking...' };
    if (error || timedOut) return { color: 'bg-red-500', text: 'Error' };
    
    const availableModels = models.filter(m => m.status === 'available');
    if (availableModels.length === 0) return { color: 'bg-red-500', text: 'No Models' };
    if (availableModels.length < models.length) return { color: 'bg-yellow-500', text: 'Partial' };
    return { color: 'bg-green-500', text: 'Ready' };
  };

  const status = getOverallStatus();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <div className={`h-2 w-2 rounded-full ${status.color}`} />
          <span>Models: {status.text}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-3">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-sm">AI Model Status</h4>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={fetchModels} 
            className="h-7 px-2"
            disabled={loading}
          >
            <RefreshCw className={`h-3.5 w-3.5 mr-1 ${loading ? 'animate-spin' : ''}`} />
            {loading ? "Checking..." : "Refresh"}
          </Button>
        </div>
        
        {loading ? (
          <div className="text-sm text-muted-foreground py-1">
            Checking model availability...
          </div>
        ) : error || timedOut ? (
          <div className="text-sm text-red-500 py-1">
            {timedOut ? "Loading timed out. Click refresh to try again." : error}
          </div>
        ) : models.length > 0 ? (
          <div className="space-y-1.5">
            {models.map((model) => (
              <div key={model.name} className="flex items-center justify-between text-sm py-0.5">
                <div className="flex items-center">
                  <div className={`h-2 w-2 rounded-full mr-2 ${getStatusColor(model.status)}`} />
                  <span>{model.name}</span>
                </div>
                <Badge 
                  variant={model.status === 'available' ? 'outline' : 'secondary'}
                  className="text-xs font-normal"
                >
                  {getStatusText(model.status)}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground py-1">
            No model information available
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default ModelStatus; 