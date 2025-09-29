'use client';

import { Typography, Alert, Card, CardContent, Stack, Chip } from '@mui/material';
import { CodeBlock } from '@/documentation/components';
import { DocumentationPageLayout } from '@/documentation/layouts/DocumentationLayout';

const FileUploadsPage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'File Uploads Overview' },
    { id: 'basic-upload', title: 'Basic File Upload' },
    { id: 'drag-drop', title: 'Drag & Drop' },
    { id: 'advanced-upload', title: 'Advanced Upload Features' }
  ];

  return (
    <DocumentationPageLayout
      title="File Uploads"
      description="File upload components dan drag-drop functionality untuk CRING! Partner"
      tableOfContents={tableOfContents}
      navigation={{
        previous: {
          title: 'Tables',
          href: '/features/tables'
        },
        next: {
          title: 'Creating Features',
          href: '/workflow/creating-features'
        }
      }}
    >
      <section id="overview">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          File Uploads Overview
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          CRING! Partner menyediakan file upload components dengan drag-drop functionality, progress tracking, dan
          validation untuk mendukung berbagai kebutuhan upload file.
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
          <Chip label="Drag & Drop" color="primary" variant="outlined" />
          <Chip label="Progress Tracking" color="secondary" variant="outlined" />
          <Chip label="File Validation" color="info" variant="outlined" />
          <Chip label="Multiple Files" color="success" variant="outlined" />
        </Stack>
      </section>

      <section id="basic-upload">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Basic File Upload
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Simple File Upload Component
            </Typography>
            <CodeBlock
              language="typescript"
              title="FileUpload.tsx"
              code={`import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  LinearProgress,
  Alert,
  IconButton
} from '@mui/material';
import { CloudUpload, Delete } from '@mui/icons-material';

interface FileUploadProps {
  accept?: string;
  maxSize?: number; // in MB
  onFileSelect?: (file: File) => void;
  onUploadComplete?: (result: any) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  accept = "*/*",
  maxSize = 10,
  onFileSelect,
  onUploadComplete
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(\`File size must be less than \${maxSize}MB\`);
      return;
    }

    setError(null);
    setSelectedFile(file);
    onFileSelect?.(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          setUploadProgress(progress);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const result = JSON.parse(xhr.responseText);
          onUploadComplete?.(result);
          setSelectedFile(null);
        } else {
          setError('Upload failed');
        }
        setUploading(false);
      };

      xhr.onerror = () => {
        setError('Upload failed');
        setUploading(false);
      };

      xhr.open('POST', '/api/upload');
      xhr.send(formData);
    } catch (error) {
      setError('Upload failed');
      setUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setError(null);
    setUploadProgress(0);
  };

  return (
    <Box>
      <input
        accept={accept}
        style={{ display: 'none' }}
        id="file-upload"
        type="file"
        onChange={handleFileChange}
        disabled={uploading}
      />
      
      <label htmlFor="file-upload">
        <Button
          variant="outlined"
          component="span"
          startIcon={<CloudUpload />}
          disabled={uploading}
          sx={{ mb: 2 }}
        >
          Choose File
        </Button>
      </label>

      {selectedFile && (
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" sx={{ flex: 1 }}>
              {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
            </Typography>
            <IconButton size="small" onClick={handleRemoveFile}>
              <Delete />
            </IconButton>
          </Box>
          
          {uploading && (
            <LinearProgress
              variant="determinate"
              value={uploadProgress}
              sx={{ mb: 1 }}
            />
          )}
          
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={uploading}
            size="small"
          >
            {uploading ? \`Uploading... \${Math.round(uploadProgress)}%\` : 'Upload'}
          </Button>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default FileUpload;`}
            />
          </CardContent>
        </Card>
      </section>

      <section id="drag-drop">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Drag & Drop Upload
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Drag & Drop Zone Component
            </Typography>
            <CodeBlock
              language="typescript"
              title="DragDropUpload.tsx"
              code={`import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip
} from '@mui/material';
import { CloudUpload, Delete } from '@mui/icons-material';

interface UploadFile {
  file: File;
  id: string;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  progress?: number;
}

interface DragDropUploadProps {
  accept?: string[];
  maxFiles?: number;
  maxSize?: number;
  onFilesChange?: (files: UploadFile[]) => void;
}

const DragDropUpload: React.FC<DragDropUploadProps> = ({
  accept = ['*/*'],
  maxFiles = 10,
  maxSize = 10,
  onFilesChange
}) => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      return \`File size must be less than \${maxSize}MB\`;
    }

    // Check file type if specific types are required
    if (!accept.includes('*/*')) {
      const fileType = file.type;
      const fileExtension = '.' + file.name.split('.').pop();
      
      const isValidType = accept.some(type => 
        fileType.match(type.replace('*', '.*')) || 
        type === fileExtension
      );
      
      if (!isValidType) {
        return 'File type not supported';
      }
    }

    return null;
  };

  const addFiles = useCallback((newFiles: FileList) => {
    const validFiles: UploadFile[] = [];
    
    Array.from(newFiles).forEach(file => {
      const error = validateFile(file);
      if (!error && files.length + validFiles.length < maxFiles) {
        validFiles.push({
          file,
          id: Date.now() + Math.random().toString(),
          status: 'pending'
        });
      }
    });

    if (validFiles.length > 0) {
      const updatedFiles = [...files, ...validFiles];
      setFiles(updatedFiles);
      onFilesChange?.(updatedFiles);
    }
  }, [files, maxFiles, maxSize, accept, onFilesChange]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = e.dataTransfer.files;
    addFiles(droppedFiles);
  }, [addFiles]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(e.target.files);
    }
  };

  const removeFile = (id: string) => {
    const updatedFiles = files.filter(file => file.id !== id);
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
  };

  const getStatusColor = (status: UploadFile['status']) => {
    switch (status) {
      case 'pending': return 'default';
      case 'uploading': return 'primary';
      case 'completed': return 'success';
      case 'error': return 'error';
    }
  };

  return (
    <Box>
      <Paper
        sx={{
          border: \`2px dashed \${isDragOver ? '#1976d2' : '#ccc'}\`,
          borderRadius: 2,
          p: 4,
          textAlign: 'center',
          backgroundColor: isDragOver ? 'rgba(25, 118, 210, 0.04)' : 'transparent',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CloudUpload sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
        
        <Typography variant="h6" sx={{ mb: 1 }}>
          Drag & drop files here
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          or click to select files
        </Typography>
        
        <input
          type="file"
          multiple
          style={{ display: 'none' }}
          id="file-input"
          onChange={handleFileInput}
          accept={accept.join(',')}
        />
        
        <label htmlFor="file-input">
          <Box component="span" sx={{ cursor: 'pointer' }}>
            Select Files
          </Box>
        </label>
        
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          Max {maxFiles} files, {maxSize}MB each
        </Typography>
      </Paper>

      {files.length > 0 && (
        <List sx={{ mt: 2 }}>
          {files.map((uploadFile) => (
            <ListItem key={uploadFile.id}>
              <ListItemText
                primary={uploadFile.file.name}
                secondary={\`\${(uploadFile.file.size / 1024 / 1024).toFixed(2)} MB\`}
              />
              <Chip
                label={uploadFile.status}
                color={getStatusColor(uploadFile.status)}
                size="small"
                sx={{ mr: 1 }}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => removeFile(uploadFile.id)}
                  size="small"
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default DragDropUpload;`}
            />
          </CardContent>
        </Card>
      </section>

      <section id="advanced-upload">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Advanced Upload Features
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Custom Upload Hook dengan Batch Processing
            </Typography>
            <CodeBlock
              language="typescript"
              title="useFileUpload.ts"
              code={`import { useState, useCallback } from 'react';

interface UploadConfig {
  endpoint: string;
  maxConcurrent?: number;
  chunkSize?: number;
  retryAttempts?: number;
}

interface UploadFile {
  file: File;
  id: string;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  progress: number;
  error?: string;
}

export const useFileUpload = (config: UploadConfig) => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const uploadSingleFile = async (uploadFile: UploadFile): Promise<void> => {
    const { file, id } = uploadFile;
    
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', file);

      const xhr = new XMLHttpRequest();

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          setFiles(prev => prev.map(f => 
            f.id === id ? { ...f, progress } : f
          ));
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setFiles(prev => prev.map(f => 
            f.id === id ? { ...f, status: 'completed', progress: 100 } : f
          ));
          resolve();
        } else {
          setFiles(prev => prev.map(f => 
            f.id === id ? { 
              ...f, 
              status: 'error', 
              error: 'Upload failed' 
            } : f
          ));
          reject(new Error('Upload failed'));
        }
      };

      xhr.onerror = () => {
        setFiles(prev => prev.map(f => 
          f.id === id ? { 
            ...f, 
            status: 'error', 
            error: 'Network error' 
          } : f
        ));
        reject(new Error('Network error'));
      };

      setFiles(prev => prev.map(f => 
        f.id === id ? { ...f, status: 'uploading' } : f
      ));

      xhr.open('POST', config.endpoint);
      xhr.send(formData);
    });
  };

  const uploadFiles = useCallback(async () => {
    setIsUploading(true);
    
    const pendingFiles = files.filter(f => f.status === 'pending');
    const maxConcurrent = config.maxConcurrent || 3;
    
    // Process files in batches
    for (let i = 0; i < pendingFiles.length; i += maxConcurrent) {
      const batch = pendingFiles.slice(i, i + maxConcurrent);
      
      await Promise.allSettled(
        batch.map(file => uploadSingleFile(file))
      );
    }
    
    setIsUploading(false);
  }, [files, config]);

  const addFiles = useCallback((newFiles: File[]) => {
    const uploadFiles: UploadFile[] = newFiles.map(file => ({
      file,
      id: Date.now() + Math.random().toString(),
      status: 'pending',
      progress: 0
    }));
    
    setFiles(prev => [...prev, ...uploadFiles]);
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setFiles(prev => prev.filter(f => f.status !== 'completed'));
  }, []);

  const retryFailed = useCallback(async () => {
    setFiles(prev => prev.map(f => 
      f.status === 'error' ? { ...f, status: 'pending', error: undefined } : f
    ));
    await uploadFiles();
  }, [uploadFiles]);

  const totalProgress = files.length > 0 
    ? files.reduce((sum, f) => sum + f.progress, 0) / files.length 
    : 0;

  return {
    files,
    isUploading,
    totalProgress,
    addFiles,
    removeFile,
    uploadFiles,
    clearCompleted,
    retryFailed,
    completedCount: files.filter(f => f.status === 'completed').length,
    failedCount: files.filter(f => f.status === 'error').length,
    pendingCount: files.filter(f => f.status === 'pending').length
  };
};

// Usage Example
const AdvancedFileUploader: React.FC = () => {
  const {
    files,
    isUploading,
    totalProgress,
    addFiles,
    uploadFiles,
    removeFile,
    clearCompleted,
    retryFailed
  } = useFileUpload({
    endpoint: '/api/upload',
    maxConcurrent: 3
  });

  return (
    <Box>
      <DragDropUpload onFilesChange={addFiles} />
      
      {files.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <LinearProgress 
            variant="determinate" 
            value={totalProgress} 
            sx={{ mb: 2 }}
          />
          
          <Stack direction="row" spacing={1}>
            <Button 
              variant="contained" 
              onClick={uploadFiles}
              disabled={isUploading}
            >
              Upload All
            </Button>
            <Button onClick={clearCompleted}>
              Clear Completed
            </Button>
            <Button onClick={retryFailed}>
              Retry Failed
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
};`}
            />

            <Alert severity="success" sx={{ mt: 2 }}>
              <strong>File Upload System Complete!</strong> Advanced upload system dengan batch processing, retry logic,
              dan progress tracking.
            </Alert>
          </CardContent>
        </Card>
      </section>
    </DocumentationPageLayout>
  );
};

export default FileUploadsPage;
