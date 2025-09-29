'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Alert,
  Stack,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Button
} from '@mui/material';
import { Icon } from '@iconify/react';
import {
  TrendingUpOutlined,
  VisibilityOutlined,
  SearchOutlined,
  CodeOutlined,
  PersonOutlined,
  AccessTimeOutlined,
  KeyboardArrowUpOutlined,
  KeyboardArrowDownOutlined,
  DownloadOutlined
} from '@mui/icons-material';
import documentationAnalytics, { type AnalyticsMetrics } from '@/services/analytics';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  trend?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, subtitle, icon, color = 'primary', trend }) => (
  <Card>
    <CardContent>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
        <Box sx={{ color: `${color}.main` }}>{icon}</Box>
        {trend !== undefined && (
          <Stack direction="row" alignItems="center" spacing={0.5}>
            {trend > 0 ? (
              <KeyboardArrowUpOutlined color="success" fontSize="small" />
            ) : trend < 0 ? (
              <KeyboardArrowDownOutlined color="error" fontSize="small" />
            ) : null}
            <Typography
              variant="caption"
              color={trend > 0 ? 'success.main' : trend < 0 ? 'error.main' : 'text.secondary'}
            >
              {Math.abs(trend)}%
            </Typography>
          </Stack>
        )}
      </Stack>

      <Typography variant="h4" fontWeight={700} gutterBottom>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>

      {subtitle && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          {subtitle}
        </Typography>
      )}
    </CardContent>
  </Card>
);

const formatDuration = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  }

  return `${seconds}s`;
};

const formatPercentage = (value: number): string => {
  return `${(value * 100).toFixed(1)}%`;
};

const AnalyticsDashboardPage: React.FC = () => {
  const [metrics, setMetrics] = useState<AnalyticsMetrics | null>(null);
  const [timeRange, setTimeRange] = useState<number>(7);
  const [loading, setLoading] = useState(true);

  const timeRangeOptions = [
    { value: 1, label: 'Last 24 hours' },
    { value: 7, label: 'Last 7 days' },
    { value: 30, label: 'Last 30 days' },
    { value: 90, label: 'Last 90 days' }
  ];

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      try {
        // Simulate async operation
        await new Promise(resolve => setTimeout(resolve, 500));
        const analyticsMetrics = documentationAnalytics.getMetrics(timeRange);

        setMetrics(analyticsMetrics);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [timeRange]);

  const exportData = () => {
    const data = documentationAnalytics.exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = `cring-docs-analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading || !metrics) {
    return (
      <Box sx={{ maxWidth: '1400px', mx: 'auto', p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Analytics Dashboard
        </Typography>
        <LinearProgress />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Loading analytics data...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: '1400px', mx: 'auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Icon icon="chart-line" width={32} height={32} />
          <Typography variant="h3" component="h1" fontWeight={700}>
            Documentation Analytics
          </Typography>
          <Chip label="INSIGHTS" size="small" color="success" variant="filled" />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="h6" color="text.secondary">
            Track user behavior, page performance, dan engagement metrics untuk dokumentasi CRING
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center">
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Time Range</InputLabel>
              <Select value={timeRange} label="Time Range" onChange={e => setTimeRange(Number(e.target.value))}>
                {timeRangeOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button variant="outlined" startIcon={<DownloadOutlined />} onClick={exportData} size="small">
              Export Data
            </Button>
          </Stack>
        </Stack>

        <Alert severity="info" sx={{ mb: 3 }}>
          <strong>📊 Privacy First:</strong> Analytics data disimpan locally di browser dan tidak dikirim ke server.
          Data otomatis dibersihkan setelah 30 hari untuk mengoptimalkan performa.
        </Alert>
      </Box>
      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3
          }}
        >
          <MetricCard
            title="Total Page Views"
            value={metrics.totalPageViews}
            subtitle={`in last ${timeRange} ${timeRange === 1 ? 'day' : 'days'}`}
            icon={<VisibilityOutlined />}
            color="primary"
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3
          }}
        >
          <MetricCard
            title="Unique Visitors"
            value={metrics.uniqueVisitors}
            subtitle="unique sessions"
            icon={<PersonOutlined />}
            color="success"
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3
          }}
        >
          <MetricCard
            title="Avg. Time on Page"
            value={formatDuration(metrics.averageTimeOnPage)}
            subtitle="engagement time"
            icon={<AccessTimeOutlined />}
            color="info"
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 3
          }}
        >
          <MetricCard
            title="Search Success Rate"
            value={formatPercentage(metrics.searchSuccessRate)}
            subtitle="searches leading to clicks"
            icon={<TrendingUpOutlined />}
            color="warning"
          />
        </Grid>
      </Grid>
      {/* User Engagement */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid
          size={{
            xs: 12,
            md: 4
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User Engagement
              </Typography>

              <Stack spacing={2}>
                <Box>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2">Bounce Rate</Typography>
                    <Typography variant="h6" color="error.main">
                      {formatPercentage(metrics.userEngagement.bounceRate)}
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={metrics.userEngagement.bounceRate * 100}
                    color="error"
                    sx={{ height: 4, borderRadius: 2 }}
                  />
                </Box>

                <Box>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2">Pages per Session</Typography>
                    <Typography variant="h6" color="success.main">
                      {metrics.userEngagement.pagesPerSession.toFixed(1)}
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min(metrics.userEngagement.pagesPerSession * 20, 100)}
                    color="success"
                    sx={{ height: 4, borderRadius: 2 }}
                  />
                </Box>

                <Box>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2">Avg. Session Duration</Typography>
                    <Typography variant="h6" color="primary.main">
                      {formatDuration(metrics.userEngagement.averageSessionDuration)}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 8
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Top Documentation Pages
              </Typography>

              <List dense>
                {metrics.topPages.slice(0, 8).map((page, index) => (
                  <ListItem key={page.page} divider={index < 7}>
                    <ListItemText
                      primary={page.page}
                      secondary={`${page.views} views • ${formatDuration(page.avgTime)} avg. time`}
                    />
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Chip label={page.views} size="small" color="primary" variant="outlined" />
                    </Stack>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* Search Analytics & Interactive Features */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid
          size={{
            xs: 12,
            md: 6
          }}
        >
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <SearchOutlined />
                <Typography variant="h6">Search Analytics</Typography>
              </Stack>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Success Rate: {formatPercentage(metrics.searchSuccessRate)}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={metrics.searchSuccessRate * 100}
                  color="success"
                  sx={{ height: 6, borderRadius: 3 }}
                />
              </Box>

              <Typography variant="subtitle2" gutterBottom>
                Top Search Queries:
              </Typography>

              <List dense>
                {metrics.topSearchQueries.slice(0, 5).map(query => (
                  <ListItem key={query.query} sx={{ px: 0 }}>
                    <ListItemText
                      primary={query.query}
                      secondary={`${query.count} searches • ${query.avgResults.toFixed(1)} avg results`}
                    />
                    <Chip label={query.count} size="small" color="info" variant="outlined" />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 6
          }}
        >
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <CodeOutlined />
                <Typography variant="h6">Interactive Features</Typography>
              </Stack>

              <Typography variant="subtitle2" gutterBottom>
                Component Playground Usage:
              </Typography>

              <List dense sx={{ mb: 2 }}>
                {metrics.playgroundUsage.slice(0, 4).map(usage => (
                  <ListItem key={usage.component} sx={{ px: 0 }}>
                    <ListItemText primary={usage.component} secondary={`${usage.interactions} interactions`} />
                    <Chip label={usage.interactions} size="small" color="success" variant="outlined" />
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" gutterBottom>
                Code Generator Templates:
              </Typography>

              <List dense>
                {metrics.codeGeneratorUsage.slice(0, 4).map(usage => (
                  <ListItem key={usage.template} sx={{ px: 0 }}>
                    <ListItemText primary={usage.template} secondary={`${usage.generations} generations`} />
                    <Chip label={usage.generations} size="small" color="warning" variant="outlined" />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* Insights & Recommendations */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            📈 Insights & Recommendations
          </Typography>

          <Grid container spacing={2}>
            {metrics.userEngagement.bounceRate > 0.7 && (
              <Grid
                size={{
                  xs: 12,
                  md: 6
                }}
              >
                <Alert severity="warning">
                  <strong>High Bounce Rate:</strong> {formatPercentage(metrics.userEngagement.bounceRate)} of users
                  leave after viewing only one page. Consider improving page content and internal linking.
                </Alert>
              </Grid>
            )}

            {metrics.searchSuccessRate < 0.5 && (
              <Grid
                size={{
                  xs: 12,
                  md: 6
                }}
              >
                <Alert severity="error">
                  <strong>Low Search Success:</strong> Only {formatPercentage(metrics.searchSuccessRate)} of searches
                  lead to clicks. Review search functionality and result relevance.
                </Alert>
              </Grid>
            )}

            {metrics.averageTimeOnPage < 30000 && (
              <Grid
                size={{
                  xs: 12,
                  md: 6
                }}
              >
                <Alert severity="info">
                  <strong>Short Page Time:</strong> Average {formatDuration(metrics.averageTimeOnPage)} on page.
                  Consider adding more engaging content or breaking down complex topics.
                </Alert>
              </Grid>
            )}

            {metrics.playgroundUsage.length === 0 && (
              <Grid
                size={{
                  xs: 12,
                  md: 6
                }}
              >
                <Alert severity="info">
                  <strong>Low Interactive Usage:</strong> Component playgrounds aren't being used much. Consider
                  promoting these features or improving discoverability.
                </Alert>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AnalyticsDashboardPage;
