import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const name = id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    let tenant = await prisma.tenant.findFirst();
    if (!tenant) {
      tenant = await prisma.tenant.create({ data: { name: "Default Agency" } });
    }

    // Upsert the agent
    const agent = await prisma.agent.upsert({
      where: { name },
      update: {},
      create: {
        name,
        tenantId: tenant.id,
        systemPrompt: `You are the ${name}. Always respond politely.`,
        permissions: JSON.stringify({ gbp: true, competitor: false, billing: false })
      },
      include: {
        tasks: {
          orderBy: { createdAt: 'desc' },
          take: 5
        }
      }
    });

    return NextResponse.json(agent);
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const name = id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    const body = await request.json();

    const agent = await prisma.agent.update({
      where: { name },
      data: {
        autonomy: body.autonomy,
        systemPrompt: body.systemPrompt,
        permissions: JSON.stringify(body.permissions)
      }
    });

    return NextResponse.json(agent);
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
