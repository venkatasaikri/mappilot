import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locationId = searchParams.get('locationId');

    // If no specific location is provided, we can fetch all or just aggregate
    let analyticsQuery: any = {};
    if (locationId) {
      analyticsQuery.locationId = locationId;
    }

    const records = await prisma.analytics.findMany({
      where: analyticsQuery,
      orderBy: { date: 'asc' }
    });

    // Calculate totals
    const totalTraffic = records.reduce((acc, curr) => acc + curr.traffic, 0);
    const totalCalls = records.reduce((acc, curr) => acc + curr.calls, 0);
    const formLeads = records.reduce((acc, curr) => acc + curr.formLeads, 0);
    const totalConversions = records.reduce((acc, curr) => acc + curr.conversions, 0);

    const analyticsData = {
      kpis: {
        totalTraffic: { value: totalTraffic, change: 0 },
        totalCalls: { value: totalCalls, change: 0 },
        formLeads: { value: formLeads, change: 0 },
        directionRequests: { value: 0, change: 0 },
        totalConversions: { value: totalConversions, change: 0 },
      },
      conversionBreakdown: {
        phoneCalls: totalCalls,
        websiteForms: formLeads,
        directMessages: 0
      },
      timeseries: records.map(r => ({
        date: r.date.toISOString().split('T')[0],
        traffic: r.traffic,
        calls: r.calls
      }))
    };

    return NextResponse.json(analyticsData);
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
