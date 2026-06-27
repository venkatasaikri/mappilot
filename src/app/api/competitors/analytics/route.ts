import { NextResponse } from 'next/server';

export async function GET() {
  // Mock aggregated analytics data comparing the user against tracked competitors
  const analyticsData = {
    shareOfVoice: {
      user: 28,
      competitor1: 35, // Joe's
      competitor2: 20, // Downtown Rooter
      others: 17
    },
    reviews: {
      user: { total: 142, velocity: 12 },
      competitor1: { total: 310, velocity: 25 },
      competitor2: { total: 85, velocity: 2 }
    },
    content: {
      user: { gbpPosts30d: 12 },
      competitor1: { gbpPosts30d: 4 },
      competitor2: { gbpPosts30d: 0 }
    }
  };

  return NextResponse.json(analyticsData);
}
