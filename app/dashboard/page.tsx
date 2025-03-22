"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Trash2, RefreshCw, Code, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { HistoryItem } from "@/lib/history";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoggedIn, loading } = useAuth();
  
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  // Debug authentication
  useEffect(() => {
    console.log('Dashboard: Auth state -', { 
      isLoggedIn, 
      userId: user?.id,
      loading
    });
    
    // Debug cookies
    console.log('Dashboard: Document cookies:', document.cookie);
    
    // Check if we have supabase cookies
    const hasSbAccessToken = document.cookie.includes('sb-access-token');
    const hasSbRefreshToken = document.cookie.includes('sb-refresh-token');
    console.log('Dashboard: Has Supabase cookies?', { hasSbAccessToken, hasSbRefreshToken });
    
  }, [isLoggedIn, user, loading]);
  
  // Fetch history when component mounts
  useEffect(() => {
    if (isLoggedIn && user) {
      console.log('Dashboard: User authenticated, fetching history');
      fetchHistory();
    }
  }, [isLoggedIn, user]);
  
  // Fetch history from the API
  const fetchHistory = async () => {
    setHistoryLoading(true);
    console.log('Dashboard: Starting history fetch');
    try {
      const response = await fetch('/api/history', {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      console.log('Dashboard: API response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch history: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Dashboard: History data received:', data);
      setHistory(data.history || []);
      console.log('Dashboard: History state set with', data.history?.length || 0, 'items');
    } catch (error) {
      console.error('Error fetching history:', error);
      toast.error('Failed to load history');
    } finally {
      setHistoryLoading(false);
    }
  };
  
  // Delete a history item
  const deleteHistoryItem = async (id: string) => {
    setDeletingId(id);
    try {
      const response = await fetch(`/api/history?id=${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`Failed to delete history item: ${response.status}`);
      }
      
      // Remove the item from the state
      setHistory(history.filter(item => item.id !== id));
      toast.success('History item deleted');
    } catch (error) {
      console.error('Error deleting history item:', error);
      toast.error('Failed to delete history item');
    } finally {
      setDeletingId(null);
    }
  };
  
  // Clear all history
  const clearAllHistory = async () => {
    if (!confirm('Are you sure you want to clear all history?')) {
      return;
    }
    
    setHistoryLoading(true);
    try {
      const response = await fetch('/api/history?all=true', {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`Failed to clear history: ${response.status}`);
      }
      
      setHistory([]);
      toast.success('History cleared');
    } catch (error) {
      console.error('Error clearing history:', error);
      toast.error('Failed to clear history');
    } finally {
      setHistoryLoading(false);
    }
  };
  
  // Format the date for display
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy h:mm a');
    } catch (e) {
      return 'Unknown date';
    }
  };
  
  // Get badge color based on operation type
  const getOperationColor = (type: string) => {
    switch (type) {
      case 'analyze': return 'bg-blue-500';
      case 'optimize': return 'bg-purple-500';
      case 'convert': return 'bg-green-500';
      case 'explain': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, loading, router]);

  if (loading) {
    return (
      <div className="container mx-auto py-12">
        <LoadingSpinner size="lg" message="Loading your dashboard..." />
      </div>
    );
  }

  if (!isLoggedIn) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>History</CardTitle>
              <CardDescription>Your recent activity on Xenovate</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={fetchHistory}
                disabled={historyLoading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${historyLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              {history.length > 0 && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={clearAllHistory}
                  disabled={historyLoading}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {historyLoading ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner size="md" message="Loading history..." />
              </div>
            ) : history.length > 0 ? (
              <div className="space-y-4">
                {history.map((item) => (
                  <div 
                    key={item.id} 
                    className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <div className={`${getOperationColor(item.operation_type)} h-2 w-2 rounded-full mr-2`} />
                        <h3 className="font-medium capitalize">{item.operation_type}</h3>
                        <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded ml-2">
                          {item.language}{item.target_language ? ` → ${item.target_language}` : ''}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => item.id && deleteHistoryItem(item.id)}
                        disabled={deletingId === item.id}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="text-sm mb-2">
                      <div className="font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-xs overflow-x-auto whitespace-pre">
                        {item.code_snippet.length > 100 ? item.code_snippet.substring(0, 100) + '...' : item.code_snippet}
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      <p>{item.result_summary}</p>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                      <span>{item.created_at && formatDate(item.created_at)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-b pb-2">
                <p className="text-sm text-muted-foreground">No recent activities yet. Start by analyzing, optimizing, converting, or explaining code on the home page.</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Link href="/" className="w-full">
              <Button className="w-full">Go to Workspace</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 