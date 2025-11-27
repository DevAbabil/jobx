import {
  CommandsSection,
  ConfigurationSection,
  FeaturesSection,
  HeroSection,
  InstallationSection,
} from '@/components';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <InstallationSection />
      <CommandsSection />
      <ConfigurationSection />
    </main>
  );
}
