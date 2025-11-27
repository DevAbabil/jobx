import { Check } from 'lucide-react';

const InstallationSection = () => {
  const prerequisites = [
    'Node.js 18 or later',
    'npm or yarn package manager',
    'TypeScript knowledge (helpful but not required)',
    'Google Sheets API credentials (optional)',
    'OpenAI API key (for email generation)',
  ];

  return (
    <section
      id="installation"
      className="py-20 px-4 max-w-7xl mx-auto bg-card/30 rounded-2xl"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">Installation & Quick Start</h2>

        <div className="grid md:grid-cols-2 gap-12 mt-12">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Prerequisites</h3>
            <div className="space-y-3">
              {prerequisites.map((item, idx) => (
                <div key={idx.toString()} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6">Installation Steps</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center font-mono text-sm font-bold">
                  1
                </div>
                <div>
                  <p className="font-mono text-sm text-accent mb-1">
                    npm install -g jobx
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Install JobX globally
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center font-mono text-sm font-bold">
                  2
                </div>
                <div>
                  <p className="font-mono text-sm text-accent mb-1">
                    jobx init
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Initialize project configuration
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center font-mono text-sm font-bold">
                  3
                </div>
                <div>
                  <p className="font-mono text-sm text-accent mb-1">
                    jobx test
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Validate your configuration
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center font-mono text-sm font-bold">
                  4
                </div>
                <div>
                  <p className="font-mono text-sm text-accent mb-1">
                    jobx mail --generate
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Start generating applications
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-12 border-t border-border">
          <h3 className="text-2xl font-semibold mb-6">
            Generated Configuration Files
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                file: 'jobx.config.json',
                desc: 'Profile and contact information',
              },
              {
                file: 'jobx.credentials.json',
                desc: 'API keys and authentication',
              },
              {
                file: 'jobx.apply.json',
                desc: 'Active job application metadata',
              },
              { file: 'jobx.mail.md', desc: 'Generated email output' },
            ].map((item, idx) => (
              <div
                key={idx.toString()}
                className="p-4 bg-background/50 rounded-lg border border-border/50"
              >
                <p className="font-mono text-sm text-accent mb-1">
                  {item.file}
                </p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstallationSection;
