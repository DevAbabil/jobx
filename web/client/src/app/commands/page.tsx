import { CommandsSection } from '@/components';

export const metadata = {
  title: 'Commands - JobX',
  description: 'Explore all available CLI commands and their usage in JobX.',
};

export default function CommandsPage() {
  return (
    <main className="min-h-screen">
      <CommandsSection />
    </main>
  );
}
