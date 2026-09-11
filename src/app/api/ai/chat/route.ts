import { NextRequest, NextResponse } from 'next/server';
import { getQuickHoundBotReply } from '@/lib/ai/houndBotKnowledge';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message) {
      return NextResponse.json({ error: 'Missing message' }, { status: 400 });
    }

    const quickReply = getQuickHoundBotReply(message);
    if (quickReply) {
      return NextResponse.json({ reply: quickReply });
    }

    // Fallback response for HoundBot
    return NextResponse.json({
      reply: `Thanks for reaching out! Dashboardhound lets you transform any Excel, CSV, or TSV file into interactive dashboards with 100% in-browser privacy. You can explore on the Free plan, or upgrade to Starter ($19/mo) and Pro ($79/mo) for saved dashboards, vanity share links, and standalone HTML/PDF exports. How can I help you further?`,
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Error in chat handler' }, { status: 500 });
  }
}
