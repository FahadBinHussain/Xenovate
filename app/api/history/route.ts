import { NextResponse } from 'next/server';
import { getUserHistory, deleteHistoryItem, clearUserHistory } from '@/lib/history';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';

// Hard-coded ID for testing
const TEST_USER_ID = '40453ced-804f-4539-ae08-517e31143ce4';

// GET /api/history - Get user history
export async function GET() {
  try {
    // Print out all cookies for debugging
    const cookieStore = cookies();
    const allCookies = cookieStore.getAll();
    console.log('API: All cookies:', allCookies.map(c => c.name));
    
    // For now, use the TEST_USER_ID to fetch history
    console.log('API: Using test user ID:', TEST_USER_ID);
    
    // Debug: Check Supabase connection
    const { data: authData } = await supabase.auth.getSession();
    console.log('API: Auth session exists?', !!authData.session);
    
    // Debug: Try a direct query first
    const { data: directData, error: directError } = await supabase
      .from('history')
      .select('count')
      .limit(1);
    
    console.log('API: Direct query result:', directData, directError?.message);
    
    // Get history items
    const historyItems = await getUserHistory(TEST_USER_ID);
    console.log('API: History items fetched:', historyItems.length);
    
    return NextResponse.json({ history: historyItems });
  } catch (error) {
    console.error('Error fetching history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch history' },
      { status: 500 }
    );
  }
}

// DELETE /api/history?id=123 - Delete a specific history item
// DELETE /api/history?all=true - Clear all history
export async function DELETE(request: Request) {
  try {
    // Print out all cookies for debugging
    const cookieStore = cookies();
    const allCookies = cookieStore.getAll();
    console.log('API DELETE: All cookies:', allCookies.map(c => c.name));
    
    // For now, use the TEST_USER_ID to delete history
    const userId = TEST_USER_ID;
    console.log('API DELETE: Using test user ID:', userId);

    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const clearAll = url.searchParams.get('all');

    let success = false;
    
    if (clearAll === 'true') {
      // Clear all history for this user
      success = await clearUserHistory(userId);
      
      if (!success) {
        return NextResponse.json(
          { error: 'Failed to clear history' },
          { status: 500 }
        );
      }
      
      return NextResponse.json({ message: 'History cleared successfully' });
    } else if (id) {
      // Delete specific history item
      success = await deleteHistoryItem(id, userId);
      
      if (!success) {
        return NextResponse.json(
          { error: 'Failed to delete history item' },
          { status: 500 }
        );
      }
      
      return NextResponse.json({ message: 'History item deleted successfully' });
    } else {
      return NextResponse.json(
        { error: 'Missing id or all parameter' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error managing history:', error);
    return NextResponse.json(
      { error: 'Failed to manage history' },
      { status: 500 }
    );
  }
} 