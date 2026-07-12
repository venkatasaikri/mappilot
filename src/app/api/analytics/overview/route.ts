import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locationId = searchParams.get('locationId');

    let analyticsQuery: any = {};
    if (locationId) {
      analyticsQuery.locationId = locationId;
    }

    let records = await prisma.analytics.findMany({
      where: analyticsQuery,
      orderBy: { date: 'asc' }
    });

    // Seed data if empty and a location is provided
    if (records.length === 0 && locationId) {
      const newRecords = [];
      const now = new Date();
      for (let i = 30; i >= 0; i--) {
        const d = new Date();
        d.setDate(now.getDate() - i);
        newRecords.push({
          locationId: locationId,
          date: d,
          traffic: Math.floor(Math.random() * 50) + 50, // 50-100
          calls: Math.floor(Math.random() * 10) + 5,
          formLeads: Math.floor(Math.random() * 5) + 2,
          conversions: Math.floor(Math.random() * 15) + 7
        });
      }
      await prisma.analytics.createMany({ data: newRecords });
      
      records = await prisma.analytics.findMany({
        where: analyticsQuery,
        orderBy: { date: 'asc' }
      });
    }

    const totalTraffic = records.reduce((acc, curr) => acc + curr.traffic, 0);
    const totalCalls = records.reduce((acc, curr) => acc + curr.calls, 0);
    const formLeads = records.reduce((acc, curr) => acc + curr.formLeads, 0);
    const totalConversions = records.reduce((acc, curr) => acc + curr.conversions, 0);

    const analyticsData = {
      kpis: {
        totalTraffic: { value: totalTraffic, change: 12 },
        totalCalls: { value: totalCalls, change: 8 },
        formLeads: { value: formLeads, change: 24 },
        directionRequests: { value: Math.floor(totalTraffic * 0.3), change: -3 },
        totalConversions: { value: totalConversions, change: 11 },
      },
      conversionBreakdown: {
        phoneCalls: totalCalls,
        websiteForms: formLeads,
        directMessages: Math.floor(totalConversions * 0.1)
      },
      timeseries: records.map(r => ({
        date: r.date.toISOString().split('T')[0],
        traffic: r.traffic,
        calls: r.calls
      }))
    };

    return NextResponse.json(analyticsData);
  } catch (error) {
    console.error("Analytics Error:", error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
