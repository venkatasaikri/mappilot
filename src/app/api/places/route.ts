import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ 
      error: 'GOOGLE_PLACES_API_KEY is not configured in the environment variables.',
      results: [] 
    }, { status: 500 });
  }

  try {
    const googleRes = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`);
    const data = await googleRes.json();

    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      return NextResponse.json({ error: `Google API Error: ${data.status}` }, { status: 500 });
    }

    // Map the raw Google response to our expected UI format
    const formattedResults = data.results.map((place: any) => ({
      id: place.place_id,
      name: place.name,
      address: place.formatted_address,
      category: place.types ? place.types[0].replace(/_/g, ' ') : 'Business',
      rating: place.rating || 0,
      photo_reference: place.photos ? place.photos[0].photo_reference : null
    }));

    return NextResponse.json({ results: formattedResults });

  } catch (error) {
    console.error("Places API error:", error);
    return NextResponse.json({ error: 'Failed to fetch places data' }, { status: 500 });
  }
}
