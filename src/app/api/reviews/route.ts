import { NextResponse } from 'next/server';

export async function GET() {
  // Mock aggregated reviews from multiple networks
  const reviews = [
    { id: 1, author: "Michael T.", rating: 5, source: "Google", date: "2 days ago", text: "Excellent service.", replied: false },
    { id: 2, author: "Sarah Jenkins", rating: 4, source: "Facebook", date: "1 week ago", text: "Good work.", replied: true },
    { id: 3, author: "Angry Customer", rating: 1, source: "Trustpilot", date: "2 weeks ago", text: "Terrible experience.", replied: false },
  ];

  return NextResponse.json(reviews);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, reviewId, replyText } = body;

    if (action === 'reply' && reviewId && replyText) {
      // Stub: Here we would route the reply to the specific external API (Google/FB/Trustpilot)
      // based on the review's original source.
      return NextResponse.json({ message: "Reply successfully posted to the external network." });
    }

    return NextResponse.json({ error: 'Invalid action or missing payload.' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
