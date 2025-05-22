import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { message } = await request.json();

  return NextResponse.json({
    success: true,
    message: message,
  });
}
