/**
 * Documentation Analytics Service
 *
 * Tracks user behavior, page visits, search patterns, and engagement metrics
 * for the documentation system
 */

export interface PageViewEvent {
  id: string;
  timestamp: Date;
  page: string;
  title: string;
  category: string;
  userId?: string;
  sessionId: string;
  referrer?: string;
  userAgent: string;
  timeOnPage?: number;
}

export interface SearchEvent {
  id: string;
  timestamp: Date;
  query: string;
  results: number;
  selectedResult?: string;
  searchType: 'semantic' | 'menu' | 'filter';
  userId?: string;
  sessionId: string;
}

export interface InteractionEvent {
  id: string;
  timestamp: Date;
  type: 'click' | 'scroll' | 'copy_code' | 'playground_interaction' | 'bookmark_toggle';
  target: string;
  value?: string;
  page: string;
  userId?: string;
  sessionId: string;
}

export interface AnalyticsMetrics {
  totalPageViews: number;
  uniqueVisitors: number;
  averageTimeOnPage: number;
  topPages: Array<{ page: string; views: number; avgTime: number }>;
  topSearchQueries: Array<{ query: string; count: number; avgResults: number }>;
  searchSuccessRate: number;
  playgroundUsage: Array<{ component: string; interactions: number }>;
  codeGeneratorUsage: Array<{ template: string; generations: number }>;
  userEngagement: {
    bounceRate: number;
    pagesPerSession: number;
    averageSessionDuration: number;
  };
}

class DocumentationAnalytics {
  private events: {
    pageViews: PageViewEvent[];
    searches: SearchEvent[];
    interactions: InteractionEvent[];
  } = {
    pageViews: [],
    searches: [],
    interactions: []
  };

  private sessionId: string;
  private currentPage: string = '';
  private pageStartTime: number = 0;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.loadStoredEvents();
    this.setupEventListeners();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateEventId(): string {
    return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private loadStoredEvents(): void {
    try {
      const stored = localStorage.getItem('cring-docs-analytics');

      if (stored) {
        const parsed = JSON.parse(stored);

        this.events = {
          pageViews:
            parsed.pageViews?.map((pv: any) => ({
              ...pv,
              timestamp: new Date(pv.timestamp)
            })) || [],
          searches:
            parsed.searches?.map((s: any) => ({
              ...s,
              timestamp: new Date(s.timestamp)
            })) || [],
          interactions:
            parsed.interactions?.map((i: any) => ({
              ...i,
              timestamp: new Date(i.timestamp)
            })) || []
        };
      }
    } catch (error) {
      console.warn('Failed to load analytics events:', error);
    }
  }

  private saveEvents(): void {
    try {
      // Keep only last 30 days of data
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

      this.events.pageViews = this.events.pageViews.filter(pv => pv.timestamp > thirtyDaysAgo);
      this.events.searches = this.events.searches.filter(s => s.timestamp > thirtyDaysAgo);
      this.events.interactions = this.events.interactions.filter(i => i.timestamp > thirtyDaysAgo);

      localStorage.setItem('cring-docs-analytics', JSON.stringify(this.events));
    } catch (error) {
      console.warn('Failed to save analytics events:', error);
    }
  }

  private setupEventListeners(): void {
    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden' && this.currentPage) {
        this.updatePageTime();
      }
    });

    // Track when user leaves the page
    window.addEventListener('beforeunload', () => {
      if (this.currentPage) {
        this.updatePageTime();
      }
    });

    // Track scroll events (throttled)
    let scrollTimeout: NodeJS.Timeout;

    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        this.trackInteraction('scroll', 'page', window.scrollY.toString());
      }, 500);
    });
  }

  private updatePageTime(): void {
    if (this.pageStartTime && this.currentPage) {
      const timeOnPage = Date.now() - this.pageStartTime;

      // Update the most recent page view with time spent
      const lastPageView = this.events.pageViews
        .filter(pv => pv.page === this.currentPage && pv.sessionId === this.sessionId)
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];

      if (lastPageView) {
        lastPageView.timeOnPage = timeOnPage;
        this.saveEvents();
      }
    }
  }

  /**
   * Track page view
   */
  trackPageView(page: string, title: string, category: string): void {
    // Update previous page time
    if (this.currentPage && this.pageStartTime) {
      this.updatePageTime();
    }

    // Track new page view
    const pageView: PageViewEvent = {
      id: this.generateEventId(),
      timestamp: new Date(),
      page,
      title,
      category,
      sessionId: this.sessionId,
      referrer: document.referrer,
      userAgent: navigator.userAgent
    };

    this.events.pageViews.push(pageView);
    this.currentPage = page;
    this.pageStartTime = Date.now();
    this.saveEvents();
  }

  /**
   * Track search events
   */
  trackSearch(query: string, results: number, searchType: 'semantic' | 'menu' | 'filter' = 'menu'): void {
    const searchEvent: SearchEvent = {
      id: this.generateEventId(),
      timestamp: new Date(),
      query,
      results,
      searchType,
      sessionId: this.sessionId
    };

    this.events.searches.push(searchEvent);
    this.saveEvents();
  }

  /**
   * Track search result selection
   */
  trackSearchResultClick(query: string, selectedResult: string): void {
    // Find the most recent search event with this query
    const recentSearch = this.events.searches
      .filter(s => s.query === query && s.sessionId === this.sessionId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];

    if (recentSearch) {
      recentSearch.selectedResult = selectedResult;
      this.saveEvents();
    }
  }

  /**
   * Track user interactions
   */
  trackInteraction(
    type: 'click' | 'scroll' | 'copy_code' | 'playground_interaction' | 'bookmark_toggle',
    target: string,
    value?: string
  ): void {
    const interaction: InteractionEvent = {
      id: this.generateEventId(),
      timestamp: new Date(),
      type,
      target,
      value,
      page: this.currentPage,
      sessionId: this.sessionId
    };

    this.events.interactions.push(interaction);
    this.saveEvents();
  }

  /**
   * Track playground component interactions
   */
  trackPlaygroundUsage(componentName: string, action: 'props_change' | 'example_load' | 'code_copy'): void {
    this.trackInteraction('playground_interaction', componentName, action);
  }

  /**
   * Track code generator usage
   */
  trackCodeGenerator(templateId: string, action: 'generate' | 'copy' | 'download'): void {
    this.trackInteraction('click', `code_generator_${templateId}`, action);
  }

  /**
   * Get analytics metrics
   */
  getMetrics(days: number = 7): AnalyticsMetrics {
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const recentPageViews = this.events.pageViews.filter(pv => pv.timestamp > startDate);
    const recentSearches = this.events.searches.filter(s => s.timestamp > startDate);
    const recentInteractions = this.events.interactions.filter(i => i.timestamp > startDate);

    // Calculate unique visitors (sessions)
    const uniqueSessions = new Set(recentPageViews.map(pv => pv.sessionId)).size;

    // Calculate average time on page
    const pagesWithTime = recentPageViews.filter(pv => pv.timeOnPage);
    const averageTimeOnPage =
      pagesWithTime.length > 0
        ? pagesWithTime.reduce((sum, pv) => sum + (pv.timeOnPage || 0), 0) / pagesWithTime.length
        : 0;

    // Top pages
    const pageStats = recentPageViews.reduce(
      (acc, pv) => {
        if (!acc[pv.page]) {
          acc[pv.page] = { views: 0, totalTime: 0, count: 0 };
        }
        acc[pv.page].views++;
        if (pv.timeOnPage) {
          acc[pv.page].totalTime += pv.timeOnPage;
          acc[pv.page].count++;
        }

        return acc;
      },
      {} as Record<string, { views: number; totalTime: number; count: number }>
    );

    const topPages = Object.entries(pageStats)
      .map(([page, stats]) => ({
        page,
        views: stats.views,
        avgTime: stats.count > 0 ? stats.totalTime / stats.count : 0
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    // Top search queries
    const searchStats = recentSearches.reduce(
      (acc, search) => {
        if (!acc[search.query]) {
          acc[search.query] = { count: 0, totalResults: 0 };
        }
        acc[search.query].count++;
        acc[search.query].totalResults += search.results;

        return acc;
      },
      {} as Record<string, { count: number; totalResults: number }>
    );

    const topSearchQueries = Object.entries(searchStats)
      .map(([query, stats]) => ({
        query,
        count: stats.count,
        avgResults: stats.totalResults / stats.count
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Search success rate (searches that led to a selection)
    const successfulSearches = recentSearches.filter(s => s.selectedResult).length;
    const searchSuccessRate = recentSearches.length > 0 ? successfulSearches / recentSearches.length : 0;

    // Playground usage
    const playgroundInteractions = recentInteractions.filter(i => i.type === 'playground_interaction');
    const playgroundStats = playgroundInteractions.reduce(
      (acc, interaction) => {
        const component = interaction.target;

        if (!acc[component]) {
          acc[component] = 0;
        }
        acc[component]++;

        return acc;
      },
      {} as Record<string, number>
    );

    const playgroundUsage = Object.entries(playgroundStats)
      .map(([component, interactions]) => ({ component, interactions }))
      .sort((a, b) => b.interactions - a.interactions);

    // Code generator usage
    const codeGenInteractions = recentInteractions.filter(
      i => i.target.startsWith('code_generator_') && i.value === 'generate'
    );
    const codeGenStats = codeGenInteractions.reduce(
      (acc, interaction) => {
        const template = interaction.target.replace('code_generator_', '');

        if (!acc[template]) {
          acc[template] = 0;
        }
        acc[template]++;

        return acc;
      },
      {} as Record<string, number>
    );

    const codeGeneratorUsage = Object.entries(codeGenStats)
      .map(([template, generations]) => ({ template, generations }))
      .sort((a, b) => b.generations - a.generations);

    // User engagement metrics
    const sessions = recentPageViews.reduce(
      (acc, pv) => {
        if (!acc[pv.sessionId]) {
          acc[pv.sessionId] = { pages: new Set(), startTime: pv.timestamp, endTime: pv.timestamp };
        }
        acc[pv.sessionId].pages.add(pv.page);
        if (pv.timestamp < acc[pv.sessionId].startTime) acc[pv.sessionId].startTime = pv.timestamp;
        if (pv.timestamp > acc[pv.sessionId].endTime) acc[pv.sessionId].endTime = pv.timestamp;

        return acc;
      },
      {} as Record<string, { pages: Set<string>; startTime: Date; endTime: Date }>
    );

    const sessionStats = Object.values(sessions);
    const bounceRate = sessionStats.filter(s => s.pages.size === 1).length / sessionStats.length;
    const pagesPerSession = sessionStats.reduce((sum, s) => sum + s.pages.size, 0) / sessionStats.length;
    const averageSessionDuration =
      sessionStats.reduce((sum, s) => sum + (s.endTime.getTime() - s.startTime.getTime()), 0) / sessionStats.length;

    return {
      totalPageViews: recentPageViews.length,
      uniqueVisitors: uniqueSessions,
      averageTimeOnPage,
      topPages,
      topSearchQueries,
      searchSuccessRate,
      playgroundUsage,
      codeGeneratorUsage,
      userEngagement: {
        bounceRate: isNaN(bounceRate) ? 0 : bounceRate,
        pagesPerSession: isNaN(pagesPerSession) ? 0 : pagesPerSession,
        averageSessionDuration: isNaN(averageSessionDuration) ? 0 : averageSessionDuration
      }
    };
  }

  /**
   * Export analytics data
   */
  exportData(): {
    events: {
      pageViews: PageViewEvent[];
      searches: SearchEvent[];
      interactions: InteractionEvent[];
    };
    metrics: AnalyticsMetrics;
  } {
    return {
      events: this.events,
      metrics: this.getMetrics(30)
    };
  }

  /**
   * Clear all analytics data
   */
  clearData(): void {
    this.events = { pageViews: [], searches: [], interactions: [] };
    localStorage.removeItem('cring-docs-analytics');
  }
}

// Export singleton instance
export const documentationAnalytics = new DocumentationAnalytics();

export default documentationAnalytics;
