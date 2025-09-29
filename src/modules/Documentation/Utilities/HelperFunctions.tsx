'use client';

import React from 'react';
import { Box, Typography, Divider, Alert, AlertTitle, Chip, Stack, Card, CardContent } from '@mui/material';
import CodeBlock from '@/documentation/components/CodeBlock';

/**
 * Helper Functions Documentation Module
 *
 * Complete guide for utility functions and formatters in CRING Portal Partner
 * providing reusable business logic and data transformation utilities.
 *
 * References:
 * - references/utility/ (utility function implementations)
 * - references/modules/ (usage patterns in components)
 */
const HelperFunctionsDocumentation: React.FC = () => {
  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <Chip label="UTILITIES" color="info" size="small" />
          <Chip label="Helper Functions" color="primary" variant="outlined" size="small" />
          <Chip label="Data Processing" color="secondary" variant="outlined" size="small" />
        </Stack>

        <Typography variant="h4" component="h1" gutterBottom>
          🔧 Helper Functions Library
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
          📁 references/utility/ - Reusable business logic and data transformations
        </Typography>
      </Box>

      {/* Purpose Section */}
      <Alert severity="info" sx={{ mb: 4 }}>
        <AlertTitle>🎯 Untuk Apa Helper Functions?</AlertTitle>
        <Typography variant="body2" paragraph>
          Helper functions di CRING menyediakan <strong>pure functions</strong> untuk transformasi data dan business
          logic:
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
          <li>
            <strong>Data formatting</strong> - Currency, date, phone numbers, addresses
          </li>
          <li>
            <strong>Validation utilities</strong> - Input validation, business rules
          </li>
          <li>
            <strong>Text processing</strong> - String manipulation, search, filtering
          </li>
          <li>
            <strong>File handling</strong> - Upload, download, format conversion
          </li>
          <li>
            <strong>Mathematical operations</strong> - Calculations, conversions
          </li>
          <li>
            <strong>Array/Object manipulation</strong> - Sorting, grouping, mapping
          </li>
        </Box>
      </Alert>

      {/* Function Categories */}
      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        📋 Function Categories
      </Typography>

      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, mb: 3 }}>
        <Chip label="Formatters" color="primary" />
        <Chip label="Validators" color="success" />
        <Chip label="Converters" color="warning" />
        <Chip label="Calculators" color="info" />
        <Chip label="Generators" color="error" />
      </Stack>

      {/* Formatters */}
      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4 }}>
        💰 Formatters - Data Display
      </Typography>

      <CodeBlock
        title="Currency Formatters"
        language="typescript"
        code={`// utility/formatters/currency.ts

/**
 * Format number to Indonesian Rupiah currency
 * @param amount - Number to format
 * @param options - Formatting options
 */
export const formatRupiah = (
  amount: number | string,
  options?: {
    showSymbol?: boolean;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }
): string => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numAmount)) return 'Rp 0';

  const { 
    showSymbol = true, 
    minimumFractionDigits = 0, 
    maximumFractionDigits = 0 
  } = options || {};

  const formatted = new Intl.NumberFormat('id-ID', {
    style: showSymbol ? 'currency' : 'decimal',
    currency: 'IDR',
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(numAmount);

  // Replace 'IDR' with 'Rp' for consistency
  return showSymbol ? formatted.replace('IDR', 'Rp') : formatted;
};

/**
 * Parse currency string back to number
 * @param currencyString - Formatted currency string
 */
export const parseRupiah = (currencyString: string): number => {
  const numericOnly = currencyString.replace(/[^0-9,-]/g, '');
  return parseFloat(numericOnly.replace(',', '.')) || 0;
};

/**
 * Format amount with K, M, B suffixes
 * @param amount - Number to format
 */
export const formatAmountShort = (amount: number): string => {
  if (amount >= 1000000000) {
    return formatRupiah(amount / 1000000000, { maximumFractionDigits: 1 }) + 'M';
  }
  if (amount >= 1000000) {
    return formatRupiah(amount / 1000000, { maximumFractionDigits: 1 }) + 'Jt';
  }
  if (amount >= 1000) {
    return formatRupiah(amount / 1000, { maximumFractionDigits: 1 }) + 'Rb';
  }
  return formatRupiah(amount);
};

// ✅ Usage Examples
const examples = {
  basic: formatRupiah(1500000), // "Rp 1.500.000"
  noSymbol: formatRupiah(1500000, { showSymbol: false }), // "1.500.000"
  withDecimals: formatRupiah(1500.75, { maximumFractionDigits: 2 }), // "Rp 1.500,75"
  short: formatAmountShort(1500000), // "Rp 1,5Jt"
  parsed: parseRupiah('Rp 1.500.000'), // 1500000
};`}
      />

      <CodeBlock
        title="Date & Time Formatters"
        language="typescript"
        code={`// utility/formatters/date.ts

/**
 * Format date to Indonesian locale
 * @param date - Date to format
 * @param format - Format type
 */
export const formatDate = (
  date: string | Date,
  format: 'short' | 'long' | 'dateOnly' | 'timeOnly' | 'datetime' = 'dateOnly'
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) return 'Invalid Date';

  const options: Intl.DateTimeFormatOptions = {
    short: { day: '2-digit', month: '2-digit', year: 'numeric' },
    long: { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    },
    dateOnly: { day: '2-digit', month: '2-digit', year: 'numeric' },
    timeOnly: { hour: '2-digit', minute: '2-digit', second: '2-digit' },
    datetime: {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
  };

  return dateObj.toLocaleDateString('id-ID', options[format]);
};

/**
 * Get relative time (e.g., "2 hours ago")
 * @param date - Date to compare
 */
export const getRelativeTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInMs = now.getTime() - dateObj.getTime();
  
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  if (diffInMs < minute) return 'Baru saja';
  if (diffInMs < hour) return \`\${Math.floor(diffInMs / minute)} menit lalu\`;
  if (diffInMs < day) return \`\${Math.floor(diffInMs / hour)} jam lalu\`;
  if (diffInMs < week) return \`\${Math.floor(diffInMs / day)} hari lalu\`;
  if (diffInMs < month) return \`\${Math.floor(diffInMs / week)} minggu lalu\`;
  if (diffInMs < year) return \`\${Math.floor(diffInMs / month)} bulan lalu\`;
  
  return \`\${Math.floor(diffInMs / year)} tahun lalu\`;
};

/**
 * Check if date is within business hours
 * @param date - Date to check
 */
export const isBusinessHours = (date: Date = new Date()): boolean => {
  const hours = date.getHours();
  const day = date.getDay(); // 0 = Sunday, 6 = Saturday
  
  // Monday to Friday, 9 AM to 5 PM
  return day >= 1 && day <= 5 && hours >= 9 && hours < 17;
};

// ✅ Usage Examples
const dateExamples = {
  short: formatDate(new Date(), 'short'), // "25/12/2024"
  long: formatDate(new Date(), 'long'), // "Rabu, 25 Desember 2024"
  datetime: formatDate(new Date(), 'datetime'), // "25/12/2024, 14:30"
  relative: getRelativeTime(new Date(Date.now() - 2 * 60 * 60 * 1000)), // "2 jam lalu"
  businessCheck: isBusinessHours(), // true/false
};`}
      />

      <CodeBlock
        title="Text & String Formatters"
        language="typescript"
        code={`// utility/formatters/text.ts

/**
 * Format phone number to Indonesian format
 * @param phone - Phone number string
 */
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digits
  const cleaned = phone.replace(/\\D/g, '');
  
  // Handle international format (+62)
  let formatted = cleaned;
  if (cleaned.startsWith('62')) {
    formatted = '0' + cleaned.substring(2);
  }
  
  // Format as: 0812-3456-7890
  if (formatted.length >= 10) {
    return formatted.replace(/(\\d{4})(\\d{4})(\\d{4,})/, '$1-$2-$3');
  }
  
  return formatted;
};

/**
 * Generate initials from name
 * @param name - Full name string
 * @param maxInitials - Maximum number of initials
 */
export const getInitials = (name: string, maxInitials: number = 2): string => {
  return name
    .split(' ')
    .slice(0, maxInitials)
    .map(word => word.charAt(0).toUpperCase())
    .join('');
};

/**
 * Truncate text with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

/**
 * Convert to title case (proper case)
 * @param text - Text to convert
 */
export const toTitleCase = (text: string): string => {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Generate slug from text
 * @param text - Text to convert to slug
 */
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Mask sensitive information
 * @param text - Text to mask
 * @param visibleStart - Characters to show at start
 * @param visibleEnd - Characters to show at end
 */
export const maskText = (
  text: string, 
  visibleStart: number = 3, 
  visibleEnd: number = 3
): string => {
  if (text.length <= visibleStart + visibleEnd) return text;
  
  const start = text.substring(0, visibleStart);
  const end = text.substring(text.length - visibleEnd);
  const maskLength = text.length - visibleStart - visibleEnd;
  
  return start + '*'.repeat(maskLength) + end;
};

// ✅ Usage Examples
const textExamples = {
  phone: formatPhoneNumber('081234567890'), // "0812-3456-7890"
  initials: getInitials('John Doe Smith'), // "JD"
  truncate: truncateText('Very long text here', 10), // "Very lo..."
  title: toTitleCase('john doe smith'), // "John Doe Smith"
  slug: generateSlug('My Blog Post Title!'), // "my-blog-post-title"
  mask: maskText('1234567890123456', 4, 4), // "1234********3456"
};`}
      />

      {/* Validators */}
      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4 }}>
        ✅ Validators - Input Validation
      </Typography>

      <CodeBlock
        title="Business Rule Validators"
        language="typescript"
        code={`// utility/validators/business.ts

/**
 * Validate Indonesian phone number
 * @param phone - Phone number to validate
 */
export const validatePhoneNumber = (phone: string): {
  isValid: boolean;
  error?: string;
} => {
  const cleaned = phone.replace(/\\D/g, '');
  
  if (!cleaned) {
    return { isValid: false, error: 'Nomor HP harus diisi' };
  }
  
  if (cleaned.length < 10 || cleaned.length > 13) {
    return { isValid: false, error: 'Nomor HP harus 10-13 digit' };
  }
  
  if (!cleaned.startsWith('08') && !cleaned.startsWith('628')) {
    return { isValid: false, error: 'Nomor HP harus dimulai dengan 08 atau +628' };
  }
  
  return { isValid: true };
};

/**
 * Validate Indonesian National ID (KTP)
 * @param nik - NIK to validate
 */
export const validateNIK = (nik: string): {
  isValid: boolean;
  error?: string;
  info?: {
    birthDate: string;
    gender: 'L' | 'P';
    province: string;
  };
} => {
  if (!/^\\d{16}$/.test(nik)) {
    return { isValid: false, error: 'NIK harus 16 digit angka' };
  }
  
  // Extract information
  const province = nik.substring(0, 2);
  const regency = nik.substring(2, 4);
  const district = nik.substring(4, 6);
  const birthDateCode = nik.substring(6, 12);
  
  // Validate birth date
  const day = parseInt(birthDateCode.substring(0, 2));
  const month = parseInt(birthDateCode.substring(2, 4));
  const year = parseInt('19' + birthDateCode.substring(4, 6));
  
  // For women, day is added by 40
  const actualDay = day > 40 ? day - 40 : day;
  const gender = day > 40 ? 'P' : 'L';
  
  if (actualDay < 1 || actualDay > 31 || month < 1 || month > 12) {
    return { isValid: false, error: 'Tanggal lahir pada NIK tidak valid' };
  }
  
  return {
    isValid: true,
    info: {
      birthDate: \`\${actualDay.toString().padStart(2, '0')}/\${month.toString().padStart(2, '0')}/\${year}\`,
      gender,
      province: getProvinceByCode(province)
    }
  };
};

/**
 * Validate bank account number
 * @param accountNumber - Account number
 * @param bankCode - Bank code
 */
export const validateBankAccount = (
  accountNumber: string,
  bankCode: string
): { isValid: boolean; error?: string } => {
  const cleaned = accountNumber.replace(/\\D/g, '');
  
  if (!cleaned) {
    return { isValid: false, error: 'Nomor rekening harus diisi' };
  }
  
  // Bank-specific validation
  const bankRules: Record<string, { minLength: number; maxLength: number }> = {
    'BCA': { minLength: 10, maxLength: 10 },
    'BNI': { minLength: 10, maxLength: 10 },
    'BRI': { minLength: 15, maxLength: 15 },
    'MANDIRI': { minLength: 13, maxLength: 13 },
    'CIMB': { minLength: 13, maxLength: 14 },
  };
  
  const rule = bankRules[bankCode];
  if (rule) {
    if (cleaned.length < rule.minLength || cleaned.length > rule.maxLength) {
      return {
        isValid: false,
        error: \`Nomor rekening \${bankCode} harus \${rule.minLength}\${rule.minLength !== rule.maxLength ? '-' + rule.maxLength : ''} digit\`
      };
    }
  } else {
    // Generic validation
    if (cleaned.length < 8 || cleaned.length > 20) {
      return { isValid: false, error: 'Nomor rekening harus 8-20 digit' };
    }
  }
  
  return { isValid: true };
};

/**
 * Validate business hours for transaction
 * @param transactionTime - Transaction timestamp
 */
export const validateBusinessHours = (
  transactionTime: Date = new Date()
): { isValid: boolean; error?: string } => {
  const hours = transactionTime.getHours();
  const day = transactionTime.getDay();
  
  // Check if weekend
  if (day === 0 || day === 6) {
    return { isValid: false, error: 'Transaksi tidak dapat dilakukan di hari weekend' };
  }
  
  // Check if outside business hours (9 AM - 9 PM)
  if (hours < 9 || hours >= 21) {
    return { isValid: false, error: 'Transaksi hanya dapat dilakukan jam 09:00 - 21:00' };
  }
  
  return { isValid: true };
};

// Helper function for province lookup
const getProvinceByCode = (code: string): string => {
  const provinces: Record<string, string> = {
    '11': 'Aceh',
    '12': 'Sumatera Utara',
    '13': 'Sumatera Barat',
    '14': 'Riau',
    '15': 'Jambi',
    '16': 'Sumatera Selatan',
    '17': 'Bengkulu',
    '18': 'Lampung',
    '19': 'Kepulauan Bangka Belitung',
    '21': 'Kepulauan Riau',
    '31': 'DKI Jakarta',
    '32': 'Jawa Barat',
    '33': 'Jawa Tengah',
    '34': 'DI Yogyakarta',
    '35': 'Jawa Timur',
    '36': 'Banten',
    // ... other provinces
  };
  
  return provinces[code] || 'Unknown Province';
};`}
      />

      {/* Calculators */}
      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4 }}>
        🧮 Calculators - Business Logic
      </Typography>

      <CodeBlock
        title="Transaction & Fee Calculators"
        language="typescript"
        code={`// utility/calculators/transaction.ts

/**
 * Calculate transaction fee based on amount and type
 * @param amount - Transaction amount
 * @param transactionType - Type of transaction
 */
export const calculateTransactionFee = (
  amount: number,
  transactionType: 'qris' | 'transfer' | 'withdrawal' | 'topup'
): {
  fee: number;
  totalAmount: number;
  breakdown: {
    baseAmount: number;
    adminFee: number;
    serviceFee: number;
    tax: number;
  };
} => {
  let adminFee = 0;
  let serviceFee = 0;
  let tax = 0;

  switch (transactionType) {
    case 'qris':
      // QRIS fee: 0.7% with minimum Rp 1,000
      serviceFee = Math.max(amount * 0.007, 1000);
      tax = serviceFee * 0.11; // 11% PPN
      break;
      
    case 'transfer':
      // Bank transfer fee
      if (amount <= 25000) {
        adminFee = 2500;
      } else if (amount <= 100000) {
        adminFee = 5000;
      } else {
        adminFee = 7500;
      }
      break;
      
    case 'withdrawal':
      // Withdrawal fee: Rp 2,500 + 0.5% of amount
      adminFee = 2500;
      serviceFee = amount * 0.005;
      break;
      
    case 'topup':
      // Top-up usually free for most banks
      adminFee = 0;
      serviceFee = 0;
      break;
  }

  const totalFee = adminFee + serviceFee + tax;
  
  return {
    fee: totalFee,
    totalAmount: amount + totalFee,
    breakdown: {
      baseAmount: amount,
      adminFee,
      serviceFee,
      tax
    }
  };
};

/**
 * Calculate merchant discount based on volume
 * @param monthlyVolume - Monthly transaction volume
 * @param merchantTier - Merchant tier level
 */
export const calculateMerchantDiscount = (
  monthlyVolume: number,
  merchantTier: 'bronze' | 'silver' | 'gold' | 'platinum'
): {
  discountRate: number;
  discountAmount: number;
  newRate: number;
} => {
  let baseRate = 0.007; // 0.7% base rate
  let discountRate = 0;

  // Volume-based discount
  if (monthlyVolume >= 1000000000) { // 1B+
    discountRate = 0.3; // 30% discount
  } else if (monthlyVolume >= 500000000) { // 500M+
    discountRate = 0.2; // 20% discount
  } else if (monthlyVolume >= 100000000) { // 100M+
    discountRate = 0.15; // 15% discount
  } else if (monthlyVolume >= 50000000) { // 50M+
    discountRate = 0.1; // 10% discount
  }

  // Tier-based additional discount
  const tierDiscount = {
    bronze: 0,
    silver: 0.05, // Additional 5%
    gold: 0.1,    // Additional 10%
    platinum: 0.15 // Additional 15%
  };

  const totalDiscountRate = Math.min(discountRate + tierDiscount[merchantTier], 0.5); // Max 50%
  const discountAmount = monthlyVolume * baseRate * totalDiscountRate;
  const newRate = baseRate * (1 - totalDiscountRate);

  return {
    discountRate: totalDiscountRate,
    discountAmount,
    newRate
  };
};

/**
 * Calculate settlement time
 * @param transactionTime - When transaction occurred
 * @param merchantType - Type of merchant account
 */
export const calculateSettlementTime = (
  transactionTime: Date,
  merchantType: 'instant' | 'nextday' | 'weekly'
): {
  settlementDate: Date;
  businessDaysDelay: number;
} => {
  const settlement = new Date(transactionTime);
  let businessDaysDelay = 0;

  switch (merchantType) {
    case 'instant':
      // Instant settlement (within 30 minutes during business hours)
      if (isBusinessHours(transactionTime)) {
        settlement.setMinutes(settlement.getMinutes() + 30);
      } else {
        // Next business day 9 AM
        settlement.setDate(settlement.getDate() + 1);
        while (settlement.getDay() === 0 || settlement.getDay() === 6) {
          settlement.setDate(settlement.getDate() + 1);
        }
        settlement.setHours(9, 0, 0, 0);
        businessDaysDelay = 1;
      }
      break;
      
    case 'nextday':
      // Next business day
      settlement.setDate(settlement.getDate() + 1);
      while (settlement.getDay() === 0 || settlement.getDay() === 6) {
        settlement.setDate(settlement.getDate() + 1);
        businessDaysDelay++;
      }
      settlement.setHours(9, 0, 0, 0);
      businessDaysDelay = Math.max(businessDaysDelay, 1);
      break;
      
    case 'weekly':
      // Next Friday
      const daysUntilFriday = (5 - settlement.getDay() + 7) % 7;
      settlement.setDate(settlement.getDate() + (daysUntilFriday || 7));
      settlement.setHours(9, 0, 0, 0);
      businessDaysDelay = Math.ceil(daysUntilFriday / 7) * 5;
      break;
  }

  return {
    settlementDate: settlement,
    businessDaysDelay
  };
};`}
      />

      {/* Array/Object Utilities */}
      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4 }}>
        📊 Data Manipulation Utilities
      </Typography>

      <CodeBlock
        title="Array & Object Helpers"
        language="typescript"
        code={`// utility/data/manipulation.ts

/**
 * Group array by key
 * @param array - Array to group
 * @param keySelector - Function to select grouping key
 */
export const groupBy = <T, K extends string | number>(
  array: T[],
  keySelector: (item: T) => K
): Record<K, T[]> => {
  return array.reduce((groups, item) => {
    const key = keySelector(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {} as Record<K, T[]>);
};

/**
 * Sort array by multiple criteria
 * @param array - Array to sort
 * @param sortCriteria - Sorting criteria
 */
export const multiSort = <T>(
  array: T[],
  sortCriteria: Array<{
    key: keyof T;
    direction: 'asc' | 'desc';
  }>
): T[] => {
  return [...array].sort((a, b) => {
    for (const { key, direction } of sortCriteria) {
      const aVal = a[key];
      const bVal = b[key];
      
      let comparison = 0;
      if (aVal < bVal) comparison = -1;
      if (aVal > bVal) comparison = 1;
      
      if (comparison !== 0) {
        return direction === 'asc' ? comparison : -comparison;
      }
    }
    return 0;
  });
};

/**
 * Filter array with multiple conditions
 * @param array - Array to filter
 * @param filters - Filter conditions
 */
export const multiFilter = <T>(
  array: T[],
  filters: Record<string, any>
): T[] => {
  return array.filter(item => {
    return Object.entries(filters).every(([key, value]) => {
      if (value === '' || value === null || value === undefined) {
        return true; // Skip empty filters
      }
      
      const itemValue = item[key as keyof T];
      
      if (typeof value === 'string' && typeof itemValue === 'string') {
        return itemValue.toLowerCase().includes(value.toLowerCase());
      }
      
      return itemValue === value;
    });
  });
};

/**
 * Paginate array
 * @param array - Array to paginate
 * @param page - Current page (1-based)
 * @param limit - Items per page
 */
export const paginate = <T>(
  array: T[],
  page: number,
  limit: number
): {
  data: T[];
  pagination: {
    current: number;
    total: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
} => {
  const offset = (page - 1) * limit;
  const data = array.slice(offset, offset + limit);
  const pages = Math.ceil(array.length / limit);
  
  return {
    data,
    pagination: {
      current: page,
      total: array.length,
      pages,
      hasNext: page < pages,
      hasPrev: page > 1
    }
  };
};

/**
 * Deep clone object/array
 * @param obj - Object to clone
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as T;
  }
  
  const cloned = {} as T;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  
  return cloned;
};

/**
 * Remove duplicates from array
 * @param array - Array with potential duplicates
 * @param keySelector - Function to select unique key
 */
export const removeDuplicates = <T>(
  array: T[],
  keySelector?: (item: T) => any
): T[] => {
  if (!keySelector) {
    return Array.from(new Set(array));
  }
  
  const seen = new Set();
  return array.filter(item => {
    const key = keySelector(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

// ✅ Usage Examples
const dataExamples = {
  // Group transactions by date
  groupedTransactions: groupBy(
    transactions, 
    t => formatDate(t.createdAt, 'dateOnly')
  ),
  
  // Sort merchants by name (asc) then by balance (desc)
  sortedMerchants: multiSort(merchants, [
    { key: 'name', direction: 'asc' },
    { key: 'balance', direction: 'desc' }
  ]),
  
  // Filter transactions with multiple criteria
  filteredTransactions: multiFilter(transactions, {
    status: 'completed',
    amount: '', // Will be ignored
    merchantType: 'restaurant'
  }),
  
  // Paginate results
  paginatedData: paginate(transactions, 2, 10), // Page 2, 10 items per page
  
  // Remove duplicate merchants by email
  uniqueMerchants: removeDuplicates(merchants, m => m.email)
};`}
      />

      {/* File Utilities */}
      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4 }}>
        📁 File Processing Utilities
      </Typography>

      <CodeBlock
        title="File Upload & Download Helpers"
        language="typescript"
        code={`// utility/file/processing.ts

/**
 * Validate file upload
 * @param file - File to validate
 * @param options - Validation options
 */
export const validateFile = (
  file: File,
  options: {
    maxSize?: number; // in bytes
    allowedTypes?: string[];
    allowedExtensions?: string[];
  } = {}
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = [],
    allowedExtensions = []
  } = options;

  // Check file size
  if (file.size > maxSize) {
    errors.push(\`File size (\${formatFileSize(file.size)}) exceeds maximum (\${formatFileSize(maxSize)})\`);
  }

  // Check file type
  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    errors.push(\`File type \${file.type} not allowed. Allowed types: \${allowedTypes.join(', ')}\`);
  }

  // Check file extension
  if (allowedExtensions.length > 0) {
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!extension || !allowedExtensions.includes(extension)) {
      errors.push(\`File extension not allowed. Allowed extensions: \${allowedExtensions.join(', ')}\`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Format file size for display
 * @param bytes - File size in bytes
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Convert file to base64
 * @param file - File to convert
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = error => reject(error);
  });
};

/**
 * Download data as file
 * @param data - Data to download
 * @param filename - File name
 * @param type - MIME type
 */
export const downloadFile = (
  data: string | Blob,
  filename: string,
  type: string = 'application/octet-stream'
): void => {
  const blob = typeof data === 'string' 
    ? new Blob([data], { type }) 
    : data;
    
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Convert JSON to CSV
 * @param data - Array of objects to convert
 * @param filename - CSV filename
 */
export const exportToCSV = <T extends Record<string, any>>(
  data: T[],
  filename: string
): void => {
  if (data.length === 0) return;

  // Get headers from first object
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  const csvContent = [
    headers.join(','), // Header row
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape commas and quotes in values
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return \`"\${value.replace(/"/g, '""')}"\`;
        }
        return value;
      }).join(',')
    )
  ].join('\\n');

  downloadFile(csvContent, filename, 'text/csv');
};

/**
 * Read Excel file as JSON
 * @param file - Excel file
 */
export const readExcelFile = async (file: File): Promise<any[][]> => {
  // This would typically use a library like xlsx
  // For demonstration, we'll show the structure
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const data = e.target?.result;
        // In real implementation, use XLSX.read(data, {type: 'binary'})
        // and convert to JSON format
        
        // Mock data structure
        resolve([
          ['Name', 'Email', 'Phone'], // Headers
          ['John Doe', 'john@example.com', '081234567890'],
          ['Jane Smith', 'jane@example.com', '081234567891']
        ]);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsBinaryString(file);
  });
};

// ✅ Usage Examples
const fileExamples = {
  // Validate image upload
  imageValidation: validateFile(imageFile, {
    maxSize: 2 * 1024 * 1024, // 2MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    allowedExtensions: ['jpg', 'jpeg', 'png', 'webp']
  }),
  
  // Export merchants to CSV
  csvExport: () => exportToCSV(merchants, 'merchants-export.csv'),
  
  // Format file size
  sizeDisplay: formatFileSize(1536000), // "1.5 MB"
};`}
      />

      {/* Best Practices */}
      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        🎯 Best Practices & Tips
      </Typography>

      <Alert severity="success" sx={{ mb: 3 }}>
        <AlertTitle>✅ Helper Function Best Practices</AlertTitle>
        <Box component="ul" sx={{ m: '8px 0 0 20px' }}>
          <li>
            <strong>Pure Functions</strong>: No side effects, same input → same output
          </li>
          <li>
            <strong>Single Responsibility</strong>: One function, one specific task
          </li>
          <li>
            <strong>Type Safety</strong>: Use TypeScript generics and proper types
          </li>
          <li>
            <strong>Error Handling</strong>: Return result objects with success/error states
          </li>
          <li>
            <strong>Performance</strong>: Consider memoization for expensive calculations
          </li>
          <li>
            <strong>Documentation</strong>: Clear JSDoc comments with examples
          </li>
        </Box>
      </Alert>

      <Alert severity="error" sx={{ mt: 3 }}>
        <AlertTitle>❌ Common Mistakes to Avoid</AlertTitle>
        <Box component="ul" sx={{ m: '8px 0 0 20px' }}>
          <li>
            <strong>Mutating parameters</strong>: Always return new objects/arrays
          </li>
          <li>
            <strong>No input validation</strong>: Check for null/undefined values
          </li>
          <li>
            <strong>Hardcoded values</strong>: Use configuration or parameters
          </li>
          <li>
            <strong>Poor error messages</strong>: Provide actionable, specific errors
          </li>
          <li>
            <strong>Missing edge cases</strong>: Test with empty arrays, null values
          </li>
          <li>
            <strong>Performance issues</strong>: Avoid O(n²) operations when possible
          </li>
        </Box>
      </Alert>

      <Divider sx={{ my: 4 }} />

      {/* Function Categories Summary */}
      <Typography variant="h5" component="h2" gutterBottom>
        📚 Complete Helper Library Reference
      </Typography>

      <Typography variant="body1" paragraph sx={{ mb: 2 }}>
        Quick reference untuk semua kategori helper functions:
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            💰 Formatters
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            <Chip label="formatRupiah" size="small" />
            <Chip label="formatDate" size="small" />
            <Chip label="formatPhoneNumber" size="small" />
            <Chip label="formatFileSize" size="small" />
            <Chip label="truncateText" size="small" />
            <Chip label="maskText" size="small" />
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            ✅ Validators
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            <Chip label="validatePhoneNumber" size="small" />
            <Chip label="validateNIK" size="small" />
            <Chip label="validateBankAccount" size="small" />
            <Chip label="validateFile" size="small" />
            <Chip label="validateBusinessHours" size="small" />
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            🧮 Calculators
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            <Chip label="calculateTransactionFee" size="small" />
            <Chip label="calculateMerchantDiscount" size="small" />
            <Chip label="calculateSettlementTime" size="small" />
            <Chip label="getRelativeTime" size="small" />
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            📊 Data Utilities
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            <Chip label="groupBy" size="small" />
            <Chip label="multiSort" size="small" />
            <Chip label="multiFilter" size="small" />
            <Chip label="paginate" size="small" />
            <Chip label="removeDuplicates" size="small" />
            <Chip label="deepClone" size="small" />
            <Chip label="exportToCSV" size="small" />
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HelperFunctionsDocumentation;
