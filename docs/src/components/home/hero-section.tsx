'use client';

import { Check, Copy, GithubIcon } from 'lucide-react';
import Image from 'next/image';
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-4">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-accent rounded-full mix-blend-screen blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-accent rounded-full mix-blend-screen blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5">
          <span className="text-accent font-mono text-sm">$ jobx --help</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
          Automate Your <span className="text-accent">Job Hunt</span> with AI
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
          JobX is an AI-powered CLI tool that automates job applications,
          generates personalized emails, and tracks applications using Google
          Sheets.
        </p>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-card border border-border rounded-lg p-1 hover:border-accent/50 transition">
            <span className="px-4 py-2 font-mono text-sm">
              npm install -g jobx
            </span>
            <Button
              onClick={copyCommand}
              className="px-3 py-2 hover:bg-accent/10 rounded-md transition text-accent"
              title="Copy command"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 text-base"
            onClick={() => {
              document
                .getElementById('installation')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-accent/50 text-accent hover:bg-accent/10 bg-transparent"
            onClick={() =>
              window.open('https://github.com/DevAbabil/jobx', '_blank')
            }
          >
            <GithubIcon className="w-4 h-4 mr-2" />
            View on GitHub
          </Button>
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
      </div>
    </section>
  );
}
