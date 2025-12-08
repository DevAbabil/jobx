'use client';

import { useState } from 'react';
import { CodeBlock } from '@/components/code';
import { Card } from '@/components/ui/card';

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
  "open_ai_secret": "sk-proj-...",
  "lsa_user": "your.email@gmail.com",
  "lsa_pass": "your_app_specific_password",
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
  "job_source": "https://jobboard.com/posting/12345",
  "attachment_type": "resume"
}`,
};

const tabs = [
  {
    id: 'apply',
    label: 'jobx.apply.json',
    description:
      'Job application metadata. AI may auto-update fields during email generation - always review before submitting.',
  },
  {
    id: 'config',
    label: 'jobx.config.json',
    description:
      'Your personal profile, contact information, and skills. Generated when you run jobx init.',
  },
  {
    id: 'credentials',
    label: 'jobx.credentials.json',
    description:
      'API keys and credentials for OpenAI, Google Sheets, and SMTP. Keep this file secure!',
    warning: true,
  },
];

const ConfigurationSection = () => {
  const [selectedTab, setSelectedTab] = useState('apply');

  return (
    <section id="config" className="py-20 px-4 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-4xl font-bold mb-4">Configuration</h2>
        <p className="text-lg text-muted-foreground">
          Set up JobX with your credentials and preferences for automated job
          applications
        </p>
      </div>

      <div className="grid lg:grid-cols-[320px_1fr] gap-8 w-full overflow-hidden">
        <div className="space-y-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedTab(tab.id)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedTab === tab.id
                  ? 'border-accent bg-accent/10'
                  : 'border-border hover:border-accent/50 hover:bg-accent/5'
              }`}
            >
              <div className="font-mono text-sm font-semibold mb-1 text-accent">
                {tab.label}
              </div>
              <p className="text-xs text-muted-foreground">{tab.description}</p>
              {tab.warning && (
                <p className="text-xs text-destructive mt-2">
                  ⚠️ Never commit to version control
                </p>
              )}
            </button>
          ))}
        </div>

        <div className="min-w-0 w-full">
          <CodeBlock
            code={configs[selectedTab as keyof typeof configs]}
            language="json"
            filename={tabs.find((t) => t.id === selectedTab)?.label}
          />
        </div>
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-6">
        <Card
          id="openai-setup"
          className="p-6 border-border/50 bg-card/50 scroll-mt-20"
        >
          <h3 className="font-semibold mb-4">OpenAI API Setup</h3>
          <ol className="space-y-3 text-sm text-muted-foreground">
            <li>
              1. Visit{' '}
              <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                OpenAI API Keys
              </a>
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

        <Card
          id="sheets-setup"
          className="p-6 border-border/50 bg-card/50 scroll-mt-20"
        >
          <h3 className="font-semibold mb-4">Google Sheets Setup</h3>
          <ol className="space-y-3 text-sm text-muted-foreground">
            <li>
              1. Go to{' '}
              <a
                href="https://console.cloud.google.com/projectcreate"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Google Cloud Console
              </a>{' '}
              and create a project
            </li>
            <li>
              2. Enable{' '}
              <a
                href="https://console.cloud.google.com/apis/library/sheets.googleapis.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Google Sheets API
              </a>
            </li>
            <li>
              3. Create a{' '}
              <a
                href="https://console.cloud.google.com/iam-admin/serviceaccounts"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                service account
              </a>{' '}
              and download JSON key
            </li>
            <li>
              4. Add <code className="text-accent font-mono">client_email</code>{' '}
              and <code className="text-accent font-mono">private_key</code> to
              credentials
            </li>
            <li>
              5. Create a{' '}
              <a
                href="https://sheets.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Google Sheet
              </a>{' '}
              and share it with the service account email
            </li>
          </ol>
        </Card>

        <Card
          id="smtp-setup"
          className="p-6 border-border/50 bg-card/50 scroll-mt-20"
        >
          <h3 className="font-semibold mb-4">Gmail SMTP Setup</h3>
          <ol className="space-y-3 text-sm text-muted-foreground">
            <li>
              1. Enable{' '}
              <a
                href="https://myaccount.google.com/signinoptions/two-step-verification"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                2-factor authentication
              </a>{' '}
              on your Gmail account
            </li>
            <li>
              2. Generate an{' '}
              <a
                href="https://myaccount.google.com/apppasswords"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                app-specific password
              </a>
            </li>
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
              3. Add your{' '}
              <code className="text-accent font-mono">jobx.context.txt</code>,{' '}
              <code className="text-accent font-mono">jobx.cv.pdf</code>, and{' '}
              <code className="text-accent font-mono">jobx.resume.pdf</code>{' '}
              files
            </li>
            <li>
              4. Update job details in{' '}
              <code className="text-accent font-mono">jobx.apply.json</code>
            </li>
            <li>
              5. Run{' '}
              <code className="text-accent font-mono">jobx mail generate</code>{' '}
              to create emails
            </li>
            <li>
              6. <strong className="text-accent">Review</strong>{' '}
              <code className="text-accent font-mono">jobx.apply.json</code> and{' '}
              <code className="text-accent font-mono">jobx.mail.md</code> (AI
              may update fields)
            </li>
            <li>
              7. Run{' '}
              <code className="text-accent font-mono">jobx mail submit</code> to
              send your application
            </li>
          </ol>
        </Card>

        <Card className="p-6 border-destructive/50 bg-destructive/5">
          <h3 className="font-semibold mb-4 text-destructive flex items-center gap-2">
            <span>⚠️</span> Important Note
          </h3>
          <p className="text-sm text-muted-foreground">
            When you run{' '}
            <code className="text-accent font-mono">jobx mail generate</code>,
            the AI may automatically update certain fields in{' '}
            <code className="text-accent font-mono">jobx.apply.json</code> based
            on the context from{' '}
            <code className="text-accent font-mono">jobx.context.txt</code>.
            Always review both{' '}
            <code className="text-accent font-mono">jobx.apply.json</code> and
            the generated email in{' '}
            <code className="text-accent font-mono">jobx.mail.md</code> before
            running{' '}
            <code className="text-accent font-mono">jobx mail submit</code>.
          </p>
        </Card>
      </div>
    </section>
  );
};

export default ConfigurationSection;
