'use client';

import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const commands = [
  {
    name: 'jobx init',
    description: 'Initialize the project with default configuration',
  },
  {
    name: 'jobx test',
    description: 'Run tests on all configuration files',
  },
  {
    name: 'jobx mail generate',
    description: 'Generate job application emails using AI',
  },
  {
    name: 'jobx mail submit',
    description: 'Submit generated job application emails',
  },

  {
    name: 'jobx reset soft',
    description: 'Perform a soft reset (keep credentials)',
  },
  {
    name: 'jobx reset hard',
    description: 'Perform a hard reset (reset everything)',
  },
  {
    name: 'jobx sheet find <id>',
    description: 'Find job by submitted ID',
  },
  {
    name: 'jobx sheet delete <id>',
    description: 'Delete job by submitted ID',
  },
  {
    name: 'jobx sheet update <id> <field> <value>',
    description: 'Update submitted job field/value',
  },
  {
    name: 'jobx --version',
    description: 'Output the version number',
  },
  {
    name: 'jobx --help',
    description: 'Display help for command',
  },
];

const CommandsSection = () => {
  return (
    <section id="commands" className="py-20 px-4 max-w-7xl mx-auto relative">
      <div className="absolute inset-0 gradient-mesh opacity-30 pointer-events-none"></div>
      <div className="mb-12 relative z-10">
        <h2 className="text-4xl font-bold mb-4">
          <span className="text-gradient">CLI Commands</span>
        </h2>
        <p className="text-lg text-muted-foreground">
          All available commands and their options for full job automation
          control
        </p>
      </div>

      <Card className="border-border/50 overflow-hidden card-hover-glow shadow-xl relative z-10">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border/50">
              <TableHead className="font-semibold text-foreground w-[60px] text-center">
                #
              </TableHead>
              <TableHead className="font-semibold text-foreground w-[40%]">
                Command
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                Description
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {commands.map((cmd, idx) => (
              <TableRow
                key={idx.toString()}
                className="border-border/50 hover:bg-accent/5"
              >
                <TableCell className="text-center text-muted-foreground font-medium">
                  {idx + 1}
                </TableCell>
                <TableCell className="font-mono text-accent font-medium">
                  {cmd.name}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {cmd.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </section>
  );
};

export default CommandsSection;
