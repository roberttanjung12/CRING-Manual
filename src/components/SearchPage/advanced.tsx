import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Box,
  ClickAwayListener,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Chip,
  Stack,
  Divider,
  Tabs,
  Tab
} from '@mui/material';
import { Icon } from '@iconify/react';
import { HighlightOff, SearchOutlined, History, BookmarkBorder, Bookmark } from '@mui/icons-material';
import SearchPageItem from './components/Item';
import SearchHistoryComponent, { type SearchHistoryItem, type BookmarkedPage } from './SearchHistory';
import type { TypeSearchPageProps } from './type';
import useSearchPageEnhanced from './useSearchPageEnhanced';

// Local storage helpers
const SEARCH_HISTORY_KEY = 'cring-search-history';
const BOOKMARKS_KEY = 'cring-bookmarks';

const getSearchHistory = (): SearchHistoryItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY) || '[]').map((item: any) => ({
      ...item,
      timestamp: new Date(item.timestamp)
    }));
  } catch {
    return [];
  }
};

const getBookmarks = (): BookmarkedPage[] => {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || '[]').map((item: any) => ({
      ...item,
      bookmarkedAt: new Date(item.bookmarkedAt)
    }));
  } catch {
    return [];
  }
};

const saveSearchHistory = (history: SearchHistoryItem[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
  }
};

const saveBookmarks = (bookmarks: BookmarkedPage[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  }
};

/**
 * Advanced SearchPage component with semantic search and enhanced features
 */
const SearchPageAdvanced = ({ localName, menu, shape }: TypeSearchPageProps): Readonly<ReactNode> => {
  const { search, options, suggestions, categories, isSemanticSearch, onDefine, onChange } = useSearchPageEnhanced({
    localName,
    menu,
    shape
  });

  const ref = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [focused, setFocused] = useState<number>(-1);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<number>(0);

  // Advanced features state
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [bookmarkedPages, setBookmarkedPages] = useState<BookmarkedPage[]>([]);

  // Initialize data from localStorage
  useEffect(() => {
    setSearchHistory(getSearchHistory());
    setBookmarkedPages(getBookmarks());
  }, []);

  const onClose = () => {
    setIsOpen(false);
    setIsInputFocused(false);
    setFocused(-1);
    setShowSuggestions(false);
  };

  const onInput = useCallback((action: 'focus' | 'blur') => {
    if (ref?.current) {
      const getInput = ref?.current.querySelector('input');

      if (action === 'focus') getInput?.focus();
      else if (action === 'blur') getInput?.blur();
    }
  }, []);

  const onFocused = useCallback(
    (action: 'down' | 'up') => {
      if (action === 'down') setFocused(prev => (prev === null ? 0 : (prev + 1) % options.length));
      else if (action === 'up')
        setFocused(prev => (prev === null ? options.length - 1 : (prev - 1 + options.length) % options.length));
    },
    [options.length]
  );

  const addToSearchHistory = useCallback(
    (query: string, resultCount: number) => {
      if (!query.trim()) return;

      const newItem: SearchHistoryItem = {
        id: Date.now().toString(),
        query,
        timestamp: new Date(),
        results: resultCount
      };

      const updatedHistory = [newItem, ...searchHistory.filter(item => item.query !== query)].slice(0, 20);

      setSearchHistory(updatedHistory);
      saveSearchHistory(updatedHistory);
    },
    [searchHistory]
  );

  const onSelectSuggestion = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
    setIsOpen(true);
    addToSearchHistory(suggestion, options.length);
  };

  const handleHistoryClick = (query: string) => {
    onChange(query);
    setIsOpen(true);
    setCurrentTab(0);
  };

  const handleBookmarkClick = (path: string) => {
    window.location.href = path;
    onClose();
  };

  const isPageBookmarked = (path: string) => {
    return bookmarkedPages.some(bookmark => bookmark.path === path);
  };

  const toggleBookmark = (page: { title: string; path: string; category?: string }) => {
    if (isPageBookmarked(page.path)) {
      const updatedBookmarks = bookmarkedPages.filter(bookmark => bookmark.path !== page.path);

      setBookmarkedPages(updatedBookmarks);
      saveBookmarks(updatedBookmarks);
    } else {
      const newBookmark: BookmarkedPage = {
        id: Date.now().toString(),
        title: page.title,
        path: page.path,
        category: page.category || 'Other',
        bookmarkedAt: new Date()
      };
      const updatedBookmarks = [newBookmark, ...bookmarkedPages].slice(0, 50);

      setBookmarkedPages(updatedBookmarks);
      saveBookmarks(updatedBookmarks);
    }
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    saveSearchHistory([]);
  };

  const removeFromHistory = (id: string) => {
    const updatedHistory = searchHistory.filter(item => item.id !== id);

    setSearchHistory(updatedHistory);
    saveSearchHistory(updatedHistory);
  };

  const removeBookmark = (id: string) => {
    const updatedBookmarks = bookmarkedPages.filter(bookmark => bookmark.id !== id);

    setBookmarkedPages(updatedBookmarks);
    saveBookmarks(updatedBookmarks);
  };

  useEffect(() => {
    onDefine();
  }, [onDefine]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        onInput('focus');
        setIsOpen(true);
      }

      if (!isOpen) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          onFocused('down');
          break;
        case 'ArrowUp':
          event.preventDefault();
          onFocused('up');
          break;
        case 'Enter':
          event.preventDefault();
          if (focused >= 0 && options[focused]) {
            const selectedOption = options[focused];

            addToSearchHistory(search, options.length);
            window.location.href = selectedOption.path;
            onClose();
          }
          break;
        case 'Escape':
          event.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, focused, options, search, onFocused, onInput, addToSearchHistory]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    onChange(value);

    if (value.trim()) {
      setIsOpen(true);
      setShowSuggestions(value.length >= 2 && suggestions.length > 0);
    } else {
      setIsOpen(false);
      setShowSuggestions(false);
    }
  };

  const handleSearchSubmit = () => {
    if (search.trim()) {
      addToSearchHistory(search, options.length);
    }
  };

  return (
    <ClickAwayListener
      onClickAway={event => {
        // Don't close if clicking on dropdown content
        const target = event.target as HTMLElement;
        const isDropdownContent = target.closest('[data-testid="dropdown-content"]');
        const isMuiSelect = target.closest(
          '.MuiSelect-root, .MuiSelect-select, .MuiMenuItem-root, .MuiBackdrop-root, .MuiPaper-root, .MuiPopper-root, .MuiList-root, .MuiFormControl-root, .MuiInputBase-root, .MuiOutlinedInput-root'
        );
        const isMuiModal = target.closest('[role="presentation"], .MuiModal-root');
        const isTabContent = target.closest('.MuiTab-root, .MuiTabs-root');

        if (!isDropdownContent && !isMuiSelect && !isMuiModal && !isTabContent && !isInputFocused) {
          setIsInputFocused(false);
          onClose();
        }
      }}
    >
      <Box position="relative" width={350} ref={ref}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Search documentation... (Ctrl+K)"
          value={search}
          onFocus={() => {
            setIsInputFocused(true);
            setIsOpen(search.length > 0 || searchHistory.length > 0 || bookmarkedPages.length > 0);
            setShowSuggestions(search.length >= 2 && suggestions.length > 0);
          }}
          onBlur={e => {
            // Don't close immediately - check if focus moved to dropdown content
            const relatedTarget = e.relatedTarget as HTMLElement;
            const isMovingToDropdown =
              relatedTarget &&
              (relatedTarget.closest('.MuiList-root') ||
                relatedTarget.closest('.search-filters-dropdown') ||
                relatedTarget.closest('[role="presentation"]') ||
                relatedTarget.closest('.MuiMenuItem-root') ||
                relatedTarget.closest('.MuiSelect-select') ||
                relatedTarget.closest('.MuiFormControl-root') ||
                relatedTarget.closest('.MuiInputBase-root') ||
                relatedTarget.closest('.MuiOutlinedInput-root') ||
                relatedTarget.closest('[data-testid="dropdown-content"]'));

            if (!isMovingToDropdown) {
              setTimeout(() => {
                setIsInputFocused(false);
                onClose();
              }, 200);
            }
          }}
          onKeyDown={event => {
            if (['Tab', 'ArrowDown', 'ArrowUp'].includes(event.key)) setIsInputFocused(true);
            if (event.key === 'Enter') handleSearchSubmit();
          }}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {search && (
                  <IconButton
                    size="small"
                    onClick={() => {
                      onChange('');
                      onClose();
                    }}
                    title="Hapus pencarian"
                  >
                    <HighlightOff fontSize="small" />
                  </IconButton>
                )}
              </InputAdornment>
            )
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'background.paper',
              '&:hover': {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main'
                }
              }
            }
          }}
        />

        {(isOpen || showSuggestions) && (
          <Box
            data-testid="dropdown-content"
            position="absolute"
            top="100%"
            left={0}
            maxHeight="70vh"
            width="100%"
            overflow="hidden"
            bgcolor="background.paper"
            borderRadius={1}
            boxShadow={3}
            zIndex={1300}
            onMouseDown={e => e.preventDefault()}
            sx={{ mt: 0.5 }}
          >
            {/* Tabs for different views */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={currentTab} onChange={(_, newValue) => setCurrentTab(newValue)} variant="fullWidth">
                <Tab
                  icon={<SearchOutlined fontSize="small" />}
                  label="Results"
                  iconPosition="start"
                  sx={{ minHeight: 40 }}
                />
                <Tab icon={<History fontSize="small" />} label="History" iconPosition="start" sx={{ minHeight: 40 }} />
                <Tab icon={<Bookmark fontSize="small" />} label="Saved" iconPosition="start" sx={{ minHeight: 40 }} />
              </Tabs>
            </Box>

            {/* Tab Content */}
            <Box maxHeight="50vh" overflow="auto">
              {/* Search Results Tab */}
              {currentTab === 0 && (
                <>
                  {/* Search Insights */}
                  {search && isSemanticSearch && (
                    <Box p={2} pb={1}>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                        <Icon icon="sparkles" width={16} height={16} />
                        <Typography variant="caption" color="primary.main" fontWeight={600}>
                          Semantic Search Active
                        </Typography>
                      </Stack>

                      {categories.length > 0 && (
                        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 0.5 }}>
                          {categories.map(({ category, count }) => (
                            <Chip
                              key={category}
                              label={`${category} (${count})`}
                              size="small"
                              variant="outlined"
                              color="primary"
                            />
                          ))}
                        </Stack>
                      )}
                    </Box>
                  )}

                  {/* Search Suggestions */}
                  {showSuggestions && suggestions.length > 0 && (
                    <>
                      <Box p={2} pb={1}>
                        <Box
                          component="div"
                          sx={{
                            fontSize: '0.75rem',
                            color: 'text.secondary',
                            fontWeight: 600,
                            mb: 1,
                            display: 'block'
                          }}
                        >
                          SUGGESTIONS
                        </Box>
                        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 0.5 }}>
                          {suggestions.map(suggestion => (
                            <Chip
                              key={suggestion}
                              label={suggestion}
                              size="small"
                              variant="outlined"
                              onClick={() => onSelectSuggestion(suggestion)}
                              sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'action.hover' } }}
                            />
                          ))}
                        </Stack>
                      </Box>
                      <Divider />
                    </>
                  )}

                  {/* Search Results */}
                  {options.length > 0 ? (
                    <>
                      {search && (
                        <Box p={2} pb={1}>
                          <Box
                            component="div"
                            sx={{
                              fontSize: '0.75rem',
                              color: 'text.secondary',
                              fontWeight: 600
                            }}
                          >
                            {isSemanticSearch ? 'SMART RESULTS' : 'MENU RESULTS'} ({options.length})
                          </Box>
                        </Box>
                      )}
                      {options.map(({ label, path }, index: number) => (
                        <Box key={path} position="relative">
                          <SearchPageItem
                            isFocused={focused === index}
                            index={index}
                            label={Array.isArray(label) ? label[0] : label}
                            path={path}
                            search={search}
                            onClose={onClose}
                          />
                          <IconButton
                            size="small"
                            sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }}
                            onClick={e => {
                              e.stopPropagation();
                              toggleBookmark({ title: Array.isArray(label) ? label[0] : label, path });
                            }}
                          >
                            {isPageBookmarked(path) ? (
                              <Bookmark fontSize="small" color="primary" />
                            ) : (
                              <BookmarkBorder fontSize="small" />
                            )}
                          </IconButton>
                        </Box>
                      ))}
                    </>
                  ) : search ? (
                    <Box p={3} textAlign="center">
                      <Icon icon="search-off" width={24} height={24} style={{ color: '#999', marginBottom: '8px' }} />
                      <Typography variant="body2" color="text.secondary">
                        No results found for "{search}"
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Try different keywords or check spelling
                      </Typography>
                    </Box>
                  ) : (
                    <Box p={3} textAlign="center">
                      <Icon icon="search" width={24} height={24} style={{ color: '#999', marginBottom: '8px' }} />
                      <Typography variant="body2" color="text.secondary">
                        Start typing to search documentation...
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Use Ctrl+K to quickly access search
                      </Typography>
                    </Box>
                  )}
                </>
              )}

              {/* History & Bookmarks Tabs */}
              {(currentTab === 1 || currentTab === 2) && (
                <SearchHistoryComponent
                  searchHistory={currentTab === 1 ? searchHistory : []}
                  bookmarkedPages={currentTab === 2 ? bookmarkedPages : []}
                  onHistoryClick={handleHistoryClick}
                  onBookmarkClick={handleBookmarkClick}
                  onRemoveHistory={removeFromHistory}
                  onRemoveBookmark={removeBookmark}
                  onClearHistory={clearSearchHistory}
                  showHistory={true}
                />
              )}
            </Box>
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default SearchPageAdvanced;
