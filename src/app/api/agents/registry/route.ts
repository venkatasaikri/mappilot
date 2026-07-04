import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const DEFAULT_AGENTS = [
  { name: "Review Agent", description: "Monitors incoming Google reviews and drafts localized replies based on brand sentiment guidelines." },
  { name: "SEO Agent", description: "Constantly monitors local map rankings and geo-grids to identify drops in keyword visibility." },
  { name: "GBP Sync Agent", description: "Ensures Google Business Profile data stays perfectly synced with your central dashboard." },
  { name: "Content Agent", description: "Takes prompts from the AI Studio and autonomously schedules and publishes weekly SEO updates to GBP." },
  { name: "Competitor Agent", description: "Tracks local rivals to alert you if they launch a new location or change categories." }
];

export async function GET() {
  try {
    let agents = await prisma.agent.findMany();
    
    // Auto-seed agents if empty
    if (agents.length === 0) {
      let tenant = await prisma.tenant.findFirst();
      if (!tenant) {
        tenant = await prisma.tenant.create({ data: { name: "Default Agency" } });
      }

      const seedData = DEFAULT_AGENTS.map(a => ({
        name: a.name,
        systemPrompt: `You are the ${a.name}. ${a.description}`,
        tenantId: tenant.id
      }));

      await prisma.agent.createMany({ data: seedData });
      agents = await prisma.agent.findMany();
    }

    return NextResponse.json(agents);
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
