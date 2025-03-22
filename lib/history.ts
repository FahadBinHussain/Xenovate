import { supabase } from '@/lib/supabase';

export interface HistoryItem {
  id?: string;
  user_id: string;
  operation_type: 'analyze' | 'optimize' | 'convert' | 'explain';
  code_snippet: string;
  language: string;
  target_language?: string;
  result_summary: string;
  created_at?: string;
}

/**
 * Save a history item to the database
 */
export async function saveHistoryItem(historyItem: Omit<HistoryItem, 'id' | 'created_at'>): Promise<HistoryItem | null> {
  try {
    // Check if user ID is provided
    if (!historyItem.user_id) {
      console.warn('Cannot save history: No user_id provided');
      return null;
    }
    
    // Insert the history item
    const { data, error } = await supabase
      .from('history')
      .insert({
        user_id: historyItem.user_id,
        operation_type: historyItem.operation_type,
        code_snippet: historyItem.code_snippet.substring(0, 500), // Limit code snippet length
        language: historyItem.language,
        target_language: historyItem.target_language || null,
        result_summary: historyItem.result_summary.substring(0, 1000), // Limit result summary length
      })
      .select()
      .single();
      
    if (error) {
      console.error('Error saving history item:', error);
      return null;
    }
    
    return data as HistoryItem;
  } catch (error) {
    console.error('Error in saveHistoryItem:', error);
    return null;
  }
}

/**
 * Get history items for the current user
 * @param userId Optional user ID to use instead of getting from auth
 */
export async function getUserHistory(userId?: string): Promise<HistoryItem[]> {
  try {
    let userIdToUse = userId;
    
    // If no userId provided, get from auth
    if (!userIdToUse) {
      // Get the current user
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;
      
      if (!user) {
        console.warn('Cannot get history: No authenticated user');
        return [];
      }
      
      userIdToUse = user.id;
    }
    
    console.log('getUserHistory: User ID:', userIdToUse);
    
    // Debug the table structure first
    try {
      const { data: tableInfo, error: tableError } = await supabase
        .from('information_schema.columns')
        .select('column_name, data_type')
        .eq('table_name', 'history')
        .eq('table_schema', 'public');
        
      if (tableError) {
        console.error('Error getting table schema:', tableError);
      } else {
        console.log('Table schema:', tableInfo);
      }
    } catch (e) {
      console.error('Error in table schema query:', e);
    }
    
    // Get history items for this user, newest first - using rpc to bypass RLS
    // Directly query the table without using RLS
    const { data, error } = await supabase
      .from('history')
      .select('*')
      .eq('user_id', userIdToUse)
      .order('created_at', { ascending: false })
      .limit(20);
      
    if (error) {
      console.error('Error getting user history:', error);
      return [];
    }
    
    console.log('getUserHistory: Items found:', data?.length || 0);
    if (data?.length) {
      console.log('getUserHistory: First item:', { 
        id: data[0].id,
        operation_type: data[0].operation_type,
        user_id: data[0].user_id
      });
    } else {
      console.log('getUserHistory: First item: none');
      
      // Debug query without filters to see if any data exists
      console.log('Attempting query without user_id filter');
      const { data: allData, error: allError } = await supabase
        .from('history')
        .select('*')
        .limit(5);
        
      if (allError) {
        console.error('Error in debug query:', allError);
      } else {
        console.log('Debug query results:', allData?.length || 0, 'items');
        if (allData?.length) {
          console.log('Sample items:', allData.map(item => ({ id: item.id, user_id: item.user_id })));
        }
      }
    }
    
    return data as HistoryItem[];
  } catch (error) {
    console.error('Error in getUserHistory:', error);
    return [];
  }
}

/**
 * Delete a history item
 * @param id ID of the history item to delete
 * @param userId Optional user ID to use instead of getting from auth
 */
export async function deleteHistoryItem(id: string, userId?: string): Promise<boolean> {
  try {
    let userIdToUse = userId;
    
    // If no userId provided, get from auth
    if (!userIdToUse) {
      // Get the current user
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;
      
      if (!user) {
        console.warn('Cannot delete history: No authenticated user');
        return false;
      }
      
      userIdToUse = user.id;
    }
    
    // Delete the history item
    const { error } = await supabase
      .from('history')
      .delete()
      .eq('id', id)
      .eq('user_id', userIdToUse); // Ensure the item belongs to the user
      
    if (error) {
      console.error('Error deleting history item:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in deleteHistoryItem:', error);
    return false;
  }
}

/**
 * Clear all history for the current user
 * @param userId Optional user ID to use instead of getting from auth
 */
export async function clearUserHistory(userId?: string): Promise<boolean> {
  try {
    let userIdToUse = userId;
    
    // If no userId provided, get from auth
    if (!userIdToUse) {
      // Get the current user
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;
      
      if (!user) {
        console.warn('Cannot clear history: No authenticated user');
        return false;
      }
      
      userIdToUse = user.id;
    }
    
    // Delete all history items for this user
    const { error } = await supabase
      .from('history')
      .delete()
      .eq('user_id', userIdToUse);
      
    if (error) {
      console.error('Error clearing user history:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in clearUserHistory:', error);
    return false;
  }
} 