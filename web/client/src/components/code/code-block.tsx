'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  oneDark,
  oneLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyButton } from './copy-button';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({
  code,
  language = 'json',
  filename,
}: CodeBlockProps) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const customStyle = {
    margin: 0,
    padding: '1rem',
    background: 'transparent',
    fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
    lineHeight: '1.5',
    fontFamily: 'var(--font-geist-mono)',
  };

  const currentTheme = mounted ? resolvedTheme || theme : 'light';

  const selectedTheme =
    currentTheme === 'dark'
      ? {
          ...oneDark,
          'pre[class*="language-"]': {
            ...oneDark['pre[class*="language-"]'],
            background: 'transparent',
          },
          'code[class*="language-"]': {
            ...oneDark['code[class*="language-"]'],
            background: 'transparent',
          },
        }
      : oneLight;

  return (
    <div className="bg-card border-2 border-accent/20 rounded-lg overflow-hidden shadow-inner w-full">
      {filename && (
        <div className="px-3 sm:px-4 py-2 sm:py-3 bg-background/50 border-b border-accent/10 flex justify-between items-center gap-2">
          <p className="font-mono text-xs sm:text-sm text-muted-foreground truncate">
            {filename}
          </p>
          <CopyButton code={code} />
        </div>
      )}
      <div className="overflow-x-auto bg-background/30 shadow-[inset_0_2px_8px_rgba(0,0,0,0.1)] w-full">
        <SyntaxHighlighter
          language={language}
          style={selectedTheme}
          customStyle={customStyle}
          wrapLongLines={false}
          showLineNumbers={false}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
