'use client';

import { Typography, Alert, Card, CardContent, Stack, Chip } from '@mui/material';
import { CodeBlock } from '@/documentation/components';
import { DocumentationPageLayout } from '@/documentation/layouts/DocumentationLayout';

const TroubleshootingPage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Troubleshooting Overview' },
    { id: 'common-issues', title: 'Common Issues' },
    { id: 'debugging-techniques', title: 'Debugging Techniques' },
    { id: 'performance-issues', title: 'Performance Issues' }
  ];

  return (
    <DocumentationPageLayout
      title="Troubleshooting"
      description="Common issues dan debugging techniques untuk CRING! Partner"
      tableOfContents={tableOfContents}
      navigation={{
        previous: {
          title: 'Deployment',
          href: '/workflow/deployment'
        },
        next: {
          title: 'Performance',
          href: '/advanced/performance'
        }
      }}
    >
      <section id="overview">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Troubleshooting Overview
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          Panduan troubleshooting untuk mengatasi issues yang sering terjadi dalam pengembangan dan deployment CRING!
          Portal Partner, beserta debugging techniques dan best practices.
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
          <Chip label="Debugging" color="primary" variant="outlined" />
          <Chip label="Error Handling" color="secondary" variant="outlined" />
          <Chip label="Performance" color="info" variant="outlined" />
          <Chip label="Best Practices" color="success" variant="outlined" />
        </Stack>
      </section>

      <section id="common-issues">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Common Issues
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🔴 Build & Runtime Errors
              </Typography>
              <CodeBlock
                language="typescript"
                title="Common Build Issues"
                code={`// 1. TypeScript Errors
// Error: Property 'xxx' does not exist on type 'yyy'
// Solution: Add proper type definitions

interface MerchantData {
  id: string;
  name: string;
  email: string;
  // Add missing properties
}

// 2. Module Resolution Errors
// Error: Cannot resolve module '@/components/...'
// Solution: Check tsconfig.json path mapping

{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/modules/*": ["./src/modules/*"]
    }
  }
}

// 3. Environment Variables Not Found
// Error: process.env.NEXT_PUBLIC_API_URL is undefined
// Solution: Check .env file and restart dev server

// .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_APP_ENV=development

// Restart development server after adding env vars
npm run dev

// 4. Hydration Mismatch
// Error: Hydration failed because the initial UI...
// Solution: Ensure server and client render same content

const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) {
  return null; // or loading skeleton
}

return <ComponentThatDependsOnClient />;`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🟡 API & Network Issues
              </Typography>
              <CodeBlock
                language="typescript"
                title="API Troubleshooting"
                code={`// 1. CORS Errors
// Error: Access to fetch blocked by CORS policy
// Solution: Configure API server or use Next.js API routes

// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
};

// 2. Network Request Timeout
// Solution: Add timeout and retry logic

const apiRequest = async (url: string, options: RequestInit = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    
    throw error;
  }
};

// 3. Authentication Issues
// Solution: Check token validity and refresh logic

const checkAuthStatus = () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    redirect('/login');
    return;
  }
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const isExpired = payload.exp * 1000 < Date.now();
    
    if (isExpired) {
      localStorage.removeItem('token');
      redirect('/login');
    }
  } catch (error) {
    localStorage.removeItem('token');
    redirect('/login');
  }
};`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🟢 Component & State Issues
              </Typography>
              <CodeBlock
                language="typescript"
                title="React Common Issues"
                code={`// 1. State Not Updating
// Problem: State seems not to update immediately
// Solution: Remember setState is asynchronous

const [count, setCount] = useState(0);

const handleClick = () => {
  setCount(count + 1);
  // Wrong: console.log(count); // Still old value
  
  // Correct: Use useEffect or callback
  setCount(prevCount => {
    const newCount = prevCount + 1;
    console.log(newCount); // New value
    return newCount;
  });
};

// 2. useEffect Dependencies
// Problem: Infinite re-renders or stale closure
// Solution: Add proper dependencies

useEffect(() => {
  const fetchData = async () => {
    const data = await api.getData();
    setData(data);
  };
  
  fetchData();
}, []); // Add dependencies if needed

// 3. Memory Leaks
// Problem: Component unmounted but async operations continue
// Solution: Cleanup subscriptions and cancel requests

useEffect(() => {
  let isMounted = true;
  const controller = new AbortController();
  
  const fetchData = async () => {
    try {
      const data = await fetch('/api/data', {
        signal: controller.signal
      });
      
      if (isMounted) {
        setData(data);
      }
    } catch (error) {
      if (error.name !== 'AbortError' && isMounted) {
        setError(error);
      }
    }
  };
  
  fetchData();
  
  return () => {
    isMounted = false;
    controller.abort();
  };
}, []);

// 4. Form Validation Issues
// Problem: Form validation not working properly
// Solution: Proper error handling and reset

const {
  control,
  handleSubmit,
  formState: { errors },
  reset,
  clearErrors
} = useForm({
  mode: 'onChange', // Validate on change
  resolver: yupResolver(validationSchema)
});

const onSubmit = async (data) => {
  try {
    clearErrors(); // Clear previous errors
    await submitForm(data);
    reset(); // Reset form after success
  } catch (error) {
    // Handle server validation errors
    if (error.response?.data?.errors) {
      Object.entries(error.response.data.errors).forEach(([field, message]) => {
        setError(field, { message });
      });
    }
  }
};`}
              />
            </CardContent>
          </Card>
        </Stack>
      </section>

      <section id="debugging-techniques">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Debugging Techniques
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🔍 Browser Developer Tools
              </Typography>
              <CodeBlock
                language="js"
                title="Browser Debugging Tips"
                code={`// 1. Console Debugging
console.log('Variable:', variable);
console.table(arrayOfObjects); // Better for arrays/objects
console.group('API Calls');
console.log('Request:', request);
console.log('Response:', response);
console.groupEnd();

// 2. Performance Debugging
console.time('expensive-operation');
// ... expensive operation
console.timeEnd('expensive-operation');

// 3. Network Tab Usage
// - Check request/response headers
// - Verify API endpoints
// - Check response status codes
// - Monitor request timing

// 4. React Developer Tools
// - Component tree inspection
// - Props and state debugging
// - Performance profiling
// - Hook debugging

// 5. Conditional Breakpoints
// In browser dev tools, right-click breakpoint
// Add condition: user.id === '123'
// Breakpoint only triggers when condition is true

// 6. Source Map Debugging
// Ensure source maps are enabled for production debugging
// next.config.js
const nextConfig = {
  productionBrowserSourceMaps: true, // Enable in production
};`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🐛 Advanced Debugging Tools
              </Typography>
              <CodeBlock
                language="typescript"
                title="Custom Debugging Utilities"
                code={`// 1. Debug Hook
const useDebugValue = (value: any, label: string) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(\`[DEBUG] \${label}:\`, value);
    }
  }, [value, label]);
  
  return value;
};

// Usage
const merchants = useDebugValue(merchantsData, 'Merchants Data');

// 2. Error Boundary with Logging
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Send to error tracking service
    if (process.env.NODE_ENV === 'production') {
      // errorTracking.captureException(error, { extra: errorInfo });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert severity="error">
          <Typography variant="h6">Something went wrong</Typography>
          <Typography>Please refresh the page or contact support.</Typography>
        </Alert>
      );
    }

    return this.props.children;
  }
}

// 3. Network Request Logger
const loggedFetch = async (url: string, options?: RequestInit) => {
  const startTime = performance.now();
  
  console.group(\`🌐 API Call: \${url}\`);
  console.log('Request:', { url, ...options });
  
  try {
    const response = await fetch(url, options);
    const duration = performance.now() - startTime;
    
    console.log('Response:', {
      status: response.status,
      statusText: response.statusText,
      duration: \`\${duration.toFixed(2)}ms\`
    });
    
    const data = await response.json();
    console.log('Data:', data);
    console.groupEnd();
    
    return { response, data };
  } catch (error) {
    const duration = performance.now() - startTime;
    console.error('Error:', error);
    console.log('Duration:', \`\${duration.toFixed(2)}ms\`);
    console.groupEnd();
    throw error;
  }
};

// 4. Component Render Tracker
const useRenderTracker = (componentName: string) => {
  const renderCount = useRef(0);
  renderCount.current += 1;
  
  console.log(\`🔄 \${componentName} rendered \${renderCount.current} times\`);
  
  useEffect(() => {
    console.log(\`✅ \${componentName} mounted\`);
    return () => console.log(\`❌ \${componentName} unmounted\`);
  }, [componentName]);
};`}
              />
            </CardContent>
          </Card>
        </Stack>
      </section>

      <section id="performance-issues">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Performance Issues
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              ⚡ Performance Optimization
            </Typography>
            <CodeBlock
              language="typescript"
              title="Performance Debugging & Optimization"
              code={`// 1. Identify Slow Components
import { Profiler } from 'react';

const onRenderCallback = (id, phase, actualDuration) => {
  if (actualDuration > 10) { // Log slow renders
    console.warn(\`Slow render detected in \${id}: \${actualDuration}ms\`);
  }
};

<Profiler id="MerchantTable" onRender={onRenderCallback}>
  <MerchantTable merchants={merchants} />
</Profiler>

// 2. Memory Leak Detection
const useMemoryMonitor = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      if (performance.memory) {
        const memory = performance.memory;
        console.log('Memory usage:', {
          used: \`\${Math.round(memory.usedJSHeapSize / 1024 / 1024)}MB\`,
          total: \`\${Math.round(memory.totalJSHeapSize / 1024 / 1024)}MB\`,
          limit: \`\${Math.round(memory.jsHeapSizeLimit / 1024 / 1024)}MB\`
        });
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
};

// 3. Bundle Size Analysis
// Run: npm run build:analyze
// Check webpack bundle analyzer for large modules

// 4. Lazy Loading Issues
// Problem: Components loading too early or not at all
const LazyComponent = lazy(() => 
  import('./Component').catch(error => {
    console.error('Failed to load component:', error);
    return { default: () => <div>Failed to load</div> };
  })
);

// 5. API Performance Monitoring
class ApiMonitor {
  private static requests: Map<string, number> = new Map();
  
  static startRequest(url: string) {
    this.requests.set(url, performance.now());
  }
  
  static endRequest(url: string) {
    const startTime = this.requests.get(url);
    if (startTime) {
      const duration = performance.now() - startTime;
      console.log(\`API \${url}: \${duration.toFixed(2)}ms\`);
      
      if (duration > 2000) {
        console.warn(\`Slow API detected: \${url} took \${duration}ms\`);
      }
      
      this.requests.delete(url);
    }
  }
}

// Usage in API calls
const fetchData = async (url: string) => {
  ApiMonitor.startRequest(url);
  try {
    const response = await fetch(url);
    const data = await response.json();
    ApiMonitor.endRequest(url);
    return data;
  } catch (error) {
    ApiMonitor.endRequest(url);
    throw error;
  }
};`}
            />

            <Alert severity="info" sx={{ mt: 2 }}>
              <strong>Performance Tips:</strong> Gunakan React DevTools Profiler, Chrome DevTools Performance tab, dan
              Lighthouse untuk mengidentifikasi bottlenecks dalam aplikasi.
            </Alert>
          </CardContent>
        </Card>

        <Alert severity="success" sx={{ mt: 4 }}>
          <strong>Troubleshooting Ready!</strong> Panduan lengkap untuk debugging dan mengatasi issues yang sering
          terjadi dalam development.
        </Alert>
      </section>
    </DocumentationPageLayout>
  );
};

export default TroubleshootingPage;
