"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ModelInfo {
  name: string;
  status: 'available' | 'quota_exceeded' | 'not_available' | 'error' | 'unknown';
  error?: string;
  isDefault: boolean;
}

interface ModelsResponse {
  models: ModelInfo[];
  defaultModel: string;
  error?: string;
  apiConfigured: boolean;
}

export function ModelStatus() {
  const [modelsInfo, setModelsInfo] = useState<ModelsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchModels() {
      try {
        setLoading(true);
        const response = await fetch('/api/models');
        
        if (!response.ok) {
          throw new Error(`Error fetching models: ${response.status}`);
        }
        
        const data = await response.json();
        setModelsInfo(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch model information');
        console.error('Error fetching models:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchModels();
  }, []);

  if (loading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-lg">AI Model Status</CardTitle>
          <CardDescription>Loading available models...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (error || !modelsInfo) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-lg">AI Model Status</CardTitle>
          <CardDescription className="text-red-500">
            {error || 'Failed to load model information'}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-lg">AI Model Status</CardTitle>
        <CardDescription>
          {modelsInfo.apiConfigured ? 
            'Available AI models and their status' : 
            'API key not configured properly'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {modelsInfo.models.map((model) => (
            <div key={model.name} className="flex items-center justify-between p-2 border rounded-md">
              <div className="flex items-center gap-2">
                <span className="font-medium">{model.name}</span>
                {model.isDefault && (
                  <Badge variant="outline" className="text-xs">Default</Badge>
                )}
              </div>
              
              <Badge 
                variant={
                  model.status === 'available' ? 'default' : 
                  model.status === 'quota_exceeded' ? 'destructive' : 
                  'secondary'
                }
                className="text-xs"
              >
                {model.status === 'available' ? 'Available' : 
                 model.status === 'quota_exceeded' ? 'Quota Exceeded' :
                 model.status === 'not_available' ? 'Not Available' :
                 model.status === 'error' ? 'Error' : 'Unknown'}
              </Badge>
            </div>
          ))}
        </div>
        
        {modelsInfo.error && (
          <p className="mt-4 text-sm text-red-500">{modelsInfo.error}</p>
        )}
      </CardContent>
    </Card>
  );
} 