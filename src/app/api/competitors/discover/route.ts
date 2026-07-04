import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { keyword, locationId } = body;

    // Simulate external API (Google Places / DataForSEO) latency
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockCompetitors = [
      { id: 1, name: "Joe's Emergency Plumbing", rank: 1, rating: 4.8, reviews: 310, distance: "0.8 miles" },
      { id: 2, name: "Downtown Rooter", rank: 3, rating: 4.2, reviews: 85, distance: "1.2 miles" },
      { id: 3, name: "A1 Pipe Services", rank: 6, rating: 4.5, reviews: 112, distance: "2.5 miles" },
      { id: 4, name: "Fast Fix Plumbers", rank: 8, rating: 3.9, reviews: 45, distance: "3.1 miles" },
    ];

    return NextResponse.json({ 
      message: "Competitors discovered successfully",
      competitors: mockCompetitors
    }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
