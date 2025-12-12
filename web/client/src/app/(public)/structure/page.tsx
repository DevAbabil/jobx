import { FolderStructureSection } from '@/components';

export const metadata = {
  title: 'Project Structure - JobX',
  description:
    'Understand the folder structure and organization of JobX project.',
};

export default function StructurePage() {
  return (
    <main className="min-h-screen">
      <FolderStructureSection />
    </main>
  );
}
