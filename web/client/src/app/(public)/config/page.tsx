import { ConfigurationSection } from '@/components';

export const metadata = {
  title: 'Configuration - JobX',
  description:
    'Learn how to configure JobX for optimal job application automation.',
};

export default function ConfigPage() {
  return (
    <main className="min-h-screen">
      <ConfigurationSection />
    </main>
  );
}
