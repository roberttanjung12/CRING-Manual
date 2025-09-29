import { useCallback, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { searchDocumentation, getSearchSuggestions, type DocumentationPage } from '@/data/search-index';
import type { TypeSearchPageHookReturn, TypeSearchPageItem, TypeSearchPageLocal, TypeSearchPageProps } from './type';

/**
 * Enhanced search hook with semantic search capabilities
 *
 * @property {String} search field of search
 * @property {String} list list of page
 * @property {Function} options list of page filtered with semantic search
 * @property {Function} onChange is used for change field value
 * @property {Function} onDefine is used for defining search from local storage
 * @property {Function} suggestions get search suggestions
 *
 * @returns {TypeSearchPageHookReturn}
 */
const useSearchPageEnhanced = ({
  localName,
  menu,
  shape
}: TypeSearchPageProps): Readonly<
  TypeSearchPageHookReturn & {
    suggestions: string[];
    categories: Array<{ category: string; count: number }>;
    isSemanticSearch: boolean;
  }
> => {
  const pathname = usePathname();
  const [search, setSearch] = useState<string>('');

  // Legacy menu-based search (fallback)
  const legacyList = useMemo<Array<TypeSearchPageItem>>(() => {
    const set: Array<TypeSearchPageItem> = [];

    const onSet = (menus: Array<{ [key: string]: any }>, newLabel: Array<string>) => {
      menus.forEach(item => {
        if (item[shape.target] === '_self' || !item[shape.target]) {
          if (Array.isArray(item[shape.children]) && item[shape.children].length) {
            onSet(item[shape.children], [...newLabel, item[shape.title]]);
          } else {
            set.push({
              label: [...newLabel, item[shape.title]],
              path: item[shape.path],
              score: 0
            });
          }
        }
      });
    };

    onSet(menu, []);

    return set;
  }, [menu, shape.children, shape.path, shape.target, shape.title]);

  // Enhanced semantic search options
  const options = useMemo<Array<TypeSearchPageItem>>(() => {
    if (!search.trim()) {
      return [];
    }

    // Primary: Semantic search
    const semanticResults = searchDocumentation(search);

    if (semanticResults.length > 0) {
      return semanticResults.map((page: DocumentationPage & { score?: number }) => ({
        label: [page.category.charAt(0).toUpperCase() + page.category.slice(1), page.title],
        path: page.href,
        score: page.score || 0
      }));
    }

    // Fallback: Legacy menu-based search
    const regex = new RegExp(search, 'i');

    return legacyList
      .filter(({ label }) => regex.test(label.join(' ')))
      .map(item => ({ ...item, score: 0 }))
      .sort((itemA, itemB) => {
        const scoreA = itemA.path === pathname ? 0 : 1;
        const scoreB = itemB.path === pathname ? 0 : 1;

        return scoreA - scoreB;
      });
  }, [search, pathname, legacyList]);

  // Search suggestions
  const suggestions = useMemo<string[]>(() => {
    if (!search.trim() || search.length < 2) {
      return [];
    }

    return getSearchSuggestions(search);
  }, [search]);

  // Category breakdown
  const categories = useMemo<Array<{ category: string; count: number }>>(() => {
    if (!search.trim()) {
      return [];
    }

    const semanticResults = searchDocumentation(search);
    const categoryCount = semanticResults.reduce(
      (acc, page) => {
        acc[page.category] = (acc[page.category] || 0) + 1;

        return acc;
      },
      {} as Record<string, number>
    );

    return Object.entries(categoryCount).map(([category, count]) => ({
      category: category.charAt(0).toUpperCase() + category.slice(1),
      count
    }));
  }, [search]);

  // Determine if semantic search is active
  const isSemanticSearch = useMemo<boolean>(() => {
    if (!search.trim()) return false;
    const semanticResults = searchDocumentation(search);

    return semanticResults.length > 0;
  }, [search]);

  // Get stored search history from localStorage
  const onDefine = useCallback(() => {
    const stored = localStorage.getItem(localName);

    if (stored) {
      try {
        const data: Array<TypeSearchPageLocal> = JSON.parse(stored);
        const result = legacyList.filter(({ path }) => data.some(({ path: storedPath }) => storedPath === path));

        return result;
      } catch (error) {
        console.warn('Failed to parse search history:', error);
      }
    }

    return [];
  }, [localName, legacyList]);

  // Handle search change and store in localStorage
  const onChange = useCallback(
    (newSearch: string) => {
      setSearch(newSearch);

      if (newSearch.trim()) {
        // Store search query for analytics
        const stored = localStorage.getItem(`${localName}_queries`) || '[]';

        try {
          const queries: string[] = JSON.parse(stored);
          const updatedQueries = [newSearch, ...queries.filter(q => q !== newSearch)].slice(0, 10);

          localStorage.setItem(`${localName}_queries`, JSON.stringify(updatedQueries));
        } catch (error) {
          console.warn('Failed to store search query:', error);
        }
      }
    },
    [localName]
  );

  return {
    search,
    list: legacyList,
    options,
    suggestions,
    categories,
    isSemanticSearch,
    onDefine,
    onChange
  };
};

export default useSearchPageEnhanced;
