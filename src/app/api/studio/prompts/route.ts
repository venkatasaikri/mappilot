import { NextResponse } from 'next/server';

export async function GET() {
  // Mock data representing the Prompt Library templates
  const prompts = [
    { id: 1, name: "GBP: Emergency Promo", type: "GBP Post", category: "Promotional", system: true },
    { id: 2, name: "Blog: Local City Service", type: "Blog", category: "SEO Structure", system: true },
    { id: 3, name: "Custom: Plumber Review Highlight", type: "GBP Post", category: "Social Proof", system: false },
  ];

  return NextResponse.json(prompts);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Stub: Create a new custom prompt template for the specific Agency
    return NextResponse.json({ 
      message: "Custom Prompt Template Saved",
      promptId: Math.floor(Math.random() * 1000)
    }, { status: 201 });
    
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
