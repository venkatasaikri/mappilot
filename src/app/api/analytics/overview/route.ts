import { NextResponse } from 'next/server';

export async function GET() {
  // Mock aggregated analytics data for the given location/agency
  // In production, this would query a timeseries database (like TimescaleDB)
  // or fetch from Google Business Profile Insights and Call Tracking integrations.
  const analyticsData = {
    kpis: {
      totalTraffic: { value: 14205, change: 12 },
      totalCalls: { value: 412, change: 8 },
      formLeads: { value: 85, change: 24 },
      directionRequests: { value: 1240, change: -3 },
      totalConversions: { value: 497, change: 11 },
    },
    conversionBreakdown: {
      phoneCalls: 82,
      websiteForms: 15,
      directMessages: 3
    },
    timeseries: [
      { date: "2026-05-15", traffic: 40, calls: 1 },
      { date: "2026-05-16", traffic: 45, calls: 2 },
      { date: "2026-05-17", traffic: 60, calls: 4 },
      // ... more mocked timeseries data points
    ]
  };

  return NextResponse.json(analyticsData);
}
