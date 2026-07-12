import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { keyword, locationId } = body;

    if (!process.env.GOOGLE_PLACES_API_KEY) {
      return NextResponse.json({ error: 'Google Places API key is not configured' }, { status: 500 });
    }

    const location = await prisma.location.findUnique({ where: { id: locationId } });
    const queryStr = location?.address ? `${keyword} near ${location.address}` : keyword;

    const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(queryStr)}&key=${process.env.GOOGLE_PLACES_API_KEY}`);
    const data = await response.json();

    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      console.error("Google Places API Error:", data);
      return NextResponse.json({ error: 'Failed to fetch from Google Places API', details: data }, { status: 500 });
    }

    const results = (data.results || []).slice(0, 5);
    const competitors = [];

    for (let i = 0; i < results.length; i++) {
      const place = results[i];
      if (location && place.name.toLowerCase().includes(location.name.toLowerCase())) {
        continue;
      }
      
      const competitor = await prisma.competitor.create({
        data: {
          locationId: locationId,
          name: place.name,
          address: place.formatted_address,
          avgRank: i + 1,
          tracked: true
        }
      });
      competitors.push({
        id: competitor.id,
        name: competitor.name,
        rank: competitor.avgRank,
        rating: place.rating || 0,
        reviews: place.user_ratings_total || 0,
        distance: "Unknown"
      });
    }

    return NextResponse.json({ 
      message: "Competitors discovered successfully",
      competitors: competitors
    }, { status: 200 });
    
  } catch (error: any) {
    console.error('Competitor discovery error:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
