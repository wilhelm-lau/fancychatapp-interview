import { NextRequest, NextResponse } from 'next/server';
import { generateAIResponse } from '@/lib/openrouter';

export async function POST(request: NextRequest) {
  try {
    const { messages, model } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const response = await generateAIResponse(messages, model);
    
    return NextResponse.json({ 
      message: response,
      model: model || 'meta-llama/llama-3.1-8b-instruct:free'
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
