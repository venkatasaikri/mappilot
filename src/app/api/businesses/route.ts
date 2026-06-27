import { NextResponse } from 'next/server';

export async function GET() {
  // Mock data representing managed businesses
  const businesses = [
    { id: 1, name: "Starbucks Coffee", category: "Coffee Shop", locationsCount: 142, gbpConnected: true },
    { id: 2, name: "Acme Plumbing", category: "Plumber", locationsCount: 3, gbpConnected: true },
    { id: 3, name: "Downtown Fitness", category: "Gym", locationsCount: 1, gbpConnected: false },
  ];

  return NextResponse.json(businesses);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Mock creating a new business
    const newBusiness = {
      id: Math.floor(Math.random() * 1000),
      name: body.name || "New Business",
      category: body.category || "Uncategorized",
      locationsCount: 1,
      gbpConnected: false
    };

    return NextResponse.json(newBusiness, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
