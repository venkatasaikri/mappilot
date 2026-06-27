import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const scanId = id;

  // Stub: Fetch scan metadata and node rankings from database
  const mockScanDetails = {
    id: scanId,
    keyword: "plumber near me",
    gridSize: "5x5",
    radius: "5 Miles",
    nodes: [
      { lat: 34.0522, lng: -118.2437, rank: 21 },
      { lat: 34.0542, lng: -118.2437, rank: 14 },
      { lat: 34.0562, lng: -118.2437, rank: 8 },
      // ... 22 more mocked nodes
    ],
    competitors: [
      { name: "Joe's Emergency Plumbing", avgRank: 2.1 },
      { name: "Downtown Rooter", avgRank: 3.4 }
    ]
  };

  return NextResponse.json(mockScanDetails);
}
