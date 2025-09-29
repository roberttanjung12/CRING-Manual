/**
 * Template Download Utility
 * Centralized utility for handling template downloads
 * Mengganti kode repetitif di berbagai modules
 */

export interface TemplateFile {
  path: string;
  kind?: string;
  bank?: string;
  type: string;
  name?: string;
}

export interface DownloadCriteria {
  downloadKind?: string;
  downloadBank?: { value: string };
  downloadType?: string;
}

/**
 * Downloads template file based on criteria
 * @param files - Array of available template files
 * @param criteria - Download criteria to match
 */
export const downloadTemplate = (files: TemplateFile[], criteria: DownloadCriteria): boolean => {
  const getFile = files.find(find => {
    let match = true;

    if (criteria.downloadKind && find.kind) {
      match = match && find.kind === criteria.downloadKind;
    }

    if (criteria.downloadBank && find.bank) {
      match = match && find.bank === criteria.downloadBank.value.toLowerCase();
    }

    if (criteria.downloadType && find.type) {
      match = match && find.type === criteria.downloadType;
    }

    return match;
  });

  if (!getFile) {
    return false;
  }

  const downloadLink = document.createElement('a');

  downloadLink.href = getFile.path;
  downloadLink.setAttribute('download', getFile.name || '');
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);

  return true;
};

/**
 * Pre-defined template configurations for common use cases
 */
export const TEMPLATE_CONFIGS = {
  VA_CREDIT: [
    { path: '/download/template-upload-va-credit-bni.csv', kind: 'credit', bank: 'bank bni', type: '.csv' },
    { path: '/download/template-upload-va-credit-bni.xlsx', kind: 'credit', bank: 'bank bni', type: '.xlsx' },
    { path: '/download/template-upload-va-credit-dki.csv', kind: 'credit', bank: 'bank dki', type: '.csv' },
    { path: '/download/template-upload-va-credit-dki.xlsx', kind: 'credit', bank: 'bank dki', type: '.xlsx' },
    { path: '/download/template-upload-va-credit-btn.csv', kind: 'credit', bank: 'bank btn', type: '.csv' },
    { path: '/download/template-upload-va-credit-btn.xlsx', kind: 'credit', bank: 'bank btn', type: '.xlsx' },
    { path: '/download/template-upload-va-credit-permata.csv', kind: 'credit', bank: 'bank permata', type: '.csv' },
    { path: '/download/template-upload-va-credit-permata.xlsx', kind: 'credit', bank: 'bank permata', type: '.xlsx' }
  ],
  MERCHANT_BULK: [{ path: '/download/bulk_add_merchant_QR_Statis.xlsx', type: '.xlsx' }]
} as const;

/**
 * Simplified download function for pre-configured templates
 * @param templateType - Type of template from TEMPLATE_CONFIGS
 * @param criteria - Download criteria
 */
export const downloadPredefinedTemplate = (
  templateType: keyof typeof TEMPLATE_CONFIGS,
  criteria: DownloadCriteria
): boolean => {
  return downloadTemplate([...TEMPLATE_CONFIGS[templateType]], criteria);
};

/**
 * Creates FormData for file upload
 * @param file - File to upload
 * @param remark - Optional remark/description
 */
export const createUploadFormData = (file: File, remark?: string): FormData => {
  const formData = new FormData();

  formData.append('file', file);

  if (remark) {
    formData.append('remark', remark);
  }

  return formData;
};
