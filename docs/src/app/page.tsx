import {
  CommandsSection,
  ConfigurationSection,
  FeaturesSection,
  FolderStructureSection,
  HeroSection,
  InstallationSection,
} from '@/components';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <InstallationSection />
      <FolderStructureSection />
      <CommandsSection />
      <ConfigurationSection />
    </main>
  );
}
