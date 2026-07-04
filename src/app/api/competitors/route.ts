import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const competitors = await prisma.competitor.findMany({
      orderBy: { avgRank: 'asc' }
    });
    return NextResponse.json(competitors);
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
