'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ConfigurationSection = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const configs = {
    config: `{
  "profile": {
    "name": "Your Name",
    "address": "City, Country"
  },
  "links": {
    "github": "https://github.com/yourusername",
    "portfolio": "https://yourportfolio.com",
    "linkedIn": "https://linkedin.com/in/yourusername"
  },
  "contact": {
    "email": "your.email@example.com",
    "phone": "+1234567890"
  },
  "skills": ["React", "Node.js", "TypeScript", "MongoDB"]
}`,
    credentials: `{
  "client_email": "your-service-account@project.iam.gserviceaccount.com",
  "private_key": "-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n",
  "spreadsheet_id": "YOUR_SPREADSHEET_ID",
  "lsa_user": "your.email@gmail.com",
  "lsa_pass": "your_app_specific_password",
  "open_ai_secret": "sk-proj-...",
  "auth_client_id": "your-client-id.apps.googleusercontent.com",
  "auth_client_secret": "GOCSPX-..."
}`,
    apply: `{
  "company": "Company Name",
  "company_email": "hiring@company.com",
  "company_website": "https://company.com",
  "location": "Remote",
  "subject": "Application for Position Title",
  "position": "Position Title",
  "experience": "2 years",
  "education": "Bachelor's Degree",
  "job_source": "https://jobboard.com/posting/12345"
}`,
  };

  return (
    <section id="config" className="py-20 px-4 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-4xl font-bold mb-4">Configuration</h2>
        <p className="text-lg text-muted-foreground">
          Set up JobX with your credentials and preferences for automated job
          applications
        </p>
      </div>

      <Tabs defaultValue="config" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-card border border-border/50">
          <TabsTrigger value="config">jobx.config.json</TabsTrigger>
          <TabsTrigger value="credentials">jobx.credentials.json</TabsTrigger>
          <TabsTrigger value="apply">jobx.apply.json</TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="mt-6">
          <div className="relative">
            <button
              type="button"
              onClick={() => copyToClipboard(configs.config, 'config')}
              className="absolute top-4 right-4 z-10 text-accent hover:bg-accent/10 p-2 rounded transition"
              title="Copy to clipboard"
            >
              {copied === 'config' ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
            <CodeBlock
              code={configs.config}
              language="json"
              filename="jobx.config.json"
            />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Your personal profile, contact information, and skills. This file is
            generated when you run{' '}
            <code className="text-accent">jobx init</code>.
          </p>
        </TabsContent>

        <TabsContent value="credentials" className="mt-6">
          <div className="mb-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-xs text-destructive">
              ⚠️ Keep this file secure and never commit to version control. Add
              it to .gitignore
            </p>
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => copyToClipboard(configs.credentials, 'creds')}
              className="absolute top-4 right-4 z-10 text-accent hover:bg-accent/10 p-2 rounded transition"
              title="Copy to clipboard"
            >
              {copied === 'creds' ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
            <CodeBlock
              code={configs.credentials}
              language="json"
              filename="jobx.credentials.json"
            />
          </div>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">
                client_email & private_key:
              </strong>{' '}
              Google Sheets service account credentials
            </p>
            <p>
              <strong className="text-foreground">spreadsheet_id:</strong> Your
              Google Sheets ID for tracking applications
            </p>
            <p>
              <strong className="text-foreground">lsa_user & lsa_pass:</strong>{' '}
              Gmail SMTP credentials for sending emails
            </p>
            <p>
              <strong className="text-foreground">open_ai_secret:</strong>{' '}
              OpenAI API key for AI-powered email generation
            </p>
            <p>
              <strong className="text-foreground">
                auth_client_id & auth_client_secret:
              </strong>{' '}
              Google OAuth credentials
            </p>
          </div>
        </TabsContent>

        <TabsContent value="apply" className="mt-6">
          <div className="relative">
            <button
              type="button"
              onClick={() => copyToClipboard(configs.apply, 'apply')}
              className="absolute top-4 right-4 z-10 text-accent hover:bg-accent/10 p-2 rounded transition"
              title="Copy to clipboard"
            >
              {copied === 'apply' ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
            <CodeBlock
              code={configs.apply}
              language="json"
              filename="jobx.apply.json"
            />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Job application metadata. Fill this out for each job you're applying
            to. This information is used to generate personalized emails and
            track your applications.
          </p>
        </TabsContent>
      </Tabs>

      <div className="mt-12 grid md:grid-cols-2 gap-6">
        <Card className="p-6 border-border/50 bg-card/50">
          <h3 className="font-semibold mb-4">OpenAI API Setup</h3>
          <ol className="space-y-3 text-sm text-muted-foreground">
            <li>
              1. Visit{' '}
              <code className="text-accent font-mono">platform.openai.com</code>
            </li>
            <li>2. Create an API key in your account</li>
            <li>
              3. Add the key to{' '}
              <code className="text-accent font-mono">
                jobx.credentials.json
              </code>{' '}
              as <code className="text-accent font-mono">open_ai_secret</code>
            </li>
            <li>4. Ensure your account has credits</li>
          </ol>
        </Card>

        <Card className="p-6 border-border/50 bg-card/50">
          <h3 className="font-semibold mb-4">Google Sheets Setup</h3>
          <ol className="space-y-3 text-sm text-muted-foreground">
            <li>1. Create a Google Cloud project</li>
            <li>2. Enable Google Sheets API</li>
            <li>3. Create a service account and download JSON key</li>
            <li>
              4. Add <code className="text-accent font-mono">client_email</code>{' '}
              and <code className="text-accent font-mono">private_key</code> to
              credentials
            </li>
            <li>5. Share your spreadsheet with the service account email</li>
          </ol>
        </Card>

        <Card className="p-6 border-border/50 bg-card/50">
          <h3 className="font-semibold mb-4">Gmail SMTP Setup</h3>
          <ol className="space-y-3 text-sm text-muted-foreground">
            <li>1. Enable 2-factor authentication on your Gmail account</li>
            <li>2. Generate an app-specific password</li>
            <li>
              3. Add your email to{' '}
              <code className="text-accent font-mono">lsa_user</code>
            </li>
            <li>
              4. Add the app password to{' '}
              <code className="text-accent font-mono">lsa_pass</code>
            </li>
          </ol>
        </Card>

        <Card className="p-6 border-border/50 bg-card/50">
          <h3 className="font-semibold mb-4">Quick Start</h3>
          <ol className="space-y-3 text-sm text-muted-foreground">
            <li>
              1. Run <code className="text-accent font-mono">jobx init</code> to
              create config files
            </li>
            <li>
              2. Fill in your credentials in{' '}
              <code className="text-accent font-mono">
                jobx.credentials.json
              </code>
            </li>
            <li>
              3. Update job details in{' '}
              <code className="text-accent font-mono">jobx.apply.json</code>
            </li>
            <li>
              4. Run{' '}
              <code className="text-accent font-mono">
                jobx mail --generate
              </code>{' '}
              to create emails
            </li>
          </ol>
        </Card>
      </div>
    </section>
  );
};

export default ConfigurationSection;
