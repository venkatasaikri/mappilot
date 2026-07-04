import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const campaigns = await prisma.campaign.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(campaigns);
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In a production environment, this route would authenticate the request.
    // For now, we fallback to the first tenant.
    let tenantId = body.tenantId;
    if (!tenantId) {
      const firstTenant = await prisma.tenant.findFirst();
      if (!firstTenant) {
        return NextResponse.json({ error: 'No tenant found' }, { status: 400 });
      }
      tenantId = firstTenant.id;
    }
    
    const newCampaign = await prisma.campaign.create({
      data: {
        name: body.name || "New Campaign",
        type: body.type || "SMS",
        tenantId: tenantId,
      }
    });
    
    return NextResponse.json({ 
      message: "Campaign queued successfully.",
      campaignId: newCampaign.id
    }, { status: 201 });
  } catch (error) {
    console.error("Campaign creation error:", error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
