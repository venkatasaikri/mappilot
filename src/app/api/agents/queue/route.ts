import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { GoogleGenerativeAI } from '@google/generative-ai';

const prisma = new PrismaClient();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'Gemini API key is not configured' }, { status: 500 });
    }

    const body = await request.json();
    const { agentId, taskType, payload } = body;

    // 1. Fetch Agent Config
    const agent = await prisma.agent.findUnique({ where: { id: agentId } });
    if (!agent) return NextResponse.json({ error: 'Agent not found' }, { status: 404 });

    // 2. Generate Real Contextual Response using Gemini
    let prompt = agent.systemPrompt || "You are a helpful AI assistant for a local SEO platform.";
    
    if (taskType === "reply_review") {
      prompt += `\n\nTask: Draft a professional response to the following customer review.\nReviewer: ${payload?.reviewer || 'customer'}\nRating: ${payload?.rating || 5} stars\nReview Content: ${payload?.reviewContent || 'Great service!'}`;
    } else if (taskType === "seo_audit") {
      prompt += `\n\nTask: Perform a brief simulated local SEO audit for the keyword "${payload?.keyword || 'keyword'}". Suggest 2 actionable improvements for a Google Business Profile.`;
    } else {
      prompt += `\n\nTask: ${payload?.description || 'Execute custom task'}. Provide a concise execution summary.`;
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiResult = response.text();

    // 3. Save Task Memory to Database
    const savedTask = await prisma.agentTask.create({
      data: {
        agentId: agent.id,
        description: aiResult.substring(0, 500),
        status: agent.autonomy.includes("Draft") ? "Pending Review" : "Completed"
      }
    });

    return NextResponse.json({ 
      message: "Task processed",
      task: savedTask,
      fullResponse: aiResult
    }, { status: 200 });
    
  } catch (error: any) {
    console.error('Agent Queue error:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
