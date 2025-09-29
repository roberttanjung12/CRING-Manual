'use client';

import { Typography, Alert, Card, CardContent, Stack, Chip } from '@mui/material';
import { CodeBlock } from '@/documentation/components';
import { DocumentationPageLayout } from '@/documentation/layouts/DocumentationLayout';

const UtilitiesPage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Utilities Overview' },
    { id: 'formatting', title: 'Formatting Utils' },
    { id: 'validation', title: 'Validation Utils' },
    { id: 'dev-tools', title: 'Development Tools' }
  ];

  return (
    <DocumentationPageLayout
      title="Utilities & Helpers"
      description="Utility functions dan development tools untuk CRING! Partner"
      tableOfContents={tableOfContents}
      navigation={{
        previous: {
          title: 'UI Recipes',
          href: '/cookbook/ui-recipes'
        }
      }}
    >
      <section id="overview">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Utilities Overview
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          Collection of utility functions dan development tools yang sering digunakan dalam pengembangan CRING! Portal
          Partner untuk formatting, validation, dan debugging.
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
          <Chip label="TypeScript" color="primary" variant="outlined" />
          <Chip label="Formatting" color="secondary" variant="outlined" />
          <Chip label="Validation" color="info" variant="outlined" />
          <Chip label="Dev Tools" color="success" variant="outlined" />
        </Stack>
      </section>

      <section id="formatting">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Format Utilities
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Currency dan Number Formatting
              </Typography>
              <CodeBlock
                language="typescript"
                title="src/utility/formatUtils.ts"
                code={`// Currency formatting untuk Rupiah
export const formatCurrency = (amount: number | null | undefined): string => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return 'Rp 0';
  }
  
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
};

// Number formatting dengan thousand separator
export const formatNumber = (
  num: number | null | undefined,
  decimals = 0
): string => {
  if (num === null || num === undefined || isNaN(num)) {
    return '0';
  }
  
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

// File size formatting
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return \`\${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} \${sizes[i]}\`;
};`}
              />
            </CardContent>
          </Card>
        </Stack>
      </section>

      <section id="validation">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Validation Utilities
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Common Validation Functions
            </Typography>
            <CodeBlock
              language="typescript"
              title="src/utility/validationUtils.ts"
              code={`// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email);
};

// Indonesian phone number validation
export const isValidPhoneNumber = (phone: string): boolean => {
  const cleaned = phone.replace(/\\D/g, '');
  const phoneRegex = /^(\\+62|62|0)8\\d{8,11}$/;
  return phoneRegex.test(cleaned);
};

// Password strength validation
export interface PasswordStrength {
  score: number;
  feedback: string[];
  isValid: boolean;
}

export const validatePasswordStrength = (password: string): PasswordStrength => {
  const feedback: string[] = [];
  let score = 0;
  
  if (password.length < 8) {
    feedback.push('Password minimal 8 karakter');
  } else {
    score += 1;
  }
  
  if (!/[a-z]/.test(password)) {
    feedback.push('Password harus mengandung huruf kecil');
  } else {
    score += 1;
  }
  
  if (!/[A-Z]/.test(password)) {
    feedback.push('Password harus mengandung huruf besar');
  } else {
    score += 1;
  }
  
  if (!/\\d/.test(password)) {
    feedback.push('Password harus mengandung angka');
  } else {
    score += 1;
  }
  
  return {
    score,
    feedback,
    isValid: score >= 4
  };
};`}
            />
          </CardContent>
        </Card>
      </section>

      <section id="dev-tools">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Development Tools
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Debugging dan Logging Utilities
            </Typography>
            <CodeBlock
              language="typescript"
              title="src/utility/devUtils.ts"
              code={`// Enhanced console logging
export const logger = {
  info: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(\`🟦 INFO: \${message}\`, data || '');
    }
  },
  
  warn: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(\`🟨 WARN: \${message}\`, data || '');
    }
  },
  
  error: (message: string, error?: any) => {
    console.error(\`🟥 ERROR: \${message}\`, error || '');
  },
  
  debug: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(\`🟪 DEBUG: \${message}\`, data || '');
    }
  }
};

// Local storage helpers with error handling
export const storage = {
  set: (key: string, value: any): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      logger.error(\`Failed to save to localStorage: \${key}\`, error);
      return false;
    }
  },
  
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch (error) {
      logger.error(\`Failed to read from localStorage: \${key}\`, error);
      return defaultValue || null;
    }
  },
  
  remove: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      logger.error(\`Failed to remove from localStorage: \${key}\`, error);
      return false;
    }
  }
};

// Generate random ID
export const generateId = (length = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};`}
            />

            <Alert severity="success" sx={{ mt: 2 }}>
              <strong>Utilities Complete!</strong> Collection of utility functions untuk formatting, validation, dan
              development tools siap digunakan.
            </Alert>
          </CardContent>
        </Card>
      </section>

      {/* CRING Production Utilities */}
      <section id="cring-production-utilities">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          CRING Production Utilities
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          Utility functions yang benar-benar digunakan dalam production CRING! Partner berdasarkan references:
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Date & Time Formatting (moment.js)
              </Typography>
              <CodeBlock
                language="typescript"
                title="src/utility/format-date-time.ts"
                code={`import moment, { type Moment } from 'moment';

/**
 * Converts ISO date string to Indonesian locale date (DD/MM/YYYY)
 * Handles "zero" dates and invalid inputs
 */
export const getLocaleDate = (isoDateString: string): string => {
  if (!isoDateString || isoDateString === '0001-01-01T00:00:00Z') {
    return '-';
  }

  try {
    const date = new Date(isoDateString);
    if (isNaN(date.getTime())) return '';

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };

    return date.toLocaleDateString('id-ID', options);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

/**
 * Converts ISO date string to time format (HH:MM:SS)
 */
export const getLocaleTime = (isoDateString: string): string => {
  if (!isoDateString || isoDateString === '0001-01-01T00:00:00Z') {
    return '-';
  }

  try {
    const date = new Date(isoDateString);
    if (isNaN(date.getTime())) return '';

    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };

    return date.toLocaleTimeString('en-US', options);
  } catch (error) {
    console.error('Error formatting time:', error);
    return '';
  }
};

/**
 * Formats date using moment.js with flexible format
 */
export const formatDate = (
  dateInput: string | Date | Moment,
  format: string = 'DD-MM-YYYY',
  emptyChar: string = ''
): string => {
  const parsedDate = moment(dateInput);
  if (!parsedDate.isValid()) return emptyChar;

  try {
    return parsedDate.format(format);
  } catch (error) {
    console.error('Error formatting date:', error);
    return emptyChar;
  }
};`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Number Validation (Digits Only)
              </Typography>
              <CodeBlock
                language="typescript"
                title="src/utility/validations/digitsOnly.ts"
                code={`/**
 * Validation for digits-only input
 * Used throughout CRING for numeric fields like merchant IDs, phone numbers, etc.
 */
const validationDigitOnly = (value?: number | string): boolean => {
  let set = true;
  const newValue = value ? String(value) : '';

  if (newValue || newValue === '0') {
    if (!/^\\d+$/.test(newValue)) set = false;
  }

  return set;
};

export default validationDigitOnly;

// Usage example:
const MerchantIdInput = () => {
  const [merchantId, setMerchantId] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (validationDigitOnly(value) || value === '') {
      setMerchantId(value);
    }
  };
  
  return (
    <TextField
      value={merchantId}
      onChange={handleChange}
      label="Merchant ID"
      placeholder="Enter digits only"
    />
  );
};`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Locale Number Formatting
              </Typography>
              <CodeBlock
                language="typescript"
                title="src/utility/locale-to-number.ts"
                code={`/**
 * Convert locale-formatted number string back to number
 * Handles Indonesian number format (1.234.567,89)
 */
export const localeToNumber = (localeString: string): number => {
  // Remove thousand separators (dots) and replace comma with dot for decimal
  const normalizedString = localeString
    .replace(/\\./g, '') // Remove dots (thousand separators)
    .replace(/,/g, '.'); // Replace comma with dot for decimal

  return parseFloat(normalizedString) || 0;
};

/**
 * Format number to Indonesian locale string
 */
export const numberToLocale = (
  number: number,
  minimumFractionDigits = 0,
  maximumFractionDigits = 2
): string => {
  return number.toLocaleString('id-ID', {
    minimumFractionDigits,
    maximumFractionDigits
  });
};

// Usage in amount input components:
const AmountInput = () => {
  const [displayValue, setDisplayValue] = useState('');
  const [actualValue, setActualValue] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = localeToNumber(inputValue);
    
    setActualValue(numericValue);
    setDisplayValue(numberToLocale(numericValue));
  };

  return (
    <TextField
      value={displayValue}
      onChange={handleChange}
      label="Amount"
      placeholder="0"
    />
  );
};`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Multi-Session Detection
              </Typography>
              <CodeBlock
                language="js"
                title="src/utility/is-multi-session.js"
                code={`/**
 * Detects multi-session login and handles session conflicts
 * Critical security utility used in all API calls
 */
const isMultiSession = (response, shouldRedirect = false) => {
  if (response && response.status === 403) {
    const message = response.data?.message?.toLowerCase();
    
    if (message && message.includes('sesi anda di perangkat ini telah berakhir')) {
      // Handle multi-session scenario
      localStorage.clear(); // Clear all local data
      
      if (shouldRedirect) {
        // Redirect to login with message
        window.location.href = '/login?reason=multisession';
      }
      
      return true;
    }
  }
  
  return false;
};

export default isMultiSession;

// Usage in service layer:
// This utility is automatically called in all API error handlers
// to detect when user has logged in from another device`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Local Storage Enhanced
              </Typography>
              <CodeBlock
                language="typescript"
                title="src/utility/local-storage.ts"
                code={`/**
 * Enhanced localStorage utilities with encryption and validation
 */

// Get valid access token with expiry check
export const getValidAccessToken = (): string | null => {
  try {
    const token = localStorage.getItem('accessToken');
    const expiry = localStorage.getItem('tokenExpiry');
    
    if (!token || !expiry) return null;
    
    if (Date.now() > parseInt(expiry)) {
      // Token expired, clear storage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('tokenExpiry');
      return null;
    }
    
    return token;
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
};

// Set token with expiry
export const setAccessToken = (token: string, expiresIn: number): void => {
  try {
    const expiryTime = Date.now() + (expiresIn * 1000);
    localStorage.setItem('accessToken', token);
    localStorage.setItem('tokenExpiry', expiryTime.toString());
  } catch (error) {
    console.error('Error setting access token:', error);
  }
};

// Safe JSON operations
export const getStorageJson = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(\`Error parsing JSON from localStorage[\${key}]:\`, error);
    return defaultValue;
  }
};

export const setStorageJson = (key: string, value: any): boolean => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(\`Error saving JSON to localStorage[\${key}]:\`, error);
    return false;
  }
};`}
              />
            </CardContent>
          </Card>
        </Stack>

        <Alert severity="info" sx={{ mt: 4 }}>
          <strong>Production Utilities:</strong> Utilities ini adalah adaptasi dari implementation sebenarnya di CRING!
          Portal Partner. Perhatikan keamanan dan error handling yang sudah diimplementasikan.
        </Alert>
      </section>
    </DocumentationPageLayout>
  );
};

export default UtilitiesPage;
