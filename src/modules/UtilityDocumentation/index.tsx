'use client';

import { Typography, Alert, Card, CardContent, Chip, Stack } from '@mui/material';
import { Icon } from '@iconify/react';
import { CodeBlock, ExampleSection } from '@/documentation/components';
import { DocumentationPageLayout } from '@/documentation/layouts/DocumentationLayout';

const UtilityDocumentationPage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Overview & Kegunaan' },
    { id: 'quick-start', title: 'Quick Start' },
    { id: 'string-utils', title: 'String Utilities' },
    { id: 'date-utils', title: 'Date Utilities' },
    { id: 'validation-utils', title: 'Validation Utilities' },
    { id: 'formatting-utils', title: 'Formatting Utilities' },
    { id: 'best-practices', title: 'Best Practices' }
  ];

  return (
    <DocumentationPageLayout
      title="Utility Functions"
      description="Helper functions untuk string manipulation, formatting, validation, dan common operations"
      tableOfContents={tableOfContents}
      navigation={{
        previous: {
          title: 'Types System',
          href: '/types/overview'
        },
        next: {
          title: 'Features Overview',
          href: '/features/overview'
        }
      }}
    >
      {/* Overview & Kegunaan */}
      <section id="overview">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Overview & Kegunaan
        </Typography>

        <Alert severity="success" sx={{ mb: 3 }}>
          <strong>Utility Functions</strong> menyediakan helper functions yang tested dan reusable untuk operasi-operasi
          common seperti formatting, validation, dan data manipulation.
        </Alert>

        <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
          Utilities dirancang untuk:
        </Typography>

        <Stack spacing={2} sx={{ mb: 4 }}>
          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Icon icon="tools" style={{ fontSize: '1.5rem', color: '#4caf50' }} />
                <div>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    🛠️ DRY Principle
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Avoid code duplication dengan reusable helper functions
                  </Typography>
                </div>
              </Stack>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Icon icon="check-circle" style={{ fontSize: '1.5rem', color: '#2196f3' }} />
                <div>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    ✅ Tested & Reliable
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Unit tested functions dengan proper error handling
                  </Typography>
                </div>
              </Stack>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Icon icon="lightning-bolt" style={{ fontSize: '1.5rem', color: '#ff9800' }} />
                <div>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    ⚡ Performance Optimized
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Optimized algorithms dengan consistent performance
                  </Typography>
                </div>
              </Stack>
            </CardContent>
          </Card>
        </Stack>

        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 4 }}>
          <Chip label="Pure Functions" color="primary" size="small" />
          <Chip label="Type Safe" color="secondary" size="small" />
          <Chip label="Unit Tested" color="info" size="small" />
          <Chip label="Tree Shakeable" color="success" size="small" />
          <Chip label="Zero Dependencies" color="warning" size="small" />
        </Stack>
      </section>

      {/* Quick Start */}
      <section id="quick-start">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Quick Start
        </Typography>

        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
          Cara menggunakan utility functions:
        </Typography>

        <CodeBlock
          language="typescript"
          title="1. Import utilities yang dibutuhkan"
          code={`// String utilities
import { capitalize, truncate, slugify } from '@/utility/string';

// Date utilities  
import { formatDate, parseDate, isDateValid } from '@/utility/date';

// Validation utilities
import { isEmail, isPhoneNumber, isValidPassword } from '@/utility/validation';

// Formatting utilities
import { formatCurrency, formatNumber, formatBytes } from '@/utility/format';`}
        />

        <CodeBlock
          language="typescript"
          title="2. Gunakan dalam component/function"
          code={`const UserProfile = ({ user }: { user: User }) => {
  return (
    <Card>
      <CardHeader 
        title={capitalize(user.name)}
        subheader={formatDate(user.createdAt, 'DD MMM YYYY')}
      />
      <CardContent>
        <Typography variant="body2">
          {truncate(user.bio, 100)}
        </Typography>
        
        <Typography variant="caption" color="text.secondary">
          Last login: {formatDate(user.lastLoginAt, 'relative')}
        </Typography>
        
        <Chip 
          label={formatNumber(user.totalTransactions)} 
          size="small"
          color="info"
        />
      </CardContent>
    </Card>
  );
};`}
        />

        <Alert severity="info" sx={{ mt: 3 }}>
          <strong>💡 Tip:</strong> Semua utility functions sudah handle edge cases dan null/undefined values. Safe untuk
          digunakan tanpa additional checks!
        </Alert>
      </section>

      {/* String Utilities */}
      <section id="string-utils">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          String Utilities
        </Typography>

        <ExampleSection
          id="string-manipulation"
          title="String Manipulation Functions"
          description="Functions untuk manipulasi string yang commonly needed"
        >
          <CodeBlock
            language="typescript"
            title="@/utility/string.ts - String Functions"
            code={`// Capitalize first letter of each word
export const capitalize = (str: string | null | undefined): string => {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Truncate string with ellipsis
export const truncate = (
  str: string | null | undefined, 
  length: number = 50,
  suffix: string = '...'
): string => {
  if (!str) return '';
  if (str.length <= length) return str;
  return str.substring(0, length).trim() + suffix;
};

// Create URL-friendly slug
export const slugify = (str: string | null | undefined): string => {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\\w\\s-]/g, '') // Remove special characters
    .replace(/[\\s_-]+/g, '-')  // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '');   // Remove leading/trailing hyphens
};

// Remove HTML tags
export const stripHtml = (html: string | null | undefined): string => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '');
};

// Extract initials from name
export const getInitials = (name: string | null | undefined): string => {
  if (!name) return '';
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2) // Max 2 initials
    .join('');
};

// Mask sensitive data
export const maskString = (
  str: string | null | undefined,
  start: number = 0,
  end: number = 4,
  maskChar: string = '*'
): string => {
  if (!str) return '';
  if (str.length <= start + end) return str;
  
  const startPart = str.substring(0, start);
  const endPart = str.substring(str.length - end);
  const maskLength = str.length - start - end;
  
  return startPart + maskChar.repeat(maskLength) + endPart;
};`}
          />

          <CodeBlock
            language="typescript"
            title="Cara Menggunakan - String Utils"
            code={`const UserCard = ({ user }: { user: User }) => {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            {getInitials(user.name)}
          </Avatar>
        }
        title={capitalize(user.name)}
        subheader={truncate(user.bio, 80)}
      />
      
      <CardContent>
        <Typography variant="body2" gutterBottom>
          Username: @{slugify(user.name)}
        </Typography>
        
        <Typography variant="body2" gutterBottom>
          Email: {maskString(user.email, 2, 10)}
        </Typography>
        
        <Typography variant="body2">
          Description: {stripHtml(user.description)}
        </Typography>
      </CardContent>
    </Card>
  );
};

// Usage dalam form validation
const validateUsername = (username: string): string | null => {
  const slug = slugify(username);
  if (slug.length < 3) {
    return 'Username must be at least 3 characters';
  }
  return null;
};`}
          />
        </ExampleSection>
      </section>

      {/* Date Utilities */}
      <section id="date-utils">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Date Utilities
        </Typography>

        <ExampleSection
          id="date-formatting"
          title="Date Formatting & Manipulation"
          description="Functions untuk handling dates dengan format yang konsisten"
        >
          <CodeBlock
            language="typescript"
            title="@/utility/date.ts - Date Functions"
            code={`// Format date with various options
export const formatDate = (
  date: string | Date | null | undefined,
  format: 'full' | 'short' | 'time' | 'relative' | string = 'short'
): string => {
  if (!date) return '-';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (!isDateValid(dateObj)) return 'Invalid Date';
  
  const now = new Date();
  const diff = now.getTime() - dateObj.getTime();
  
  switch (format) {
    case 'full':
      return dateObj.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
    case 'short':
      return dateObj.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      
    case 'time':
      return dateObj.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
      });
      
    case 'relative':
      return getRelativeTime(diff);
      
    default:
      // Custom format using moment.js patterns
      return formatWithPattern(dateObj, format);
  }
};

// Get relative time (e.g., "2 minutes ago")
export const getRelativeTime = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return \`\${days} hari yang lalu\`;
  if (hours > 0) return \`\${hours} jam yang lalu\`;
  if (minutes > 0) return \`\${minutes} menit yang lalu\`;
  return 'Baru saja';
};

// Validate if date is valid
export const isDateValid = (date: any): date is Date => {
  return date instanceof Date && !isNaN(date.getTime());
};

// Parse various date formats
export const parseDate = (dateString: string | null | undefined): Date | null => {
  if (!dateString) return null;
  
  const date = new Date(dateString);
  return isDateValid(date) ? date : null;
};

// Get date range
export const getDateRange = (
  startDate: Date,
  endDate: Date
): { start: Date; end: Date; days: number } => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return { start, end, days };
};

// Check if date is today
export const isToday = (date: string | Date | null | undefined): boolean => {
  if (!date) return false;
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (!isDateValid(dateObj)) return false;
  
  const today = new Date();
  return dateObj.toDateString() === today.toDateString();
};`}
          />

          <CodeBlock
            language="typescript"
            title="Cara Menggunakan - Date Utils"
            code={`const TransactionList = ({ transactions }: { transactions: Transaction[] }) => {
  const groupedByDate = transactions.reduce((acc, transaction) => {
    const date = formatDate(transaction.createdAt, 'short');
    if (!acc[date]) acc[date] = [];
    acc[date].push(transaction);
    return acc;
  }, {} as Record<string, Transaction[]>);
  
  return (
    <List>
      {Object.entries(groupedByDate).map(([date, items]) => (
        <div key={date}>
          <ListSubheader>
            {isToday(date) ? 'Today' : date}
          </ListSubheader>
          
          {items.map(transaction => (
            <ListItem key={transaction.id}>
              <ListItemText
                primary={transaction.description}
                secondary={
                  <Stack direction="row" spacing={2}>
                    <span>{formatDate(transaction.createdAt, 'time')}</span>
                    <span>{formatDate(transaction.createdAt, 'relative')}</span>
                  </Stack>
                }
              />
            </ListItem>
          ))}
        </div>
      ))}
    </List>
  );
};

// Usage dalam date picker
const DateRangeSelector = () => {
  const [range, setRange] = useState<{ start: Date; end: Date } | null>(null);
  
  const handleRangeChange = (start: Date, end: Date) => {
    const { days } = getDateRange(start, end);
    
    if (days > 365) {
      alert('Date range cannot exceed 1 year');
      return;
    }
    
    setRange({ start, end });
  };
  
  return (
    <DateRangePicker
      start={range?.start}
      end={range?.end}
      onSet={handleRangeChange}
      onDelete={() => setRange(null)}
    />
  );
};`}
          />
        </ExampleSection>
      </section>

      {/* Validation Utilities */}
      <section id="validation-utils">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Validation Utilities
        </Typography>

        <ExampleSection
          id="validation-functions"
          title="Input Validation Functions"
          description="Functions untuk validating user input dan data integrity"
        >
          <CodeBlock
            language="typescript"
            title="@/utility/validation.ts - Validation Functions"
            code={`// Email validation
export const isEmail = (email: string | null | undefined): boolean => {
  if (!email) return false;
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email.trim());
};

// Phone number validation (Indonesian format)
export const isPhoneNumber = (phone: string | null | undefined): boolean => {
  if (!phone) return false;
  // Support formats: +62xxx, 08xxx, 62xxx
  const phoneRegex = /^(\\+62|62|0)8[1-9][0-9]{6,9}$/;
  return phoneRegex.test(phone.replace(/[\\s-]/g, ''));
};

// Password strength validation
export const isValidPassword = (password: string | null | undefined): {
  isValid: boolean;
  score: number;
  feedback: string[];
} => {
  if (!password) {
    return { isValid: false, score: 0, feedback: ['Password is required'] };
  }
  
  const feedback: string[] = [];
  let score = 0;
  
  // Length check
  if (password.length >= 8) score += 1;
  else feedback.push('At least 8 characters');
  
  // Lowercase check
  if (/[a-z]/.test(password)) score += 1;
  else feedback.push('Include lowercase letters');
  
  // Uppercase check
  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push('Include uppercase letters');
  
  // Number check
  if (/\\d/.test(password)) score += 1;
  else feedback.push('Include numbers');
  
  // Special character check
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
  else feedback.push('Include special characters');
  
  return {
    isValid: score >= 4,
    score,
    feedback: score >= 4 ? [] : feedback
  };
};

// Indonesian NIK validation
export const isValidNIK = (nik: string | null | undefined): boolean => {
  if (!nik) return false;
  
  // NIK should be 16 digits
  if (!/^\\d{16}$/.test(nik)) return false;
  
  // Basic format validation
  const province = nik.substring(0, 2);
  const regency = nik.substring(2, 4);
  const district = nik.substring(4, 6);
  const birthDate = nik.substring(6, 12);
  
  // Check if province code is valid (01-94)
  const provinceCode = parseInt(province);
  if (provinceCode < 1 || provinceCode > 94) return false;
  
  // Check birth date format (DDMMYY)
  const day = parseInt(birthDate.substring(0, 2));
  const month = parseInt(birthDate.substring(2, 4));
  const year = parseInt(birthDate.substring(4, 6));
  
  // For females, day is added by 40
  const actualDay = day > 40 ? day - 40 : day;
  
  if (actualDay < 1 || actualDay > 31) return false;
  if (month < 1 || month > 12) return false;
  
  return true;
};

// URL validation
export const isValidURL = (url: string | null | undefined): boolean => {
  if (!url) return false;
  
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Credit card number validation (Luhn algorithm)
export const isValidCreditCard = (cardNumber: string | null | undefined): boolean => {
  if (!cardNumber) return false;
  
  const cleaned = cardNumber.replace(/\\s/g, '');
  if (!/^\\d+$/.test(cleaned)) return false;
  
  let sum = 0;
  let isEven = false;
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i));
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};`}
          />

          <CodeBlock
            language="typescript"
            title="Cara Menggunakan - Validation"
            code={`// Dalam form validation
const useFormValidation = (initialData: any) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validateField = (name: string, value: any): string | null => {
    switch (name) {
      case 'email':
        if (!isEmail(value)) {
          return 'Please enter a valid email address';
        }
        break;
        
      case 'phone':
        if (!isPhoneNumber(value)) {
          return 'Please enter a valid Indonesian phone number';
        }
        break;
        
      case 'password':
        const validation = isValidPassword(value);
        if (!validation.isValid) {
          return validation.feedback.join(', ');
        }
        break;
        
      case 'nik':
        if (!isValidNIK(value)) {
          return 'Please enter a valid NIK';
        }
        break;
        
      case 'website':
        if (value && !isValidURL(value)) {
          return 'Please enter a valid URL';
        }
        break;
    }
    
    return null;
  };
  
  const validate = (data: any): boolean => {
    const newErrors: Record<string, string> = {};
    
    Object.keys(data).forEach(key => {
      const error = validateField(key, data[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  return { errors, validate, validateField };
};

// Usage dalam component
const UserForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    nik: ''
  });
  
  const { errors, validate } = useFormValidation(formData);
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (validate(formData)) {
      // Form is valid, proceed with submission
      console.log('Form submitted:', formData);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="email"
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        error={!!errors.email}
        helperText={errors.email}
        label="Email"
        fullWidth
        sx={{ mb: 2 }}
      />
      
      <TextField
        name="phone"
        value={formData.phone}
        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
        error={!!errors.phone}
        helperText={errors.phone}
        label="Phone Number"
        fullWidth
        sx={{ mb: 2 }}
      />
      
      <Button type="submit" variant="contained" fullWidth>
        Submit
      </Button>
    </form>
  );
};`}
          />
        </ExampleSection>
      </section>

      {/* Formatting Utilities */}
      <section id="formatting-utils">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Formatting Utilities
        </Typography>

        <ExampleSection
          id="format-functions"
          title="Number & Currency Formatting"
          description="Functions untuk formatting numbers, currency, dan file sizes"
        >
          <CodeBlock
            language="typescript"
            title="@/utility/format.ts - Formatting Functions"
            code={`// Currency formatting (Indonesian Rupiah)
export const formatCurrency = (
  amount: number | string | null | undefined,
  options: {
    currency?: string;
    locale?: string;
    showSymbol?: boolean;
    minimumFractionDigits?: number;
  } = {}
): string => {
  if (amount === null || amount === undefined || amount === '') return '-';
  
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(numericAmount)) return '-';
  
  const {
    currency = 'IDR',
    locale = 'id-ID',
    showSymbol = true,
    minimumFractionDigits = 0
  } = options;
  
  if (showSymbol) {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits
    }).format(numericAmount);
  }
  
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits
  }).format(numericAmount);
};

// Number formatting with thousands separator
export const formatNumber = (
  value: number | string | null | undefined,
  options: {
    locale?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  } = {}
): string => {
  if (value === null || value === undefined || value === '') return '-';
  
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(numericValue)) return '-';
  
  const {
    locale = 'id-ID',
    minimumFractionDigits = 0,
    maximumFractionDigits = 2
  } = options;
  
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits
  }).format(numericValue);
};

// Percentage formatting
export const formatPercentage = (
  value: number | string | null | undefined,
  decimals: number = 1
): string => {
  if (value === null || value === undefined || value === '') return '-';
  
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(numericValue)) return '-';
  
  return \`\${numericValue.toFixed(decimals)}%\`;
};

// File size formatting
export const formatBytes = (
  bytes: number | string | null | undefined,
  decimals: number = 2
): string => {
  if (bytes === null || bytes === undefined || bytes === '') return '-';
  
  const numericBytes = typeof bytes === 'string' ? parseFloat(bytes) : bytes;
  if (isNaN(numericBytes) || numericBytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(numericBytes) / Math.log(k));
  
  return \`\${parseFloat((numericBytes / Math.pow(k, i)).toFixed(decimals))} \${sizes[i]}\`;
};

// Phone number formatting (Indonesian)
export const formatPhoneNumber = (
  phone: string | null | undefined
): string => {
  if (!phone) return '-';
  
  const cleaned = phone.replace(/\\D/g, '');
  
  // Convert to +62 format
  if (cleaned.startsWith('0')) {
    return \`+62 \${cleaned.substring(1)}\`;
  } else if (cleaned.startsWith('62')) {
    return \`+\${cleaned}\`;
  } else if (cleaned.startsWith('8')) {
    return \`+62 \${cleaned}\`;
  }
  
  return phone;
};

// Bank account number masking
export const formatAccountNumber = (
  accountNumber: string | null | undefined
): string => {
  if (!accountNumber) return '-';
  
  if (accountNumber.length <= 8) return accountNumber;
  
  const start = accountNumber.substring(0, 4);
  const end = accountNumber.substring(accountNumber.length - 4);
  const middle = '*'.repeat(accountNumber.length - 8);
  
  return \`\${start}\${middle}\${end}\`;
};`}
          />

          <CodeBlock
            language="typescript"
            title="Cara Menggunakan - Formatting"
            code={`// Dalam transaction list
const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  return (
    <ListItem>
      <ListItemText
        primary={transaction.description}
        secondary={
          <Stack spacing={1}>
            <Typography variant="caption">
              {formatDate(transaction.createdAt, 'full')}
            </Typography>
            <Typography variant="caption">
              Account: {formatAccountNumber(transaction.accountNumber)}
            </Typography>
          </Stack>
        }
      />
      
      <ListItemSecondaryAction>
        <Stack alignItems="flex-end" spacing={0.5}>
          <Typography 
            variant="body1" 
            color={transaction.type === 'credit' ? 'success.main' : 'error.main'}
          >
            {transaction.type === 'credit' ? '+' : '-'}
            {formatCurrency(transaction.amount)}
          </Typography>
          
          <Typography variant="caption" color="text.secondary">
            Fee: {formatCurrency(transaction.fee)}
          </Typography>
        </Stack>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

// Dalam dashboard statistics
const StatCard = ({ title, value, suffix, trend }: {
  title: string;
  value: number;
  suffix?: string;
  trend?: number;
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        
        <Typography variant="h4">
          {suffix === 'currency' ? formatCurrency(value) : formatNumber(value)}
        </Typography>
        
        {trend !== undefined && (
          <Typography 
            variant="caption" 
            color={trend >= 0 ? 'success.main' : 'error.main'}
          >
            {trend >= 0 ? '↗' : '↘'} {formatPercentage(Math.abs(trend))}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

// File upload component
const FileUpload = ({ onFileSelect }: { onFileSelect: (file: File) => void }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log(\`Selected file: \${file.name} (\${formatBytes(file.size)})\`);
      onFileSelect(file);
    }
  };
  
  return (
    <input
      type="file"
      onChange={handleFileChange}
      accept=".pdf,.doc,.docx,.jpg,.png"
    />
  );
};`}
          />
        </ExampleSection>
      </section>

      {/* Best Practices */}
      <section id="best-practices">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Best Practices
        </Typography>

        <Stack spacing={3}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#4caf50' }}>
                ✅ Do's
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2">• Always handle null/undefined inputs gracefully</Typography>
                <Typography variant="body2">• Write pure functions tanpa side effects</Typography>
                <Typography variant="body2">
                  • Include proper TypeScript types untuk parameters dan return values
                </Typography>
                <Typography variant="body2">• Test edge cases dan error scenarios</Typography>
                <Typography variant="body2">• Document complex utility functions dengan JSDoc</Typography>
                <Typography variant="body2">• Use meaningful function names yang self-explanatory</Typography>
              </Stack>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#f44336' }}>
                ❌ Don'ts
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2">• Jangan modify input parameters (immutability)</Typography>
                <Typography variant="body2">
                  • Jangan create utilities yang terlalu specific untuk satu use case
                </Typography>
                <Typography variant="body2">• Jangan ignore error handling untuk invalid inputs</Typography>
                <Typography variant="body2">• Jangan hardcode locale/currency settings</Typography>
                <Typography variant="body2">• Jangan create duplicate functions yang sudah ada di library</Typography>
              </Stack>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
                💡 Tips
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2">• Create unit tests untuk semua utility functions</Typography>
                <Typography variant="body2">• Use memoization untuk expensive computations</Typography>
                <Typography variant="body2">• Consider internationalization untuk formatting functions</Typography>
                <Typography variant="body2">• Group related utilities dalam same module</Typography>
                <Typography variant="body2">• Export individual functions untuk better tree-shaking</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Stack>

        <Alert severity="info" sx={{ mt: 4 }}>
          <strong>Performance Matters!</strong> Utility functions sering dipanggil berkali-kali. Optimize for
          performance dan consider caching untuk expensive operations.
        </Alert>
      </section>
    </DocumentationPageLayout>
  );
};

export default UtilityDocumentationPage;
