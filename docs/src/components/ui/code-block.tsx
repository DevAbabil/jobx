'use client';

import { Check, Copy } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = 'json',
  filename,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const highlightCode = (code: string, lang: string): React.ReactNode[] => {
    if (lang === 'json') {
      return highlightJSON(code);
    } else if (lang === 'bash') {
      return highlightBash(code);
    } else if (lang === 'typescript' || lang === 'tsx') {
      return highlightTypeScript(code);
    }
    return [code];
  };

  const highlightJSON = (code: string): React.ReactNode[] => {
    const tokens: React.ReactNode[] = [];
    const lines = code.split('\n');

    lines.forEach((line, lineIdx) => {
      const trimmed = line;
      const parts =
        trimmed.match(
          /"[^"]*":|"[^"]*"|true|false|null|-?\d+\.?\d*|[{}[\]:,]/g
        ) || [];

      if (parts.length === 0) {
        tokens.push(<span key={`${lineIdx}-text`}>{line}</span>);
        tokens.push('\n');
        return;
      }

      let lastIndex = 0;
      parts.forEach((part, idx) => {
        const index = trimmed.indexOf(part, lastIndex);
        if (index > lastIndex) {
          tokens.push(
            <span key={`${lineIdx}-${idx}-text`}>
              {trimmed.slice(lastIndex, index)}
            </span>
          );
        }

        if (part.includes(':')) {
          tokens.push(
            <span key={`${lineIdx}-${idx}`} className="text-accent">
              {part}
            </span>
          );
        } else if (part.startsWith('"')) {
          tokens.push(
            <span key={`${lineIdx}-${idx}`} className="text-amber-400/80">
              {part}
            </span>
          );
        } else if (part === 'true' || part === 'false') {
          tokens.push(
            <span key={`${lineIdx}-${idx}`} className="text-blue-400/80">
              {part}
            </span>
          );
        } else if (part === 'null') {
          tokens.push(
            <span key={`${lineIdx}-${idx}`} className="text-pink-400/80">
              {part}
            </span>
          );
        } else if (/^-?\d+\.?\d*$/.test(part)) {
          tokens.push(
            <span key={`${lineIdx}-${idx}`} className="text-purple-400/80">
              {part}
            </span>
          );
        } else {
          tokens.push(
            <span key={`${lineIdx}-${idx}`} className="text-foreground/60">
              {part}
            </span>
          );
        }

        lastIndex = index + part.length;
      });

      if (lastIndex < trimmed.length) {
        tokens.push(
          <span key={`${lineIdx}-end`}>{trimmed.slice(lastIndex)}</span>
        );
      }
      tokens.push('\n');
    });

    return tokens;
  };

  const highlightBash = (code: string): React.ReactNode[] => {
    const tokens: React.ReactNode[] = [];
    const lines = code.split('\n');

    lines.forEach((line, idx) => {
      if (line.startsWith('$')) {
        tokens.push(
          <span key={`${idx}-prompt`} className="text-accent">
            {'$ '}
          </span>
        );
        tokens.push(<span key={`${idx}-cmd`}>{line.slice(2)}</span>);
      } else if (line.startsWith('#')) {
        tokens.push(
          <span key={`${idx}-comment`} className="text-foreground/50">
            {line}
          </span>
        );
      } else {
        tokens.push(<span key={`${idx}-text`}>{line}</span>);
      }
      tokens.push('\n');
    });

    return tokens;
  };

  const highlightTypeScript = (code: string): React.ReactNode[] => {
    const keywords = [
      'const',
      'let',
      'var',
      'function',
      'return',
      'if',
      'else',
      'export',
      'import',
      'from',
      'async',
      'await',
    ];
    const types = [
      'string',
      'number',
      'boolean',
      'any',
      'void',
      'interface',
      'type',
    ];

    let highlighted = code;
    keywords.forEach((kw) => {
      highlighted = highlighted.replace(
        new RegExp(`\\b${kw}\\b`, 'g'),
        `<span class="text-blue-400/80">${kw}</span>`
      );
    });
    types.forEach((type) => {
      highlighted = highlighted.replace(
        new RegExp(`\\b${type}\\b`, 'g'),
        `<span class="text-cyan-400/80">${type}</span>`
      );
    });

    return [highlighted];
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-card border border-border/50 rounded-lg overflow-hidden">
      {filename && (
        <div className="px-4 py-3 bg-background/50 border-b border-border/50 flex justify-between items-center">
          <p className="font-mono text-sm text-muted-foreground">{filename}</p>
          <button
            type="button"
            onClick={copyToClipboard}
            className="text-accent hover:bg-accent/10 p-1.5 rounded transition"
            title="Copy to clipboard"
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed">
        <code className="text-foreground/80">
          {highlightCode(code, language)}
        </code>
      </pre>
    </div>
  );
}
