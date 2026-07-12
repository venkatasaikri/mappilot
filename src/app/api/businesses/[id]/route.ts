import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const location = await prisma.location.findUnique({
      where: { id }
    });

    if (!location) {
      return NextResponse.json({ error: 'Location not found' }, { status: 404 });
    }

    return NextResponse.json({
      id: location.id,
      name: location.name,
      address: location.address,
      placeId: location.placeId,
      category: "Coffee Shop", // static for now
      gbpConnected: !!location.placeId,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    // Check if it exists first (optional but good practice)
    const location = await prisma.location.findUnique({
      where: { id }
    });

    if (!location) {
      return NextResponse.json({ error: 'Location not found' }, { status: 404 });
    }

    await prisma.location.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Location deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error("Error deleting location:", error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const location = await prisma.location.findUnique({
      where: { id }
    });

    if (!location) {
      return NextResponse.json({ error: 'Location not found' }, { status: 404 });
    }

    const updatedLocation = await prisma.location.update({
      where: { id },
      data: {
        name: body.name !== undefined ? body.name : location.name,
        address: body.address !== undefined ? body.address : location.address,
        placeId: body.placeId !== undefined ? body.placeId : location.placeId,
      }
    });

    return NextResponse.json(updatedLocation, { status: 200 });
  } catch (error) {
    console.error("Error updating location:", error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
