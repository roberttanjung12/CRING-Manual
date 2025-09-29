import PageID from '@/@dront/components/PageID';
import FolderStructurePage from '@/modules/02-Fundamentals/folder-structure';

export default function FolderStructurePageRoute() {
  return (
    <PageID
      title="Folder Structure - CRING! Portal Partner Documentation"
      description="Struktur folder dan organisasi file dalam CRING! Portal Partner"
      keywords="Folder Structure, Organization, Next.js, File System"
      breadcrumbs={{
        title: 'Folder Structure',
        routes: [
          { label: 'Documentation', href: '/' },
          { label: 'Fundamentals', href: '/fundamentals' },
          { label: 'Folder Structure' }
        ]
      }}
    >
      <FolderStructurePage />
    </PageID>
  );
}
