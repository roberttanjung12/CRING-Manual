import Image from 'next/image';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import isEmpty from 'is-empty';
import Files from 'react-files';

interface PropDesc {
  fileFormat: string;
  maxFileSize: number;
  maxRow: number;
}

interface Props {
  value: File[];
  onRemove: (arg: number) => void;
  onChange: (arg: File[]) => void;
  onError: ({ code }: { code: number }) => void;
  id?: string;
  accepts?: string[];
  maxFileSize?: number;
  minFileSize?: number;
  maxLabel?: number;
  description?: PropDesc;
}

const RHFFileUploadBox = ({
  value,
  onRemove,
  onChange,
  onError,
  description,
  id = 'field-rhf-upload-box',
  accepts = ['.csv', '.xlsx'],
  maxFileSize = 15728640,
  minFileSize = 0,
  maxLabel = 10
}: Props) => {
  const onChangeFile = (files: File[]) => {
    if (!isEmpty(files)) onChange(files);
  };

  return (
    <Box className="sc-field--file" id={id}>
      {isEmpty(value) ? (
        <Box className="sc-field--file-skin" id="file:skin">
          <Box textAlign="center" id="skin:icon">
            <Image alt="File upload" height={72} src="/icon/file-upload.png" width={72} />
          </Box>
          <Box textAlign="center" display="flex" id="skin:text">
            Letakan file disini atau{' '}
            <span className="text-link text-bold">
              <Files
                clickable
                accepts={accepts}
                id={`${id}-files-inner`}
                maxFileSize={maxFileSize}
                minFileSize={minFileSize}
                name={`${id}-files-inner`}
                onChange={onChangeFile}
                onError={onError}
              >
                <span className="text-link text-bold">Browse</span>
              </Files>
            </span>
          </Box>
          <Box className="sc-field--file-skin-validations" id="skin:validations">
            <ul>
              {(!isEmpty(description) && <li>{description?.fileFormat}</li>) || <li>File {accepts.join(' / ')}</li>}
              {(!isEmpty(description) && <li>{description?.maxFileSize}</li>) || <li>Maksimum {maxLabel}mb</li>}
              {!isEmpty(description) && <li>{description?.maxRow}</li>}
            </ul>
          </Box>
        </Box>
      ) : (
        <Box id="file:list" sx={{ width: '100%' }}>
          {value.map((item, itemIndex) => (
            <Box
              key={item.name}
              alignItems="center"
              display="flex"
              flexWrap="nowrap"
              justifyContent="space-between"
              p={2.5}
              sx={{ background: 'rgba(10, 71, 204, 0.1)', borderRadius: '8px' }}
            >
              <Box id={`file:name-${itemIndex}`} pr={4}>
                {item.name}
              </Box>
              <Box id={`file:action-${itemIndex}`}>
                <IconButton title="Hapus file" onClick={() => onRemove(itemIndex)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      )}
      <Files
        clickable
        accepts={accepts}
        id={`${id}-files`}
        maxFileSize={maxFileSize}
        minFileSize={minFileSize}
        name={`${id}-files`}
        onChange={onChangeFile}
        onError={onError}
      >
        <Box className="sc--file-skin-drag" id="file:skin-drag">
          <span>Lepas disini</span>
        </Box>
      </Files>
    </Box>
  );
};

export default RHFFileUploadBox;
