/**
 * Interactive Component Playground
 *
 * Memungkinkan user untuk berinteraksi dengan components secara real-time,
 * mengubah props, dan melihat generated code untuk setiap konfigurasi.
 */

'use client';

import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Tabs,
  Tab,
  TextField,
  Switch,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Stack,
  Chip,
  Divider,
  Alert
} from '@mui/material';
import { Icon } from '@iconify/react';
import CodeBlock from '@/documentation/components/CodeBlock';

interface PlaygroundProps {
  componentName: string;
  component: React.ComponentType<any>;
  defaultProps: Record<string, any>;
  propTypes: Record<
    string,
    {
      type: 'string' | 'number' | 'boolean' | 'select' | 'object';
      options?: string[];
      description?: string;
      defaultValue?: any;
    }
  >;
  examples?: Array<{
    name: string;
    props: Record<string, any>;
    description: string;
  }>;
  codeTemplate?: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

const ComponentPlayground: React.FC<PlaygroundProps> = ({
  componentName,
  component: Component,
  defaultProps,
  propTypes,
  examples = [],
  codeTemplate
}) => {
  const [currentProps, setCurrentProps] = useState<Record<string, any>>(defaultProps);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedExample, setSelectedExample] = useState<string>('');

  // Generate code based on current props
  const generatedCode = useMemo(() => {
    if (codeTemplate) {
      let code = codeTemplate;

      Object.entries(currentProps).forEach(([key, value]) => {
        const placeholder = `{{${key}}}`;
        let formattedValue = value;

        if (typeof value === 'string') {
          formattedValue = `"${value}"`;
        } else if (typeof value === 'object') {
          formattedValue = JSON.stringify(value, null, 2);
        }

        code = code.replace(new RegExp(placeholder, 'g'), formattedValue);
      });

      return code;
    }

    // Default code generation
    const propsString = Object.entries(currentProps)
      .filter(([, value]) => value !== null && value !== undefined && value !== '')
      .map(([key, value]) => {
        if (typeof value === 'string') {
          return `  ${key}="${value}"`;
        } else if (typeof value === 'boolean') {
          return value ? `  ${key}` : '';
        } else if (typeof value === 'object') {
          return `  ${key}={${JSON.stringify(value)}}`;
        } else {
          return `  ${key}={${value}}`;
        }
      })
      .filter(Boolean)
      .join('\n');

    return `<${componentName}${propsString ? '\n' + propsString + '\n' : ' '}/>`;
  }, [componentName, currentProps, codeTemplate]);

  const updateProp = (key: string, value: any) => {
    setCurrentProps(prev => ({ ...prev, [key]: value }));
  };

  const loadExample = (exampleName: string) => {
    const example = examples.find(ex => ex.name === exampleName);

    if (example) {
      setCurrentProps({ ...defaultProps, ...example.props });
      setSelectedExample(exampleName);
    }
  };

  const resetProps = () => {
    setCurrentProps(defaultProps);
    setSelectedExample('');
  };

  const renderPropControl = (propKey: string, propConfig: any) => {
    const value = currentProps[propKey];

    switch (propConfig.type) {
      case 'string':
        return (
          <TextField
            fullWidth
            label={propKey}
            value={value || ''}
            onChange={e => updateProp(propKey, e.target.value)}
            helperText={propConfig.description}
            size="small"
            variant="outlined"
          />
        );

      case 'number':
        return (
          <TextField
            fullWidth
            type="number"
            label={propKey}
            value={value || 0}
            onChange={e => updateProp(propKey, Number(e.target.value))}
            helperText={propConfig.description}
            size="small"
            variant="outlined"
          />
        );

      case 'boolean':
        return (
          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {propKey}
            </Typography>
            <Switch checked={Boolean(value)} onChange={e => updateProp(propKey, e.target.checked)} />
            {propConfig.description && (
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                {propConfig.description}
              </Typography>
            )}
          </Box>
        );

      case 'select':
        return (
          <FormControl fullWidth size="small">
            <InputLabel>{propKey}</InputLabel>
            <Select value={value || ''} onChange={e => updateProp(propKey, e.target.value)} label={propKey}>
              {propConfig.options?.map((option: string) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            {propConfig.description && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                {propConfig.description}
              </Typography>
            )}
          </FormControl>
        );

      case 'object':
        return (
          <TextField
            fullWidth
            multiline
            rows={3}
            label={propKey}
            value={JSON.stringify(value, null, 2)}
            onChange={e => {
              try {
                const parsed = JSON.parse(e.target.value);

                updateProp(propKey, parsed);
              } catch {
                // Invalid JSON, don't update
              }
            }}
            helperText={propConfig.description}
            size="small"
            variant="outlined"
          />
        );

      default:
        return null;
    }
  };

  return (
    <Card sx={{ mb: 4, border: '1px solid', borderColor: 'divider' }}>
      <CardContent sx={{ p: 0 }}>
        {/* Header */}
        <Box sx={{ p: 3, pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={1}>
              <Icon icon="game-icons:juggler" width={24} height={24} />
              <Typography variant="h6" fontWeight={600}>
                {componentName} Playground
              </Typography>
              <Chip label="Interactive" size="small" color="primary" variant="outlined" />
            </Stack>

            <Stack direction="row" spacing={1}>
              {examples.length > 0 && (
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select value={selectedExample} onChange={e => loadExample(e.target.value)} displayEmpty>
                    <MenuItem value="">
                      <em>Load Example</em>
                    </MenuItem>
                    {examples.map(example => (
                      <MenuItem key={example.name} value={example.name}>
                        {example.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              <Button variant="outlined" size="small" onClick={resetProps} startIcon={<Icon icon="refresh" />}>
                Reset
              </Button>
            </Stack>
          </Stack>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
            <Tab label="Preview" icon={<Icon icon="eye" width={16} height={16} />} iconPosition="start" />
            <Tab label="Props" icon={<Icon icon="settings" width={16} height={16} />} iconPosition="start" />
            <Tab label="Code" icon={<Icon icon="code" width={16} height={16} />} iconPosition="start" />
          </Tabs>
        </Box>

        {/* Preview Tab */}
        <TabPanel value={activeTab} index={0}>
          <Box sx={{ p: 3 }}>
            <Alert severity="info" sx={{ mb: 3 }}>
              <strong>Live Preview:</strong> Interact with the component below. Changes in props will update the preview
              in real-time.
            </Alert>

            <Box
              sx={{
                p: 4,
                border: '2px dashed',
                borderColor: 'divider',
                borderRadius: 2,
                backgroundColor: 'background.default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 200
              }}
            >
              <Component {...currentProps} />
            </Box>

            {selectedExample && (
              <Box sx={{ mt: 2, p: 2, backgroundColor: 'action.hover', borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Current Example: {selectedExample}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {examples.find(ex => ex.name === selectedExample)?.description}
                </Typography>
              </Box>
            )}
          </Box>
        </TabPanel>

        {/* Props Tab */}
        <TabPanel value={activeTab} index={1}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Component Properties
            </Typography>

            <Grid container spacing={3}>
              {Object.entries(propTypes).map(([propKey, propConfig]) => (
                <Grid key={propKey} size={{ xs: 12, sm: 6, md: 4 }}>
                  {renderPropControl(propKey, propConfig)}
                </Grid>
              ))}
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="subtitle2" gutterBottom>
              Current Props Object:
            </Typography>
            <CodeBlock language="json" code={JSON.stringify(currentProps, null, 2)} title="Current Props" />
          </Box>
        </TabPanel>

        {/* Code Tab */}
        <TabPanel value={activeTab} index={2}>
          <Box sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
              <Typography variant="h6">Generated Code</Typography>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Icon icon="copy" />}
                onClick={() => {
                  navigator.clipboard.writeText(generatedCode);
                }}
              >
                Copy Code
              </Button>
            </Stack>

            <Alert severity="success" sx={{ mb: 2 }}>
              <strong>Ready to Use:</strong> Copy this code and paste it directly into your component.
            </Alert>

            <CodeBlock language="tsx" code={generatedCode} title={`${componentName} Implementation`} />

            {/* Import statement */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Import Statement:
              </Typography>
              <CodeBlock
                language="tsx"
                code={`import ${componentName} from '@/components/${componentName}';`}
                title="Import"
              />
            </Box>
          </Box>
        </TabPanel>
      </CardContent>
    </Card>
  );
};

export default ComponentPlayground;
