import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch all users with their tenant roles
    const tenantUsers = await prisma.tenantUser.findMany({
      include: {
        user: true,
        tenant: true
      }
    });

    // Map to expected format
    return NextResponse.json(tenantUsers.map(tu => ({
      id: tu.user.id,
      name: tu.user.name || 'Unknown',
      email: tu.user.email,
      role: tu.role,
      location: "All Locations", // Simplified for now
      status: "Active",
      mfa: false
    })));
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
