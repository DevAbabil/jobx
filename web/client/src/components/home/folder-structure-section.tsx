import { File, FileJson, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';

const FolderStructureSection = () => {
  const files = [
    {
      name: 'jobx.config.json',
      icon: FileJson,
      description: 'Your profile, contact info, and skills',
      required: true,
    },
    {
      name: 'jobx.credentials.json',
      icon: FileJson,
      description: 'API keys for OpenAI, Google Sheets, and SMTP',
      required: true,
      warning: 'Keep secure - never commit to git',
    },
    {
      name: 'jobx.apply.json',
      icon: FileJson,
      description: 'Current job application details',
      required: true,
    },
    {
      name: 'jobx.mail.md',
      icon: FileText,
      description: 'Generated email content (auto-created)',
      required: false,
    },
    {
      name: 'jobx.context.txt',
      icon: FileText,
      description: 'Additional context for AI email generation',
      required: true,
    },
    {
      name: 'jobx.cv.pdf',
      icon: File,
      description: (
        <>
          Your CV/curriculum vitae in PDF format (
          <span className="underline">you must provide this</span>)
        </>
      ),
      required: true,
    },
    {
      name: 'jobx.resume.pdf',
      icon: File,
      description: (
        <>
          Your resume in PDF format (
          <span className="underline">you must provide this</span>)
        </>
      ),
      required: true,
    },
  ];

  return (
    <section id="structure" className="py-20 px-4 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-4xl font-bold mb-4">Project Structure</h2>
        <p className="text-lg text-muted-foreground">
          After running <code className="text-accent font-mono">jobx init</code>
          , your project will have the following structure
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="p-6 bg-background/50 border-border/50">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span className="text-accent">📁</span> Folder Structure
          </h3>
          <div className="font-mono text-sm space-y-1 text-muted-foreground">
            <div className="text-foreground">your-project/</div>
            <div className="pl-4">├── jobx.config.json</div>
            <div className="pl-4">├── jobx.credentials.json</div>
            <div className="pl-4">├── jobx.apply.json</div>
            <div className="pl-4">├── jobx.mail.md</div>
            <div className="pl-4">├── jobx.context.txt</div>
            <div className="pl-4">├── jobx.cv.pdf</div>
            <div className="pl-4">└── jobx.resume.pdf</div>
          </div>

          <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <span className="text-accent font-semibold">💡 Tip:</span> Add{' '}
              <code className="text-accent font-mono">
                jobx.credentials.json
              </code>{' '}
              to your <code className="text-accent font-mono">.gitignore</code>{' '}
              file to keep your API keys secure.
            </p>
          </div>
        </Card>

        <div className="space-y-3">
          {files.map((file, idx) => {
            const Icon = file.icon;
            return (
              <Card
                key={idx.toString()}
                className="p-4 bg-background/50 border-border/50"
              >
                <div className="flex items-start gap-3">
                  <Icon className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-mono text-sm text-accent font-semibold">
                        {file.name}
                      </p>
                      {file.required && (
                        <span className="text-xs px-2 py-0.5 bg-accent/20 text-accent rounded-full">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {file.description}
                    </p>
                    {file.warning && (
                      <p className="text-xs text-destructive mt-2">
                        ⚠️ {file.warning}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-6">
        <Card className="p-6 bg-card/50 border-border/50">
          <h4 className="font-semibold mb-3 text-accent">
            Configuration Files
          </h4>
          <p className="text-sm text-muted-foreground">
            JSON files containing your profile, credentials, and application
            details. These are the core files that JobX uses to generate and
            send emails.
          </p>
        </Card>

        <Card className="p-6 bg-card/50 border-border/50">
          <h4 className="font-semibold mb-3 text-accent">Document Files</h4>
          <p className="text-sm text-muted-foreground">
            <span className="underline">You must provide</span> your CV and
            resume in PDF format. JobX will attach the appropriate file based on
            the <code className="font-mono">attachment_type</code> field in your
            application.
          </p>
        </Card>

        <Card className="p-6 bg-card/50 border-border/50">
          <h4 className="font-semibold mb-3 text-accent">Context File</h4>
          <p className="text-sm text-muted-foreground">
            Additional context in plain text format that helps the AI generate
            more personalized and relevant email content for your applications.
          </p>
        </Card>
      </div>
    </section>
  );
};

export default FolderStructureSection;
