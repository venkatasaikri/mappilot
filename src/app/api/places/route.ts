import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey || apiKey === 'your_actual_api_key_here') {
    return NextResponse.json({ 
      error: 'GOOGLE_PLACES_API_KEY is not configured or invalid.',
      results: [] 
    }, { status: 500 });
  }

  try {
    const googleRes = await fetch(`https://places.googleapis.com/v1/places:searchText`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.primaryTypeDisplayName,places.rating,places.photos"
      },
      body: JSON.stringify({ textQuery: query })
    });
    
    const data = await googleRes.json();

    if (data.error) {
      return NextResponse.json({ error: `Google API Error: ${data.error.message}` }, { status: 500 });
    }

    // Map the new Google response to our expected UI format
    const formattedResults = (data.places || []).map((place: any) => ({
      id: place.id,
      name: place.displayName?.text || 'Unknown Business',
      address: place.formattedAddress || '',
      category: place.primaryTypeDisplayName?.text || 'Business',
      rating: place.rating || 0,
      photo_reference: place.photos ? place.photos[0].name : null
    }));

    return NextResponse.json({ results: formattedResults });

  } catch (error) {
    console.error("Places API error:", error);
    return NextResponse.json({ error: 'Failed to fetch places data' }, { status: 500 });
  }
}
