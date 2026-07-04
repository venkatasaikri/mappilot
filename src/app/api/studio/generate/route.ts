import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { contentType, templateId, keywords, tone } = body;

    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return NextResponse.json({ 
      message: "AI Generation Successful",
      output: `Generated ${tone || 'professional'} ${contentType || 'content'} focusing on ${keywords || 'your business'}...`,
      tokensUsed: Math.floor(Math.random() * 500) + 100
    }, { status: 201 });
    
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
