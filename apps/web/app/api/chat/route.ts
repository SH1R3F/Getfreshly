import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { prisma } from '@repo/database';
import { claudeService } from '@/services/claude';

export async function POST(request: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { message } = await request.json();

    // Save the user's message
    const savedUserMessage = await prisma.message.create({
      data: {
        content: message,
        userId: user.id,
        variant: 'user',
      },
    });

    const savedAssistantMessages = [];

    // Get Claude's response
    const claudeResponses = await claudeService.sendMessage(message, user.id);

    // Save Claude's responses
    for (const claudeResponse of claudeResponses) {
      const savedAssistantMessage = await prisma.message.create({
        data: {
          content: claudeResponse,
          userId: user.id,
          variant: 'assistant',
        },
      });
      savedAssistantMessages.push(savedAssistantMessage);
    }

    return NextResponse.json({
      success: true,
      messages: [savedUserMessage, ...savedAssistantMessages],
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch messages for the current user
    const messages = await prisma.message.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return NextResponse.json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
