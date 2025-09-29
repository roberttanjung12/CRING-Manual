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
  Divider
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Icon } from '@iconify/react';
import SearchPageItem from './components/Item';
import type { TypeSearchPageProps } from './type';
import useSearchPageEnhanced from './useSearchPageEnhanced';

/**
 * Enhanced SearchPage component with semantic search capabilities
 *
 * Features:
 * - Semantic search based on content meaning
 * - Search suggestions and autocomplete
 * - Category filtering and insights
 * - Search analytics and history
 * - Fallback to legacy menu-based search
 *
 * @returns {React.JSX}
 */
const SearchPageEnhanced = ({ localName, menu, shape }: TypeSearchPageProps): Readonly<ReactNode> => {
  const { search, options, suggestions, categories, isSemanticSearch, onDefine, onChange } = useSearchPageEnhanced({
    localName,
    menu,
    shape
  });

  const ref = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [focused, setFocused] = useState<number>(-1);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const onClose = () => {
    setIsOpen(false);
    setIsFocused(false);
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

  const onSelectSuggestion = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
    setIsOpen(true);
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
  }, [isOpen, focused, options, onFocused, onInput]);

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

  return (
    <ClickAwayListener
      onClickAway={() => {
        if (!isFocused) onClose();
      }}
    >
      <Box position="relative" width={320} ref={ref}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Search documentation... (Ctrl+K)"
          value={search}
          onFocus={() => {
            setIsOpen(search.length > 0);
            setShowSuggestions(search.length >= 2 && suggestions.length > 0);
          }}
          onBlur={() => {
            if (!isFocused) {
              setTimeout(() => {
                onClose();
              }, 200);
            }
          }}
          onKeyDown={event => {
            if (['Tab', 'ArrowDown', 'ArrowUp'].includes(event.key)) setIsFocused(true);
          }}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: search && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => {
                    onChange('');
                    onClose();
                  }}
                >
                  <HighlightOffIcon fontSize="small" />
                </IconButton>
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
            position="absolute"
            top="100%"
            left={0}
            maxHeight="60vh"
            width="100%"
            overflow="hidden"
            bgcolor="background.paper"
            borderRadius={1}
            boxShadow={3}
            zIndex={1300}
            sx={{ mt: 0.5 }}
          >
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
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight={600}
                    sx={{ mb: 1, display: 'block' }}
                  >
                    SUGGESTIONS
                  </Typography>
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
            <Box maxHeight="40vh" overflow="auto">
              {options.length > 0 ? (
                <>
                  {search && (
                    <Box p={2} pb={1}>
                      <Typography variant="caption" color="text.secondary" fontWeight={600}>
                        {isSemanticSearch ? 'SMART RESULTS' : 'MENU RESULTS'} ({options.length})
                      </Typography>
                    </Box>
                  )}
                  {options.map(({ label, path }, index: number) => (
                    <SearchPageItem
                      key={path}
                      isFocused={focused === index}
                      index={index}
                      label={Array.isArray(label) ? label[0] : label}
                      path={path}
                      search={search}
                      onClose={onClose}
                    />
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
            </Box>
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default SearchPageEnhanced;
