import { NextResponse } from 'next/server';

export async function GET() {
  // Mock data representing historical grid scans
  const scans = [
    { id: "scan_123", keyword: "plumber near me", locationId: 1, size: "5x5", date: "2026-06-15", avgRank: 3.2, top3Nodes: 18 },
    { id: "scan_124", keyword: "emergency plumbing", locationId: 1, size: "3x3", date: "2026-06-14", avgRank: 7.8, top3Nodes: 2 },
  ];

  return NextResponse.json(scans);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { keyword, locationId, gridSize, radiusMiles } = body;

    // Stub: Grid Generation Algorithm
    // In production, this algorithm calculates the precise lat/lng offsets
    // for `gridSize` * `gridSize` nodes around the central `locationId` coordinate
    // based on the `radiusMiles`.
    
    // Stub: Queue Background Task
    // This would dispatch a background job (e.g. Vercel Function / Inngest)
    // to query the DataForSEO API or Google Places API for each generated node coordinate.

    return NextResponse.json({ 
      message: "Grid Scan Queued Successfully",
      scanId: `scan_new_${Math.floor(Math.random() * 1000)}`,
      estimatedNodes: parseInt(gridSize) * parseInt(gridSize),
      status: "processing"
    }, { status: 201 });
    
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
