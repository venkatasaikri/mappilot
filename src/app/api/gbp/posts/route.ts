import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Simulate fetching posts from GBP API
    await new Promise(resolve => setTimeout(resolve, 800));

    const posts = [
      { 
        id: 1, 
        content: "Get your pipes checked before winter! We offer comprehensive winterization services to prevent freezing...", 
        status: "Scheduled", 
        time: "Tomorrow 9:00 AM",
        views: 0
      },
      { 
        id: 2, 
        content: "We are thrilled to announce that we've been voted the #1 plumbing service in the downtown area! Thanks to...", 
        status: "Published", 
        time: "2 days ago",
        views: 42
      }
    ];

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
