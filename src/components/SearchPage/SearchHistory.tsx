import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Chip,
  Stack,
  Divider
} from '@mui/material';
import {
  History,
  DeleteOutlined,
  Delete as DeleteIcon,
  Search as SearchIcon,
  AccessTime as AccessTimeIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon
} from '@mui/icons-material';

export interface SearchHistoryItem {
  id: string;
  query: string;
  timestamp: Date;
  results: number;
}

export interface BookmarkedPage {
  id: string;
  title: string;
  path: string;
  category: string;
  bookmarkedAt: Date;
}

export interface SearchHistoryProps {
  searchHistory: SearchHistoryItem[];
  bookmarkedPages: BookmarkedPage[];
  onHistoryClick: (query: string) => void;
  onBookmarkClick: (path: string) => void;
  onRemoveHistory: (id: string) => void;
  onRemoveBookmark: (id: string) => void;
  onClearHistory: () => void;
  showHistory: boolean;
}

const SearchHistoryComponent: React.FC<SearchHistoryProps> = ({
  searchHistory,
  bookmarkedPages,
  onHistoryClick,
  onBookmarkClick,
  onRemoveHistory,
  onRemoveBookmark,
  onClearHistory,
  showHistory
}) => {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Baru saja';
    if (diffInHours < 24) return `${diffInHours} jam lalu`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)} hari lalu`;

    return date.toLocaleDateString('id-ID');
  };

  if (!showHistory) return null;

  return (
    <Box sx={{ maxHeight: '400px', overflow: 'auto' }}>
      {/* Search History Section */}
      {searchHistory.length > 0 && (
        <>
          <Box sx={{ p: 2, pb: 1 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack direction="row" alignItems="center" spacing={1}>
                <History fontSize="small" />
                <Typography variant="subtitle2" fontWeight={600}>
                  Riwayat Pencarian
                </Typography>
              </Stack>
              <IconButton size="small" onClick={onClearHistory} title="Hapus semua riwayat">
                <DeleteOutlined fontSize="small" />
              </IconButton>
            </Stack>
          </Box>

          <List dense sx={{ pt: 0 }}>
            {searchHistory.slice(0, 5).map(item => (
              <ListItem
                key={item.id}
                disablePadding
                secondaryAction={
                  <IconButton size="small" onClick={() => onRemoveHistory(item.id)} title="Hapus dari riwayat">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                }
              >
                <ListItemButton onClick={() => onHistoryClick(item.query)}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <SearchIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.query}
                    secondary={
                      <Box component="div" sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                        <AccessTimeIcon fontSize="inherit" />
                        <span>{formatTime(item.timestamp)}</span>
                        <Chip
                          size="small"
                          label={`${item.results} hasil`}
                          variant="outlined"
                          sx={{ height: 20, fontSize: '0.7rem' }}
                        />
                      </Box>
                    }
                    secondaryTypographyProps={{ component: 'div' }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          {bookmarkedPages.length > 0 && <Divider />}
        </>
      )}

      {/* Bookmarked Pages Section */}
      {bookmarkedPages.length > 0 && (
        <>
          <Box sx={{ p: 2, pb: 1 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <BookmarkIcon fontSize="small" />
              <Typography variant="subtitle2" fontWeight={600}>
                Halaman Tersimpan
              </Typography>
            </Stack>
          </Box>

          <List dense sx={{ pt: 0 }}>
            {bookmarkedPages.slice(0, 5).map(bookmark => (
              <ListItem
                key={bookmark.id}
                disablePadding
                secondaryAction={
                  <IconButton size="small" onClick={() => onRemoveBookmark(bookmark.id)} title="Hapus dari bookmark">
                    <BookmarkBorderIcon fontSize="small" />
                  </IconButton>
                }
              >
                <ListItemButton onClick={() => onBookmarkClick(bookmark.path)}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <BookmarkIcon fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={bookmark.title}
                    secondary={
                      <Box component="div" sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                        <Chip
                          size="small"
                          label={bookmark.category}
                          color="primary"
                          variant="outlined"
                          sx={{ height: 20, fontSize: '0.7rem' }}
                        />
                        <AccessTimeIcon fontSize="inherit" />
                        <span>{formatTime(bookmark.bookmarkedAt)}</span>
                      </Box>
                    }
                    secondaryTypographyProps={{ component: 'div' }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      )}

      {searchHistory.length === 0 && bookmarkedPages.length === 0 && (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Belum ada riwayat pencarian atau halaman tersimpan
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SearchHistoryComponent;
