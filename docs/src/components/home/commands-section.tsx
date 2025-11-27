'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { CodeBlock } from '@/components/code';
import { Card } from '@/components/ui/card';

const commands = [
  {
    name: 'jobx init',
    description: 'Initialize the project with default configuration',
    usage: 'jobx init',
    options: [],
    example:
      'Sets up jobx.config.json, jobx.credentials.json, and jobx.apply.json files with default values',
  },
  {
    name: 'jobx mail --generate',
    description: 'Generate job application emails using AI',
    usage: 'jobx mail --generate',
    options: [],
    example:
      'Generates personalized emails using OpenAI based on job details in jobx.apply.json',
  },
  {
    name: 'jobx mail --submit',
    description: 'Submit generated job application emails',
    usage: 'jobx mail --submit',
    options: [],
    example:
      'Sends the generated email via configured SMTP and logs to Google Sheets',
  },
  {
    name: 'jobx test',
    description: 'Run tests on all configuration files',
    usage: 'jobx test',
    options: [],
    example: 'Validates configuration files, API connectivity, and credentials',
  },
  {
    name: 'jobx reset',
    description: 'Reset the project configuration',
    usage: 'jobx reset [options]',
    options: [
      {
        flag: '--soft',
        desc: 'Keep credentials, reset config and apply files',
      },
      { flag: '--hard', desc: 'Reset everything including credentials' },
    ],
    example:
      'Restore JobX to initial state. Use --soft to keep credentials or --hard for complete reset',
  },
  {
    name: 'jobx --version',
    description: 'Output the version number',
    usage: 'jobx --version',
    options: [],
    example: 'Displays the currently installed JobX version',
  },
  {
    name: 'jobx --help',
    description: 'Display help for command',
    usage: 'jobx --help',
    options: [],
    example: 'Shows all available commands and options',
  },
];

const CommandsSection = () => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);

  return (
    <section id="commands" className="py-20 px-4 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-4xl font-bold mb-4">CLI Commands</h2>
        <p className="text-lg text-muted-foreground">
          All available commands and their options for full job automation
          control
        </p>
      </div>

      <div className="space-y-3">
        {commands.map((cmd, idx) => (
          <Card
            key={idx.toString()}
            className="border-border/50 overflow-hidden hover:border-accent/50 transition"
          >
            <button
              type="button"
              onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
              className="w-full p-6 flex items-center justify-between hover:bg-card/50 transition text-left"
            >
              <div>
                <h3 className="font-mono text-accent font-semibold mb-1">
                  {cmd.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {cmd.description}
                </p>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-muted-foreground transition shrink-0 ml-4 ${expandedIdx === idx ? 'rotate-180' : ''}`}
              />
            </button>

            {expandedIdx === idx && (
              <div className="px-6 pb-6 border-t border-border/50 bg-background/30 space-y-4">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">
                    Usage
                  </p>
                  <CodeBlock code={cmd.usage} language="bash" />
                </div>

                {cmd.options.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-2">
                      Options
                    </p>
                    <div className="space-y-2">
                      {cmd.options.map((opt, oidx) => (
                        <div key={oidx.toString()} className="flex gap-3">
                          <code className="text-accent font-mono text-sm shrink-0">
                            {opt.flag}
                          </code>
                          <span className="text-sm text-muted-foreground">
                            {opt.desc}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">
                    Description
                  </p>
                  <p className="text-sm text-foreground/80">{cmd.example}</p>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CommandsSection;
