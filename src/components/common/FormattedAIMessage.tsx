'use client';

import React from 'react';

interface FormattedAIMessageProps {
  content: string;
  className?: string;
  isUser?: boolean;
}

/**
 * Parses and beautifies AI text responses:
 * - Converts **bold** and *emphasis* to cleanly styled elements without raw asterisks
 * - Formats bulleted lists and numbered lists with elegant typography
 * - Formats inline code pills (`code`)
 * - Strips all stray, unclosed asterisks
 */
export function FormattedAIMessage({ content, className = '', isUser = false }: FormattedAIMessageProps) {
  if (!content) return null;

  // Split into lines to detect lists and structure
  const lines = content.split('\n');

  // Helper to parse inline styles (bold, code, etc.) for a single line
  const parseInline = (text: string, lineKey: string | number) => {
    // Regex matching **bold**, `code`, or regular text chunks
    // First, clean any trailing or leading loose asterisks that are not paired
    const tokens: React.ReactNode[] = [];
    
    // Pattern matches:
    // 1. `code`
    // 2. **bold**
    // 3. *italic/bold*
    const regex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g;
    const parts = text.split(regex);

    parts.forEach((part, idx) => {
      if (!part) return;

      if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
        const codeText = part.slice(1, -1);
        tokens.push(
          <code
            key={`${lineKey}-code-${idx}`}
            className={`px-1.5 py-0.5 rounded font-mono text-[11px] ${
              isUser
                ? 'bg-sky-900/40 text-sky-200 border border-sky-400/30'
                : 'bg-slate-200/80 text-slate-850 border border-slate-300/60 font-semibold'
            }`}
          >
            {codeText}
          </code>
        );
      } else if (
        (part.startsWith('**') && part.endsWith('**') && part.length >= 4) ||
        (part.startsWith('*') && part.endsWith('*') && part.length >= 2)
      ) {
        // Strip the asterisks completely
        const boldText = part.replace(/^\*+|\*+$/g, '').trim();
        tokens.push(
          <strong
            key={`${lineKey}-bold-${idx}`}
            className={`font-bold ${isUser ? 'text-white' : 'text-slate-950 text-[12px]'}`}
          >
            {boldText}
          </strong>
        );
      } else {
        // Normal text - strip any leftover stray asterisks just in case
        const cleaned = part.replace(/\*/g, '');
        tokens.push(<span key={`${lineKey}-txt-${idx}`}>{cleaned}</span>);
      }
    });

    return tokens;
  };

  const elements: React.ReactNode[] = [];
  let currentList: { type: 'bullet' | 'number'; items: React.ReactNode[] } | null = null;

  const flushList = () => {
    if (!currentList) return;
    if (currentList.type === 'bullet') {
      elements.push(
        <ul key={`list-${elements.length}`} className="my-2 space-y-1.5 pl-1">
          {currentList.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${isUser ? 'bg-sky-300' : 'bg-sky-500'}`} />
              <div className="flex-1">{item}</div>
            </li>
          ))}
        </ul>
      );
    } else {
      elements.push(
        <ol key={`list-${elements.length}`} className="my-2 space-y-1.5 pl-1">
          {currentList.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold mt-0.5 shrink-0 ${
                isUser ? 'bg-sky-800 text-sky-200' : 'bg-slate-200 text-slate-700'
              }`}>
                {i + 1}
              </span>
              <div className="flex-1">{item}</div>
            </li>
          ))}
        </ol>
      );
    }
    currentList = null;
  };

  lines.forEach((line, lineIndex) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      return;
    }

    // Check if bullet point (- or * or •)
    const bulletMatch = trimmed.match(/^[-*•]\s+(.*)$/);
    if (bulletMatch) {
      if (!currentList || currentList.type !== 'bullet') {
        flushList();
        currentList = { type: 'bullet', items: [] };
      }
      currentList.items.push(parseInline(bulletMatch[1], `b-${lineIndex}`));
      return;
    }

    // Check if numbered point (e.g. 1. or 2.)
    const numberMatch = trimmed.match(/^\d+[\.)]\s+(.*)$/);
    if (numberMatch) {
      if (!currentList || currentList.type !== 'number') {
        flushList();
        currentList = { type: 'number', items: [] };
      }
      currentList.items.push(parseInline(numberMatch[1], `n-${lineIndex}`));
      return;
    }

    // Regular paragraph line
    flushList();
    elements.push(
      <p key={`p-${lineIndex}`} className={elements.length > 0 ? 'mt-2' : ''}>
        {parseInline(trimmed, lineIndex)}
      </p>
    );
  });

  flushList();

  return <div className={`leading-relaxed ${className}`}>{elements}</div>;
}
