import PageID from '@/@dront/components/PageID';
import FileUploadsPage from '@/modules/05-Features/file-uploads';

export default function FileUploadsPageRoute() {
  return (
    <PageID
      title="File Uploads - CRING! Portal Partner Documentation"
      description="File upload handling, drag & drop, dan file management di CRING!"
      keywords="File Upload, Drag Drop, File Management, Upload Components"
      breadcrumbs={{
        title: 'File Uploads',
        routes: [
          { label: 'Documentation', href: '/' },
          { label: 'Features', href: '/features' },
          { label: 'File Uploads' }
        ]
      }}
    >
      <FileUploadsPage />
    </PageID>
  );
}
