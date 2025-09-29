/**
 * Custom Hook for File Upload Management
 * Centralized hook untuk menangani file upload, error handling, dan template download
 * Mengganti hook repetitif di berbagai modules
 */

import { useCallback } from 'react';
import type { UseFormSetError, UseFormClearErrors, UseFormReset, UseFormSetValue } from 'react-hook-form';
import {
  type FileErrorConfig,
  handleFileError,
  removeFileAtIndex,
  validateFile,
  createFilePreview,
  cleanupFilePreview
} from '@/utility/fileUpload';
import {
  type TemplateFile,
  type DownloadCriteria,
  downloadPredefinedTemplate,
  createUploadFormData,
  TEMPLATE_CONFIGS
} from '@/utility/templateDownload';

interface UseFileUploadProps {
  fieldName?: string;
  setError: UseFormSetError<any>;
  clearErrors: UseFormClearErrors<any>;
  reset?: UseFormReset<any>;
  setValue?: UseFormSetValue<any>;
  config?: FileErrorConfig;
}

export const useFileUpload = ({
  fieldName = 'uploadFile',
  setError,
  clearErrors,
  reset,
  setValue,
  config = {}
}: UseFileUploadProps) => {
  /**
   * Handle file upload error
   */
  const handleError = useCallback(
    ({ code }: { code: number }) => {
      const error = handleFileError(code, config);

      setError(fieldName, { type: 'custom', message: error.message });
    },
    [setError, fieldName, config]
  );

  /**
   * Remove file from upload list
   */
  const removeFile = useCallback(
    (index: number, currentFiles: File[]) => {
      if (!setValue) {
        console.warn('setValue not provided to useFileUpload hook');

        return;
      }

      const updatedFiles = removeFileAtIndex(currentFiles, index);

      setValue(fieldName, updatedFiles);
    },
    [setValue, fieldName]
  );

  /**
   * Validate uploaded file
   */
  const validateUploadedFile = useCallback(
    (file: File) => {
      const validationError = validateFile(file, config);

      if (validationError) {
        setError(fieldName, { type: 'custom', message: validationError.message });

        return false;
      }
      clearErrors(fieldName);

      return true;
    },
    [setError, clearErrors, fieldName, config]
  );

  /**
   * Handle successful upload/submit
   */
  const handleSuccess = useCallback(() => {
    if (reset) {
      reset();
    }
    clearErrors();
  }, [reset, clearErrors]);

  /**
   * Download template with predefined config
   */
  const downloadTemplate = useCallback(
    (templateType: keyof typeof TEMPLATE_CONFIGS, criteria: DownloadCriteria) => {
      const success = downloadPredefinedTemplate(templateType, criteria);

      if (success && reset) {
        reset();
      }

      return success;
    },
    [reset]
  );

  /**
   * Download custom template
   */
  const downloadCustomTemplate = useCallback(
    (files: TemplateFile[], criteria: DownloadCriteria) => {
      const success = downloadTemplate(files as any, criteria);

      if (success && reset) {
        reset();
      }

      return success;
    },
    [downloadTemplate, reset]
  );

  /**
   * Create form data for upload
   */
  const prepareFormData = useCallback((file: File, remark?: string) => {
    return createUploadFormData(file, remark);
  }, []);

  /**
   * Create file preview
   */
  const createPreview = useCallback((file: File) => {
    return createFilePreview(file);
  }, []);

  /**
   * Cleanup file preview
   */
  const cleanupPreview = useCallback((url: string) => {
    cleanupFilePreview(url);
  }, []);

  return {
    // File upload handlers
    handleError,
    removeFile,
    validateUploadedFile,
    handleSuccess,

    // Template download handlers
    downloadTemplate,
    downloadCustomTemplate,

    // Utility functions
    prepareFormData,
    createPreview,
    cleanupPreview,

    // Constants
    TEMPLATE_CONFIGS
  };
};

export type UseFileUploadReturn = ReturnType<typeof useFileUpload>;
