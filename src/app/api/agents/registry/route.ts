import { NextResponse } from 'next/server';

export async function GET() {
  // Stub: Agent Registry Database
  const agents = [
    { id: "review-agent", name: "Review Agent", status: "online", autonomy: "draft-only" },
    { id: "seo-agent", name: "SEO Agent", status: "online", autonomy: "autonomous" },
    { id: "gbp-agent", name: "GBP Sync Agent", status: "offline", autonomy: "autonomous" },
    { id: "content-agent", name: "Content Agent", status: "online", autonomy: "draft-only" },
    { id: "competitor-agent", name: "Competitor Agent", status: "offline", autonomy: "autonomous" }
  ];

  return NextResponse.json(agents);
}
