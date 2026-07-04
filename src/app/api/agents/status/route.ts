import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    const updatedAgent = await prisma.agent.update({
      where: { id },
      data: { status }
    });

    return NextResponse.json(updatedAgent);
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
