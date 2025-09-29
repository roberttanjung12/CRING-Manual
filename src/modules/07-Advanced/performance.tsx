'use client';

import { Typography, Alert, Card, CardContent, Stack, Chip } from '@mui/material';
import { CodeBlock } from '@/documentation/components';
import { DocumentationPageLayout } from '@/documentation/layouts/DocumentationLayout';

const PerformancePage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Performance Overview' },
    { id: 'react-optimization', title: 'React Optimization' },
    { id: 'bundle-optimization', title: 'Bundle Optimization' },
    { id: 'runtime-optimization', title: 'Runtime Performance' },
    { id: 'monitoring', title: 'Performance Monitoring' }
  ];

  return (
    <DocumentationPageLayout
      title="Performance Optimization"
      description="Performance optimization techniques dan monitoring untuk CRING! Partner"
      tableOfContents={tableOfContents}
      navigation={{
        previous: {
          title: 'Creating Features',
          href: '/workflow/creating-features'
        },
        next: {
          title: 'Custom Hooks',
          href: '/advanced/custom-hooks'
        }
      }}
    >
      <section id="overview">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Performance Optimization Overview
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          Panduan komprehensif untuk mengoptimalkan performa aplikasi CRING! Partner, mulai dari React component
          optimization, bundle size reduction, hingga runtime performance monitoring dan improvement.
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
          <Chip label="React Performance" color="primary" variant="outlined" />
          <Chip label="Bundle Optimization" color="secondary" variant="outlined" />
          <Chip label="Runtime Monitoring" color="info" variant="outlined" />
          <Chip label="Best Practices" color="success" variant="outlined" />
        </Stack>

        <Alert severity="warning" sx={{ mb: 4 }}>
          <strong>Performance First:</strong> Optimisasi prematur adalah akar dari segala kejahatan. Selalu ukur
          performance sebelum dan sesudah optimasi untuk memastikan improvement yang nyata.
        </Alert>
      </section>

      <section id="react-optimization">
        <Typography variant="h5" sx={{ mb: 2 }}>
          React Component Optimization
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                ⚡ Memoization Techniques
              </Typography>
              <CodeBlock
                language="typescript"
                title="React.memo, useMemo, useCallback optimization"
                code={`// 1. React.memo untuk component memoization
import React, { memo, useMemo, useCallback } from 'react';

interface MerchantCardProps {
  merchant: Merchant;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

// Memo component to prevent unnecessary re-renders
const MerchantCard = memo<MerchantCardProps>(({ 
  merchant, 
  onEdit, 
  onDelete 
}) => {
  // Memoize expensive calculations
  const merchantStats = useMemo(() => {
    return {
      totalTransactions: calculateTransactions(merchant.transactions),
      monthlyRevenue: calculateRevenue(merchant.transactions, 30),
      averageOrderValue: calculateAOV(merchant.transactions)
    };
  }, [merchant.transactions]);

  // Memoize event handlers to prevent child re-renders
  const handleEdit = useCallback(() => {
    onEdit(merchant.id);
  }, [merchant.id, onEdit]);

  const handleDelete = useCallback(() => {
    onDelete(merchant.id);
  }, [merchant.id, onDelete]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{merchant.name}</Typography>
        <Typography variant="body2">
          Revenue: {formatCurrency(merchantStats.monthlyRevenue)}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button onClick={handleEdit}>Edit</Button>
          <Button onClick={handleDelete} color="error">Delete</Button>
        </Box>
      </CardContent>
    </Card>
  );
});

// Custom comparison function untuk memo
const MerchantCardWithCustomMemo = memo<MerchantCardProps>(
  MerchantCard,
  (prevProps, nextProps) => {
    // Only re-render if merchant data actually changed
    return (
      prevProps.merchant.id === nextProps.merchant.id &&
      prevProps.merchant.name === nextProps.merchant.name &&
      prevProps.merchant.updatedAt === nextProps.merchant.updatedAt
    );
  }
);

// 2. useMemo untuk expensive computations
const MerchantTable = ({ merchants, filters }) => {
  // Expensive filtering and sorting memoized
  const filteredAndSortedMerchants = useMemo(() => {
    return merchants
      .filter(merchant => {
        if (filters.status && merchant.status !== filters.status) return false;
        if (filters.search && !merchant.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'name') return a.name.localeCompare(b.name);
        if (filters.sortBy === 'revenue') return b.revenue - a.revenue;
        return 0;
      });
  }, [merchants, filters]);

  return (
    <div>
      {filteredAndSortedMerchants.map(merchant => (
        <MerchantCard key={merchant.id} merchant={merchant} />
      ))}
    </div>
  );
};

// 3. useCallback untuk event handlers
const MerchantManagement = () => {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Stable reference untuk callback
  const handleMerchantEdit = useCallback((id: string) => {
    // Navigation logic
    router.push(\`/merchants/\${id}/edit\`);
  }, [router]);

  const handleMerchantDelete = useCallback((id: string) => {
    setMerchants(prev => prev.filter(m => m.id !== id));
  }, []);

  const handleBulkAction = useCallback((action: string) => {
    // Bulk action logic dengan selectedIds
    console.log('Bulk action:', action, selectedIds);
  }, [selectedIds]);

  return (
    <div>
      {merchants.map(merchant => (
        <MerchantCard
          key={merchant.id}
          merchant={merchant}
          onEdit={handleMerchantEdit}
          onDelete={handleMerchantDelete}
        />
      ))}
    </div>
  );
};`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🚀 Virtual Scrolling & Lazy Loading
              </Typography>
              <CodeBlock
                language="typescript"
                title="Large list performance optimization"
                code={`// Virtual scrolling untuk large datasets
import { FixedSizeList as List } from 'react-window';

interface VirtualizedMerchantListProps {
  merchants: Merchant[];
  height: number;
  itemHeight: number;
}

const VirtualizedMerchantList: React.FC<VirtualizedMerchantListProps> = ({
  merchants,
  height,
  itemHeight
}) => {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const merchant = merchants[index];
    
    return (
      <div style={style}>
        <MerchantCard merchant={merchant} />
      </div>
    );
  };

  return (
    <List
      height={height}
      itemCount={merchants.length}
      itemSize={itemHeight}
      width="100%"
    >
      {Row}
    </List>
  );
};

// Lazy loading dengan Intersection Observer
const LazyMerchantCard = ({ merchant }: { merchant: Merchant }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoaded) {
          setIsVisible(true);
          setIsLoaded(true);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px' // Start loading 50px before visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isLoaded]);

  return (
    <div ref={ref} style={{ minHeight: '200px' }}>
      {isVisible ? (
        <MerchantCard merchant={merchant} />
      ) : (
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <CircularProgress size={24} />
              <Typography>Loading merchant...</Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Paginated list dengan infinite scroll
const InfiniteScrollMerchantList = () => {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreMerchants = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await merchantService.getMerchants({ 
        page, 
        limit: 20 
      });
      
      setMerchants(prev => [...prev, ...response.data]);
      setPage(prev => prev + 1);
      setHasMore(response.data.length === 20);
    } catch (error) {
      console.error('Failed to load merchants:', error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  // Trigger loading when near bottom
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000
      ) {
        loadMoreMerchants();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreMerchants]);

  return (
    <div>
      {merchants.map(merchant => (
        <LazyMerchantCard key={merchant.id} merchant={merchant} />
      ))}
      {loading && (
        <Box textAlign="center" p={2}>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
};`}
              />
            </CardContent>
          </Card>
        </Stack>
      </section>

      <section id="bundle-optimization">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Bundle Size Optimization
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                📦 Code Splitting & Lazy Loading
              </Typography>
              <CodeBlock
                language="typescript"
                title="Dynamic imports and route-based splitting"
                code={`// 1. Component-level code splitting
import { lazy, Suspense } from 'react';
import { CircularProgress, Box } from '@mui/material';

// Lazy load heavy components
const MerchantAnalytics = lazy(() => import('../components/MerchantAnalytics'));
const TransactionChart = lazy(() => import('../components/TransactionChart'));
const ExportDialog = lazy(() => import('../components/ExportDialog'));

// Loading fallback component
const LoadingFallback = ({ message = 'Loading...' }: { message?: string }) => (
  <Box 
    display="flex" 
    alignItems="center" 
    justifyContent="center" 
    minHeight="200px"
    gap={2}
  >
    <CircularProgress size={24} />
    <Typography variant="body2">{message}</Typography>
  </Box>
);

const MerchantDetailPage = () => {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);

  return (
    <div>
      <MerchantBasicInfo />
      
      {/* Load analytics only when needed */}
      {showAnalytics && (
        <Suspense fallback={<LoadingFallback message="Loading analytics..." />}>
          <MerchantAnalytics />
        </Suspense>
      )}
      
      <Button onClick={() => setShowAnalytics(true)}>
        Show Analytics
      </Button>

      {/* Export dialog loaded on demand */}
      {showExportDialog && (
        <Suspense fallback={<LoadingFallback message="Loading export..." />}>
          <ExportDialog 
            open={showExportDialog}
            onClose={() => setShowExportDialog(false)}
          />
        </Suspense>
      )}
    </div>
  );
};

// 2. Route-based code splitting dengan Next.js
// app/merchants/page.tsx
const MerchantsPage = lazy(() => import('./merchants/MerchantsPage'));
const TransactionsPage = lazy(() => import('./transactions/TransactionsPage'));

// 3. Feature-based code splitting
const MerchantFeatures = {
  BulkActions: lazy(() => import('./features/BulkActions')),
  ExportTools: lazy(() => import('./features/ExportTools')),
  AdvancedFilters: lazy(() => import('./features/AdvancedFilters')),
  Analytics: lazy(() => import('./features/Analytics'))
};

// Conditional feature loading
const MerchantTable = ({ features }: { features: string[] }) => {
  return (
    <div>
      <BasicMerchantTable />
      
      {features.includes('bulk-actions') && (
        <Suspense fallback={<LoadingFallback />}>
          <MerchantFeatures.BulkActions />
        </Suspense>
      )}
      
      {features.includes('advanced-filters') && (
        <Suspense fallback={<LoadingFallback />}>
          <MerchantFeatures.AdvancedFilters />
        </Suspense>
      )}
    </div>
  );
};

// 4. Dynamic imports untuk utilities
const MerchantManagement = () => {
  const handleExport = async () => {
    // Load export utility only when needed
    const { exportToExcel } = await import('../utils/exportUtils');
    await exportToExcel(merchants, 'merchants.xlsx');
  };

  const handleValidation = async (data: FormData) => {
    // Load validation library dynamically
    const { validateMerchantData } = await import('../utils/validation');
    return validateMerchantData(data);
  };

  // Advanced features loaded on demand
  const loadAdvancedFeatures = async () => {
    const [
      { BulkProcessor },
      { AdvancedAnalytics },
      { ReportGenerator }
    ] = await Promise.all([
      import('../features/BulkProcessor'),
      import('../features/AdvancedAnalytics'),
      import('../features/ReportGenerator')
    ]);

    // Use loaded components
    return { BulkProcessor, AdvancedAnalytics, ReportGenerator };
  };
};`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🎯 Bundle Analysis & Optimization
              </Typography>
              <CodeBlock
                language="bash"
                title="Bundle analysis and optimization commands"
                code={`# 1. Analyze bundle size
npm run build
npm run analyze

# Or with webpack-bundle-analyzer
npx webpack-bundle-analyzer .next/static/chunks/*.js

# 2. Check unused dependencies
npx depcheck

# 3. Analyze duplicate packages
npm ls --depth=0 --duplicate

# 4. Tree shaking optimization in next.config.js
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\\\/]node_modules[\\\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
            mui: {
              test: /[\\\\/]node_modules[\\\\/]@mui[\\\\/]/,
              name: 'mui',
              chunks: 'all',
            }
          }
        }
      };
    }
    
    return config;
  }
};

# 5. Import optimization for Material-UI
# Before (imports entire library):
# import { Button, TextField, Dialog } from '@mui/material';

# After (tree-shaken imports):
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';

# Or with babel plugin:
# npm install babel-plugin-import
# .babelrc:
{
  "plugins": [
    [
      "import",
      {
        "libraryName": "@mui/material",
        "libraryDirectory": "",
        "camel2DashComponentName": false
      },
      "core"
    ]
  ]
}

# 6. Image optimization
# Use Next.js Image component
import Image from 'next/image';

<Image
  src="/logo.png"
  alt="CRING Logo"
  width={200}
  height={100}
  priority // For above-the-fold images
  placeholder="blur" // For better UX
/>

# 7. Font optimization in next.config.js
const nextConfig = {
  optimizeFonts: true,
  images: {
    domains: ['example.com'],
    formats: ['image/webp', 'image/avif'],
  }
};`}
              />
            </CardContent>
          </Card>
        </Stack>
      </section>

      <section id="runtime-optimization">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Runtime Performance Optimization
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              🏃‍♂️ Runtime Performance Techniques
            </Typography>
            <CodeBlock
              language="typescript"
              title="Runtime optimization strategies"
              code={`// 1. Debouncing untuk search/filter
import { useMemo, useCallback, useState, useEffect } from 'react';
import { debounce } from 'lodash';

const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const MerchantSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  const searchMerchants = useCallback(async (term: string) => {
    if (!term.trim()) return;
    
    const results = await merchantService.search(term);
    setSearchResults(results);
  }, []);

  useEffect(() => {
    searchMerchants(debouncedSearchTerm);
  }, [debouncedSearchTerm, searchMerchants]);

  return (
    <TextField
      placeholder="Search merchants..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

// 2. Request caching dan deduplication
class ApiCache {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  get<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (!cached) return null;
    
    if (Date.now() - cached.timestamp > this.CACHE_DURATION) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data;
  }

  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  clear(): void {
    this.cache.clear();
  }
}

const apiCache = new ApiCache();

// Request deduplication
const pendingRequests = new Map<string, Promise<any>>();

export const cachedMerchantService = {
  async getMerchants(params: GetMerchantsParams): Promise<MerchantResponse> {
    const cacheKey = \`merchants-\${JSON.stringify(params)}\`;
    
    // Check cache first
    const cached = apiCache.get<MerchantResponse>(cacheKey);
    if (cached) return cached;
    
    // Check if request is already pending
    if (pendingRequests.has(cacheKey)) {
      return pendingRequests.get(cacheKey);
    }
    
    // Make new request
    const promise = merchantService.getMerchants(params);
    pendingRequests.set(cacheKey, promise);
    
    try {
      const result = await promise;
      apiCache.set(cacheKey, result);
      return result;
    } finally {
      pendingRequests.delete(cacheKey);
    }
  }
};

// 3. Web Workers untuk heavy computations
// merchantWorker.ts
self.onmessage = function(e) {
  const { merchants, filters } = e.data;
  
  // Heavy computation in worker thread
  const processed = merchants
    .filter(merchant => {
      // Complex filtering logic
      return merchant.revenue > filters.minRevenue &&
             merchant.transactions.length > filters.minTransactions;
    })
    .map(merchant => ({
      ...merchant,
      score: calculateMerchantScore(merchant), // Heavy calculation
      risk: assessRisk(merchant) // Another heavy calculation
    }));
    
  self.postMessage(processed);
};

// Using web worker in component
const MerchantAnalytics = ({ merchants }: { merchants: Merchant[] }) => {
  const [processedMerchants, setProcessedMerchants] = useState<ProcessedMerchant[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    if (!merchants.length) return;
    
    setIsProcessing(true);
    
    const worker = new Worker('/workers/merchantWorker.js');
    
    worker.postMessage({
      merchants,
      filters: { minRevenue: 1000000, minTransactions: 10 }
    });
    
    worker.onmessage = (e) => {
      setProcessedMerchants(e.data);
      setIsProcessing(false);
      worker.terminate();
    };
    
    return () => {
      worker.terminate();
    };
  }, [merchants]);
  
  return (
    <div>
      {isProcessing ? (
        <LinearProgress />
      ) : (
        <AnalyticsChart data={processedMerchants} />
      )}
    </div>
  );
};

// 4. Optimized re-renders dengan React.memo dan context
const MerchantContext = createContext<{
  merchants: Merchant[];
  updateMerchant: (id: string, updates: Partial<Merchant>) => void;
}>({
  merchants: [],
  updateMerchant: () => {}
});

const MerchantProvider = ({ children }: { children: ReactNode }) => {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  
  // Memoized update function to prevent re-renders
  const updateMerchant = useCallback((id: string, updates: Partial<Merchant>) => {
    setMerchants(prev => 
      prev.map(merchant => 
        merchant.id === id ? { ...merchant, ...updates } : merchant
      )
    );
  }, []);
  
  const value = useMemo(() => ({
    merchants,
    updateMerchant
  }), [merchants, updateMerchant]);
  
  return (
    <MerchantContext.Provider value={value}>
      {children}
    </MerchantContext.Provider>
  );
};`}
            />
          </CardContent>
        </Card>
      </section>

      <section id="monitoring">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Performance Monitoring & Measurement
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              📊 Performance Metrics & Monitoring
            </Typography>
            <CodeBlock
              language="typescript"
              title="Performance monitoring implementation"
              code={`// 1. Custom performance hook
const usePerformanceMonitor = (componentName: string) => {
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      console.log(\`Component \${componentName} render time: \${renderTime.toFixed(2)}ms\`);
      
      // Send to analytics if needed
      if (renderTime > 100) {
        analytics.track('slow_component_render', {
          componentName,
          renderTime,
          timestamp: Date.now()
        });
      }
    };
  });
};

// 2. Web Vitals monitoring
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

const vitalsUrl = 'https://analytics.example.com/vitals';

function sendToAnalytics(metric: any) {
  const body = JSON.stringify(metric);
  
  // Use sendBeacon if available for better reliability
  if (navigator.sendBeacon) {
    navigator.sendBeacon(vitalsUrl, body);
  } else {
    fetch(vitalsUrl, {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/json' },
      keepalive: true
    });
  }
}

// Measure all Web Vitals
getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);

// 3. Bundle size monitoring
// In your CI/CD pipeline
const fs = require('fs');
const path = require('path');

function analyzeBundleSize() {
  const buildDir = '.next/static/chunks';
  const files = fs.readdirSync(buildDir);
  
  const bundleStats = files
    .filter(file => file.endsWith('.js'))
    .map(file => {
      const filePath = path.join(buildDir, file);
      const stats = fs.statSync(filePath);
      return {
        name: file,
        size: stats.size,
        sizeKB: Math.round(stats.size / 1024)
      };
    })
    .sort((a, b) => b.size - a.size);

  console.table(bundleStats);
  
  // Alert if main bundle is too large
  const mainBundle = bundleStats.find(b => b.name.includes('main'));
  if (mainBundle && mainBundle.sizeKB > 500) {
    console.warn(\`Warning: Main bundle size is \${mainBundle.sizeKB}KB (>500KB)\`);
    process.exit(1); // Fail CI if bundle too large
  }
}

analyzeBundleSize();

// 4. Real User Monitoring (RUM)
class PerformanceTracker {
  private metrics: Map<string, number[]> = new Map();
  
  startMeasurement(name: string) {
    performance.mark(\`\${name}-start\`);
  }
  
  endMeasurement(name: string) {
    performance.mark(\`\${name}-end\`);
    performance.measure(name, \`\${name}-start\`, \`\${name}-end\`);
    
    const measure = performance.getEntriesByName(name)[0];
    const duration = measure.duration;
    
    // Store metric
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    this.metrics.get(name)!.push(duration);
    
    // Clean up marks
    performance.clearMarks(\`\${name}-start\`);
    performance.clearMarks(\`\${name}-end\`);
    performance.clearMeasures(name);
    
    return duration;
  }
  
  getMetrics(name: string) {
    const values = this.metrics.get(name) || [];
    if (values.length === 0) return null;
    
    return {
      min: Math.min(...values),
      max: Math.max(...values),
      avg: values.reduce((sum, val) => sum + val, 0) / values.length,
      count: values.length
    };
  }
  
  reportMetrics() {
    const report = {};
    for (const [name, values] of this.metrics) {
      report[name] = this.getMetrics(name);
    }
    
    // Send to monitoring service
    fetch('/api/performance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userAgent: navigator.userAgent,
        url: window.location.href,
        timestamp: Date.now(),
        metrics: report
      })
    });
  }
}

const performanceTracker = new PerformanceTracker();

// Usage in components
const MerchantTable = () => {
  useEffect(() => {
    performanceTracker.startMeasurement('merchant-table-load');
    
    return () => {
      performanceTracker.endMeasurement('merchant-table-load');
    };
  }, []);
  
  const handleFilter = useCallback(() => {
    performanceTracker.startMeasurement('merchant-table-filter');
    // ... filtering logic
    performanceTracker.endMeasurement('merchant-table-filter');
  }, []);
  
  return <div>/* Table implementation */</div>;
};

// 5. Performance budget alerts
const PERFORMANCE_BUDGETS = {
  BUNDLE_SIZE_KB: 500,
  FIRST_CONTENTFUL_PAINT: 2000,
  LARGEST_CONTENTFUL_PAINT: 4000,
  CUMULATIVE_LAYOUT_SHIFT: 0.1
};

function checkPerformanceBudget(metric: string, value: number) {
  const budget = PERFORMANCE_BUDGETS[metric];
  if (!budget) return;
  
  if (value > budget) {
    console.warn(\`Performance budget exceeded: \${metric} = \${value} (budget: \${budget})\`);
    
    // Alert team via webhook/email
    alertTeam({
      metric,
      value,
      budget,
      url: window.location.href,
      userAgent: navigator.userAgent
    });
  }
}`}
            />

            <Alert severity="success" sx={{ mt: 2 }}>
              <strong>Performance Monitoring Active!</strong> Implementasikan monitoring untuk memantau performa
              aplikasi secara real-time dan proactive.
            </Alert>
          </CardContent>
        </Card>

        <Alert severity="success" sx={{ mt: 4 }}>
          <strong>Performance Optimization Complete!</strong> Semua teknik optimasi performance sudah siap
          diimplementasikan untuk aplikasi yang lebih cepat.
        </Alert>
      </section>
    </DocumentationPageLayout>
  );
};

export default PerformancePage;
