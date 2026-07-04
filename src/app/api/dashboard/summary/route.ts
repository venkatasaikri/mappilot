import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const totalLocations = await prisma.location.count();
    const activeModules = await prisma.module.count({ where: { isActive: true } });
    const platformUsers = await prisma.user.count();
    const modules = await prisma.module.findMany({ take: 3 });

    return NextResponse.json({
      totalLocations,
      activeModules,
      platformUsers,
      apiUsage: 84, // static for now
      recentModules: modules.map(m => ({
        name: m.name,
        status: m.isActive ? 'Synced 2 mins ago' : 'Syncing...',
        active: m.isActive
      }))
    });
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
