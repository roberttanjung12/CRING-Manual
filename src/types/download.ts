interface DownloadMimeType {
  mimeType: 'text/csv' | 'text/xlsx';
}

interface DownloadExt {
  ext: 'csv' | 'xlsx';
}

export type { DownloadMimeType, DownloadExt };
