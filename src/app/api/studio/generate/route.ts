import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'Gemini API key is not configured' }, { status: 500 });
    }

    const body = await request.json();
    const { contentType, templateId, keywords, tone, prompt } = body;

    let finalPrompt = prompt || `Create a ${tone || 'professional'} ${contentType || 'content piece'} focusing on the following keywords/topics: ${keywords || 'your business'}. Make it engaging and high-quality.`;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });
    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    const text = response.text();
    
    return NextResponse.json({ 
      message: "AI Generation Successful",
      output: text,
      tokensUsed: response.usageMetadata?.totalTokenCount || 0
    }, { status: 201 });
    
  } catch (error: any) {
    console.error('AI Generation error:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
