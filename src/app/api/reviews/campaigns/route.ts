import { NextResponse } from 'next/server';

export async function GET() {
  // Mock data representing active campaigns
  const campaigns = [
    { id: 1, name: "Winter Special Follow-up", type: "SMS", sent: 450, generated: 32, status: "Completed" },
    { id: 2, name: "August Leads", type: "Email", sent: 1200, generated: 14, status: "Running" },
  ];

  return NextResponse.json(campaigns);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Stub: Processing a new campaign.
    // In a real Next.js app, we might trigger a background task using Vercel Functions,
    // Upstash QStash, or a similar queueing mechanism to handle batch SMS/Emails via Twilio/SendGrid.
    
    return NextResponse.json({ 
      message: "Campaign queued successfully.",
      campaignId: Math.floor(Math.random() * 1000)
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
