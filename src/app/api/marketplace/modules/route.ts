import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const modules = await prisma.module.findMany();
    // Map to expected format
    return NextResponse.json(modules.map(m => ({
      id: m.slug,
      name: m.name,
      description: m.description,
      version: m.version,
      author: "MapPilot Core",
      installed: true,
      active: m.isActive,
      requiresLicense: true,
      licenseValid: true
    })));
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { action, moduleId, licenseKey } = await request.json();

    if (action === 'install') {
      return NextResponse.json({ message: `Module ${moduleId} installed successfully.` });
    }

    if (action === 'toggle') {
      return NextResponse.json({ message: `Module ${moduleId} state toggled.` });
    }

    if (action === 'validate_license') {
      return NextResponse.json({ valid: true, message: 'License validated.' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
