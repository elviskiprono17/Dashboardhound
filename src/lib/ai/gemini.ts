import { GoogleGenAI } from '@google/genai';
import { StatisticalDigest } from './deterministicEngine';

export async function askGeminiFlash(
  prompt: string,
  digest: StatisticalDigest,
  apiKey?: string
): Promise<{ text: string; modelUsed: string }> {
  const effectiveKey = apiKey || process.env.GEMINI_API_KEY;

  if (!effectiveKey) {
    throw new Error('No Gemini API key provided. Using local deterministic intelligence.');
  }

  try {
    const ai = new GoogleGenAI({ apiKey: effectiveKey });

    const systemInstruction = `You are "Hound AI", the senior executive intelligence advisor embedded in Dashboardhound.com.
Dashboardhound guarantees 100% data privacy by executing all mathematical aggregations client-side in the user's browser.
You are provided with verified statistical schema, pre-calculated totals, averages, and distributions.
CRITICAL RULES:
1. NEVER invent or hallucinate new numbers. Use the exact mathematically verified numbers from the provided statistical digest.
2. Provide concise, sharp, high-level business commentary, strategic explanations, and actionable takeaways.
3. Structure your response with clean Markdown bullet points and bold highlights.`;

    const contents = `
Here is the mathematically verified statistical digest of the user's dashboard dataset:
${JSON.stringify(digest, null, 2)}

User Question or Request:
"${prompt}"

Provide executive-level guidance referencing these verified figures:`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: `${systemInstruction}\n\n${contents}` }],
        },
      ],
    });

    const reply = response.text;
    if (!reply) {
      throw new Error('Empty response from Gemini');
    }

    return {
      text: reply,
      modelUsed: 'gemini-2.5-flash',
    };
  } catch (err: any) {
    console.error('Gemini Flash call error:', err);
    throw err;
  }
}
