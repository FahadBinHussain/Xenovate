import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/debug - Debug Supabase connection and tables
export async function GET() {
  try {
    // Check Supabase connection
    const { data: authData } = await supabase.auth.getSession();
    
    // Debug connection info
    const connectionInfo = {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 15) + '...',
      authSessionExists: !!authData.session,
    };
    
    // Check if history table has data
    const { data: historyData, error: historyError } = await supabase
      .from('history')
      .select('id, user_id, operation_type')
      .limit(5);
    
    // Try to get metadata about all tables
    const { data: metaData, error: metaError } = await supabase
      .from('pg_catalog.pg_tables')
      .select('schemaname, tablename')
      .eq('schemaname', 'public')
      .limit(10);
    
    return NextResponse.json({
      connection: connectionInfo,
      historyRecords: historyData || [],
      historyError: historyError?.message,
      metaError: metaError?.message,
      metaData: metaData || [],
    });
  } catch (error: any) {
    console.error('Debug API error:', error);
    return NextResponse.json(
      { error: 'API error', message: error.message },
      { status: 500 }
    );
  }
} 