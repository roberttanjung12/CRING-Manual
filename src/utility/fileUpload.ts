/**
 * File Upload Utility
 * Centralized utility for handling file upload operations
 * Mengganti kode repetitif di berbagai hooks
 */

export interface FileErrorConfig {
  maxSizeMB?: number;
  allowedFormats?: string[];
}

export interface FileUploadError {
  code: number;
  message: string;
}

/**
 * Handles file upload errors with consistent messaging
 * @param code - Error code (1: format error, 2: size error)
 * @param config - Configuration for error messages
 */
export const handleFileError = (code: number, config: FileErrorConfig = {}): FileUploadError => {
  const { maxSizeMB = 10, allowedFormats = ['.xlsx', '.csv'] } = config;

  let message = '';

  switch (code) {
    case 1:
      message = `Format file tidak didukung! Format yang diizinkan: ${allowedFormats.join(', ')}`;
      break;
    case 2:
      message = `Max file size ${maxSizeMB}MB!`;
      break;
    default:
      message = 'Terjadi kesalahan saat upload file';
  }

  return { code, message };
};

/**
 * Removes file from array at specified index
 * @param files - Current file array
 * @param index - Index to remove
 */
export const removeFileAtIndex = <T>(files: T[], index: number): T[] => {
  const copyFiles = [...files];

  copyFiles.splice(index, 1);

  return copyFiles;
};

/**
 * Validates file against constraints
 * @param file - File to validate
 * @param config - Validation config
 */
export const validateFile = (file: File, config: FileErrorConfig = {}): FileUploadError | null => {
  const { maxSizeMB = 10, allowedFormats = ['.xlsx', '.csv'] } = config;

  // Check file format
  const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

  if (!allowedFormats.includes(fileExtension)) {
    return handleFileError(1, config);
  }

  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  if (file.size > maxSizeBytes) {
    return handleFileError(2, config);
  }

  return null;
};

/**
 * Creates a preview URL for file
 * @param file - File to create preview for
 */
export const createFilePreview = (file: File): string => {
  return URL.createObjectURL(file);
};

/**
 * Cleanup preview URL
 * @param url - URL to cleanup
 */
export const cleanupFilePreview = (url: string): void => {
  URL.revokeObjectURL(url);
};
