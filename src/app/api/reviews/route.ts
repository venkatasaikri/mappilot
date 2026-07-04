import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json(reviews.map(r => ({
      id: r.id,
      author: r.reviewerName,
      rating: r.rating,
      source: r.source,
      date: r.createdAt.toLocaleDateString(),
      text: r.content,
      replied: !!r.reply
    })));
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, reviewId, replyText } = body;

    if (action === 'reply' && reviewId && replyText) {
      await prisma.review.update({
        where: { id: reviewId },
        data: { reply: replyText }
      });
      return NextResponse.json({ message: "Reply successfully saved and posted." });
    }

    return NextResponse.json({ error: 'Invalid action or missing payload.' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
