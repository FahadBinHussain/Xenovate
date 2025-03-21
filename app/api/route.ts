import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: "Xenovate API is running [ACTIVE]" });
} 