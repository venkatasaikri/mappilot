import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const prompts = await prisma.prompt.findMany();
    // Return them in the expected structure
    return NextResponse.json(prompts.map(p => ({
      id: p.id,
      name: p.title,
      type: "GBP Post", // default mapping
      category: p.category || "General",
      system: false
    })));
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
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

    const newPrompt = await prisma.prompt.create({
      data: {
        title: body.name || "New Prompt",
        content: body.content || "Default content",
        category: body.category || "General",
        tenantId: tenantId
      }
    });

    return NextResponse.json({ 
      message: "Custom Prompt Template Saved",
      promptId: newPrompt.id
    }, { status: 201 });
    
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
