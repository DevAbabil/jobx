import { BarChart3, Mail, Shield, Sparkles, Terminal, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Email Generation',
    description:
      'Generate personalized job application emails using OpenAI API with context-aware content',
  },
  {
    icon: BarChart3,
    title: 'Google Sheets Integration',
    description:
      'Track all your applications in real-time with automatic logging and analytics',
  },
  {
    icon: Terminal,
    title: 'Automated Workflow',
    description:
      'Complete job application automation from discovery to submission with simple commands',
  },
  {
    icon: Mail,
    title: 'Email Submission',
    description:
      'Submit applications directly from CLI with SMTP configuration support',
  },
  {
    icon: Zap,
    title: 'Templates & Profiles',
    description:
      'Create reusable templates and profiles for different job application scenarios',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description:
      'All credentials stored locally, API keys only transmitted to respective services',
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Powerful Features
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Everything you need to automate your job search and land your dream
          role
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <Card
              key={idx.toString()}
              className="p-6 hover:border-accent/50 hover:bg-card/50 transition border-border/50"
            >
              <Icon className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturesSection;
