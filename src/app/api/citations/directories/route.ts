import { NextResponse } from 'next/server';

export async function GET() {
  // Mock Directory Status Data
  const directoryStatus = {
    healthScore: 72,
    totalScanned: 50,
    accurate: 36,
    errors: 9,
    missing: 5,
    lastScanned: "2026-06-15T08:15:00Z"
  };

  return NextResponse.json(directoryStatus);
}
