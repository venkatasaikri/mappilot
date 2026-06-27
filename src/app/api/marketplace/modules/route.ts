import { NextResponse } from 'next/server';

export async function GET() {
  // Mock data representing available marketplace plugins
  const modules = [
    { 
      id: "mod_dhanda", 
      name: "Dhanda Engine", 
      description: "Advanced local SEO analytics and grid tracking.", 
      version: "1.2.0", 
      author: "MapPilot Core", 
      installed: true, 
      active: true, 
      requiresLicense: true, 
      licenseValid: true 
    },
    { 
      id: "mod_falcon", 
      name: "Local Falcon Sync", 
      description: "Deep integration with Local Falcon API for scan credits.", 
      version: "2.0.1", 
      author: "MapPilot Core", 
      installed: true, 
      active: false, 
      requiresLicense: true, 
      licenseValid: false 
    },
    { 
      id: "mod_review", 
      name: "ReviewTrackers", 
      description: "Automated review generation and response AI.", 
      version: "1.0.5", 
      author: "MapPilot Core", 
      installed: false, 
      active: false, 
      requiresLicense: true, 
      licenseValid: false 
    },
  ];

  return NextResponse.json(modules);
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
