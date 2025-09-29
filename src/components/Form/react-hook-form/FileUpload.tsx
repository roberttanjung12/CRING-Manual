import { useMemo } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import isEmpty from 'is-empty';
import Files from 'react-files';
import onDocShow from '../../../utility/doc-show';

interface RHFFileUploadProps {
  id?: string;
  value?: File | string | number;
  types?: string[];
  max?: number;
  isDisabled?: boolean;
  onChange: (file: File | null) => void;
  onError: (error: string) => void;
  maxWidth?: number | string;
}

interface FileError {
  code: number;
  message: string;
}

/**
 * File upload component integrated with React Hook Form.
 *
 * This component allows users to upload files with configurable file types and size limits.
 * It provides UI for selecting, viewing, downloading, and removing files, and handles file validation errors.
 *
 * @component
 * @param {string} [id='RHFFileUpload'] - The unique identifier for the component.
 * @param {any} value - The current file value, expected to be an object with file properties.
 * @param {string[]} [types=[]] - Array of allowed file extensions (without the dot).
 * @param {number} [max=0] - Maximum file size in megabytes (Mb). If 0, no limit is enforced.
 * @param {boolean} [isDisabled=false] - If true, disables the file input and related actions.
 * @param {(file: File | null) => void} onChange - Callback fired when a file is selected or removed.
 * @param {(error: string) => void} onError - Callback fired when a file validation error occurs.
 * @param {number} [maxWidth=300] - Maximum width of the file upload field in pixels.
 *
 * @returns {JSX.Element} The rendered file upload component.
 */
const RHFFileUpload = ({
  id = 'RHFFileUpload',
  value,
  types = [],
  max = 0,
  isDisabled = false,
  onChange,
  onError,
  maxWidth = 300
}: RHFFileUploadProps) => {
  const setAccepts = useMemo(() => {
    const set: string[] = [];

    types.forEach(type => {
      set.push(`.${type}`);
    });

    return set;
  }, [types]);

  const setMegaToBytes = useMemo(() => (max > 0 ? max * 1024 * 1024 : undefined), [max]);

  const onChangeFile = (files: File[]) => {
    if (!isEmpty(files)) {
      const file = files[0] as any;

      file.preview = { url: URL.createObjectURL(files[0]) };

      onChange(file);
    }
  };

  const onErrorFile = (error: FileError) => {
    let set = '';

    if (error?.code === 1) set = 'Format file tidak didukung';
    else if (error?.code === 2) set = `Max file size ${max}Mb`;

    onError(set);
  };

  const onView = () => {
    if (typeof value === 'object' && value !== null && 'type' in value && 'preview' in value) {
      onDocShow({ mimeType: (value as any)?.type, url: (value as any)?.preview?.url });
    }
  };

  const onDownload = () => {
    if (typeof value === 'object' && value !== null && 'preview' in value) {
      const tempLink = document.createElement('a');

      tempLink.href = (value as any)?.preview?.url;
      tempLink.setAttribute('download', (value as any)?.name);
      tempLink.setAttribute('target', '_blank');
      tempLink.click();
      tempLink.remove();
    }
  };

  return (
    <Box id={id}>
      {isEmpty((value as any)?.name) ? (
        <Box id={`${id}:field`} sx={{ maxWidth, width: '100%' }}>
          <Box
            id={`${id}:input`}
            sx={{
              position: 'relative',
              '&:before': {
                content: '""',
                display: isDisabled ? 'block' : 'none',
                position: 'absolute',
                top: '0',
                left: '0',
                height: '100%',
                width: '100%',
                zIndex: '3',
                borderRadius: '14px',
                background: '#dedede',
                opacity: '0.5',
                cursor: 'no-drop'
              }
            }}
          >
            <Files
              clickable
              accepts={setAccepts}
              id={`${id}:input:file`}
              maxFileSize={setMegaToBytes}
              minFileSize={0}
              name={`${id}:input:file`}
              onChange={onChangeFile}
              onError={onErrorFile}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 2,
                  border: theme => `1px solid ${theme.palette.grey[300]}`,
                  borderRadius: '14px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    mr: 2,
                    border: theme => `1px solid ${theme.palette.info.main}`,
                    borderRadius: '14px',
                    color: theme => theme.palette.info.main
                  }}
                >
                  Choose File
                </Box>
                <Box sx={{ color: theme => theme.palette.grey[300] }}>No File Choosen</Box>
              </Box>
            </Files>
          </Box>
          <Box
            id={`${id}:desc`}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 2,
              fontSize: '12px',
              color: theme => theme.palette.grey[100]
            }}
          >
            <Box id={`${id}:desc:types`}>{types.length > 0 && <span>Format: {types.join(', ')}</span>}</Box>
            <Box id={`${id}:desc:max`}>{max > 0 && <span>Max: {max} Mb</span>}</Box>
          </Box>
        </Box>
      ) : (
        <Box id={`${id}:value`} sx={{ display: 'flex' }}>
          <Typography
            id={`${id}:value:name`}
            sx={{ width: { xs: 'auto', md: '250px' }, mt: 2, color: theme => theme.palette.success.contrastText }}
          >
            {(value as any)?.name}
          </Typography>
          <Box id={`${id}:value:buttons`} sx={{ display: 'flex', alignItems: 'center', columnGap: 2, pl: 4 }}>
            {!isDisabled && (
              <Box id={`${id}:value:buttons:remove`}>
                <IconButton color="secondary" title="Hapus lampiran" onClick={() => onChange(null)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            )}
            <Box id={`${id}:value:buttons:view`}>
              <IconButton
                color="primary"
                sx={{ boxShadow: '1px 2px 6px 0px #13235914' }}
                title="Lihat lampiran"
                onClick={onView}
              >
                <RemoveRedEyeOutlinedIcon />
              </IconButton>
            </Box>
            <Box id={`${id}:value:buttons:download`}>
              <IconButton
                color="primary"
                sx={{ boxShadow: '1px 2px 6px 0px #13235914' }}
                title="Download lampiran"
                onClick={onDownload}
              >
                <FileDownloadOutlinedIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default RHFFileUpload;
