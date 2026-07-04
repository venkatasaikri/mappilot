import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const locations = await prisma.location.findMany();
    // Map to expected structure if needed, or return directly
    return NextResponse.json(locations.map(loc => ({
      id: loc.id,
      name: loc.name,
      address: loc.address,
      category: "Uncategorized", // Can be added to schema later
      locationsCount: 1,
      gbpConnected: !!loc.placeId
    })));
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In a multi-tenant app, you'd get the tenantId from auth context
    // For now, we will just use a generic query or require it in the body.
    // If tenantId is not in body, we'll fetch the first tenant as a fallback for this demo
    let tenantId = body.tenantId;
    if (!tenantId) {
      const firstTenant = await prisma.tenant.findFirst();
      if (!firstTenant) {
        const newTenant = await prisma.tenant.create({ data: { name: "Default Agency" } });
        tenantId = newTenant.id;
      } else {
        tenantId = firstTenant.id;
      }
    }

    const newLocation = await prisma.location.create({
      data: {
        name: body.name || "New Business",
        address: body.address || null,
        tenantId: tenantId,
      }
    });

    return NextResponse.json({
      id: newLocation.id,
      name: newLocation.name,
      category: "Uncategorized",
      locationsCount: 1,
      gbpConnected: false
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
