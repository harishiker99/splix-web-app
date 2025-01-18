import { NextResponse } from 'next/server';
import { chats } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }

  try {
    const userChats = await chats.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }, // Order chats by most recent
    });

    return NextResponse.json({data: userChats});
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    const newChat = await chats.create({
      data: {
        userId,
      },
    });

    return NextResponse.json({data: newChat});
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}