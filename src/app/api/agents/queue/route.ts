import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { agentId, taskType, payload } = body;

    // 1. Fetch Agent Config
    const agent = await prisma.agent.findUnique({ where: { id: agentId } });
    if (!agent) return NextResponse.json({ error: 'Agent not found' }, { status: 404 });

    // 2. Simulate AI Processing Delay (2-3 seconds)
    await new Promise(resolve => setTimeout(resolve, 2500));

    // 3. Generate Simulated Contextual Response
    let mockResult = "";
    if (taskType === "reply_review") {
      mockResult = `Drafted response to ${payload?.reviewer || 'customer'}: "Thank you for the feedback! We appreciate your business."`;
    } else if (taskType === "seo_audit") {
      mockResult = `Analyzed local SEO for ${payload?.keyword || 'keyword'}. Found 2 missed opportunities in GMB categories.`;
    } else {
      mockResult = `Successfully completed task: ${payload?.description || 'Custom task execution'}.`;
    }

    // 4. Save Task Memory to Database
    const savedTask = await prisma.agentTask.create({
      data: {
        agentId: agent.id,
        description: mockResult,
        status: agent.autonomy.includes("Draft") ? "Pending Review" : "Completed"
      }
    });

    return NextResponse.json({ 
      message: "Task processed",
      task: savedTask
    }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
