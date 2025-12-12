'use client';

import { Check, Copy, Github, Sparkles, Terminal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '../ui/button';

export default function HeroSection() {
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText('npm install -g jobx');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 gradient-mesh">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-accent rounded-full mix-blend-screen blur-3xl opacity-30 animate-pulse"></div>
        <div
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-chart-2 rounded-full mix-blend-screen blur-3xl opacity-25 animate-pulse"
          style={{ animationDelay: '3s' }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-chart-3 rounded-full mix-blend-screen blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: '5s' }}
        ></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5 glow-accent">
          <span className="text-accent font-mono text-sm font-semibold">
            $ jobx --help
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
          Automate Your <span className="text-gradient">Job Hunt</span> with AI
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
          JobX is an AI-powered CLI tool that automates job applications,
          generates personalized emails, and tracks applications using Google
          Sheets.
        </p>

        <div className="mb-8 flex flex-col items-center gap-4">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent via-chart-2 to-chart-3 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative inline-flex items-center gap-3 glass-effect rounded-xl p-2 shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 bg-accent/5 rounded-lg">
                <Terminal className="w-4 h-4 text-accent" />
                <span className="font-mono text-sm font-bold bg-gradient-to-r from-accent to-chart-2 bg-clip-text text-transparent">
                  npm install -g jobx
                </span>
              </div>
              <Button
                onClick={copyCommand}
                className="px-4 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-accent/50"
                title="Copy command"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    <span className="text-sm font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    <span className="text-sm font-semibold">Copy</span>
                  </>
                )}
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="w-3 h-3 text-accent" />
            <span>Quick install • Works globally • AI-powered</span>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
          <Image
            src="https://img.shields.io/npm/v/jobx?style=flat&logo=npm&color=10b981"
            alt="npm version"
            width={0}
            height={0}
            className="h-5 w-auto"
            unoptimized
          />
          <Image
            src="https://img.shields.io/npm/dt/jobx?style=flat&logo=npm&color=10b981"
            alt="npm downloads"
            width={0}
            height={0}
            className="h-5 w-auto"
            unoptimized
          />
          <Image
            src="https://img.shields.io/github/stars/DevAbabil/jobx?style=flat&logo=github&color=10b981"
            alt="GitHub stars"
            width={0}
            height={0}
            className="h-5 w-auto"
            unoptimized
          />
          <Image
            src="https://img.shields.io/github/license/DevAbabil/jobx?style=flat&color=10b981"
            alt="License"
            width={0}
            height={0}
            className="h-5 w-auto"
            unoptimized
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-16">
          <Link href="/installation">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 text-base"
            >
              Get Started
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="border-accent/50 text-accent hover:text-primary hover:bg-accent/10 bg-transparent"
            onClick={() =>
              window.open('https://github.com/DevAbabil/jobx', '_blank')
            }
          >
            <Github className="w-4 h-4 mr-2" />
            View on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
}
