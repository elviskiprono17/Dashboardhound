export interface BotQA {
  keywords: string[];
  question: string;
  answer: string;
}

export const HOUNDBOT_KNOWLEDGE_BASE: BotQA[] = [
  {
    keywords: ['privacy', 'secure', 'security', 'data', 'local', 'browser', 'safe'],
    question: 'How does Dashboardhound guarantee 100% data privacy?',
    answer: `Dashboardhound is built on a **Zero-Server-Upload Architecture**. 
When you drag and drop your file (Excel, CSV, TSV), it is parsed and analyzed 100% locally in your web browser memory using WebAssembly and client-side JavaScript. 

Your raw data rows are **NEVER sent across the internet to our servers** or third parties. Even when generating AI summaries, our engine only sends sanitized, pre-aggregated statistical digests—never your raw customer records or confidential rows!`,
  },
  {
    keywords: ['hallucination', 'hallucinate', 'ai math', 'accuracy', 'numbers'],
    question: 'How do you prevent AI from hallucinating calculations?',
    answer: `Most AI tools feed raw text into an LLM, causing it to guess or hallucinate math. 

Dashboardhound uses a **Deterministic Hybrid Engine**:
1. All calculations (sums, averages, medians, standard deviations, growth rates) are computed by our deterministic mathematical engine in your browser with 100% precision.
2. Gemini Flash receives only the verified numbers to provide strategic commentary and recommendations—it never guesses the math!`,
  },
  {
    keywords: ['price', 'pricing', 'cost', 'plan', 'tier', 'plans', 'free', 'starter', 'pro', 'enterprise'],
    question: 'What are your pricing plans?',
    answer: `Dashboardhound offers 4 plans tailored to different needs:
1. **Free Tier ($0)**: 5MB upload limit, instant interactive charts & global filters. Great for quick zero-friction exploration. (Dashboards cannot be saved or shared).
2. **Starter Plan ($19/mo billed annually or $25/mo)**: 50MB files, personal dashboard library, 1-click encrypted shareable links, and 100 AI queries/mo.
3. **Pro / Business ($79/mo billed annually or $99/mo)**: 200MB files, standalone offline HTML, PDF, and PowerPoint exports, template preservation, 3 team seats, unlimited summaries + 500 chatbot queries.
4. **Enterprise ($249+/mo)**: Up to 1GB files, white-labeling (your logo and custom domain on links), API access, and unlimited AI.`,
  },
  {
    keywords: ['format', 'file', 'formats', 'excel', 'csv', 'tsv', 'json', 'xlsx'],
    question: 'What file formats are supported?',
    answer: `We support **Excel (.xlsx, .xls)**, **Comma-Separated Values (.csv)**, **Tab-Separated Values (.tsv)**, and **JSON** files. All parsing happens instantly in your browser!`,
  },
  {
    keywords: ['share', 'link', 'url', 'domain', 'vanity', 'collaborate'],
    question: 'How do vanity share links work?',
    answer: `Paid plans allow you to generate custom branded links like:
\`www.abloh.dashboardhound.com/dsh_84920f\`

Enterprise plans can also configure custom domains (e.g. \`analytics.yourcompany.com\`) with custom logos! On the Free plan, sharing is locked behind our paywall.`,
  },
  {
    keywords: ['export', 'pdf', 'html', 'powerpoint', 'pptx', 'download'],
    question: 'Can I export my dashboards?',
    answer: `Yes! Pro and Enterprise users can export dashboards into:
- **Standalone Interactive HTML**: Fully self-contained file with charts intact that opens offline in any browser.
- **Executive PDF Report**: Print-ready high-resolution summary.
- **PowerPoint (PPTX) Deck**: Formatted presentation slides for stakeholder meetings.`,
  },
];

export function getQuickHoundBotReply(message: string): string | null {
  const clean = message.toLowerCase();
  for (const item of HOUNDBOT_KNOWLEDGE_BASE) {
    if (item.keywords.some((kw) => clean.includes(kw))) {
      return item.answer;
    }
  }
  return null;
}
