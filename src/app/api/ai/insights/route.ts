import { NextRequest, NextResponse } from 'next/server';
import { askGeminiFlash } from '@/lib/ai/gemini';

export async function POST(req: NextRequest) {
  try {
    const { prompt, digest, apiKey } = await req.json();

    if (!digest) {
      return NextResponse.json({ error: 'Missing statistical digest' }, { status: 400 });
    }

    const result = await askGeminiFlash(prompt || 'Provide executive insights', digest, apiKey);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Error processing AI insights' },
      { status: 500 }
    );
  }
}
