'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Collapse, Chip } from '@mui/material';
import { Icon } from '@iconify/react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import type { CodeExampleProps } from '@/documentation/types';

const CodeBlock = ({
  title,
  description,
  code,
  language = 'tsx',
  showCopy = true,
  expandable = false
}: CodeExampleProps) => {
  const [isExpanded, setIsExpanded] = useState(!expandable);
  const [isCopied, setIsCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState('');

  useEffect(() => {
    // For 'text' language, don't apply syntax highlighting
    if (language === 'text') {
      setHighlightedCode(code);
    } else {
      // Handle typescript as alias for ts
      const actualLanguage = language === 'typescript' ? 'ts' : language;
      const highlighted = Prism.highlight(
        code,
        Prism.languages[actualLanguage] || Prism.languages.javascript,
        actualLanguage
      );

      setHighlightedCode(highlighted);
    }
  }, [code, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        overflow: 'hidden',
        mb: 3
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          bgcolor: 'grey.50',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 0.5 }}>
              {title}
            </Typography>
            {description && (
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            )}
          </Box>
          <Chip
            label={language.toUpperCase()}
            size="small"
            variant="outlined"
            color={language === 'text' ? 'secondary' : 'default'}
            sx={{
              fontSize: '11px',
              height: '20px',
              fontWeight: 500
            }}
          />
        </Box>
        <Box display="flex" gap={1}>
          {showCopy && (
            <IconButton size="small" onClick={handleCopy} title="Copy code">
              <Icon icon={isCopied ? 'mdi:check' : 'mdi:content-copy'} width={16} height={16} />
            </IconButton>
          )}
          {expandable && (
            <IconButton size="small" onClick={() => setIsExpanded(!isExpanded)} title="Toggle code">
              <Icon icon={isExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'} width={16} height={16} />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* Code Content */}
      <Collapse in={isExpanded}>
        <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
          <Typography
            component="pre"
            sx={{
              m: 0,
              p: 2,
              bgcolor: language === 'text' ? '#f8f9fa' : '#fafafa',
              fontSize: '14px',
              lineHeight: '1.5',
              overflow: 'auto',
              fontFamily:
                language === 'text'
                  ? 'system-ui, -apple-system, sans-serif'
                  : 'Monaco, Consolas, "Courier New", monospace',
              color: language === 'text' ? '#2c3e50' : 'inherit'
            }}
          >
            <Typography
              component="code"
              className={language === 'text' ? '' : `language-${language}`}
              sx={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          </Typography>
        </Box>
      </Collapse>
    </Box>
  );
};

export default CodeBlock;
