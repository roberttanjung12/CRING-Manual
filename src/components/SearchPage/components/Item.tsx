import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';

interface SearchPageItemProps {
  isFocused: boolean;
  index: number;
  label: string;
  path: string;
  search: string;
  onClose: () => void;
}

const SearchPageItem: React.FC<SearchPageItemProps> = ({ isFocused, label, path, search, onClose }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(path);
    onClose();
  };

  const highlightSearch = (text: string, searchTerm: string) => {
    if (!searchTerm.trim()) return text;

    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));

    return parts.map((part, i) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <Typography
          key={i}
          component="span"
          sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', px: 0.5 }}
        >
          {part}
        </Typography>
      ) : (
        part
      )
    );
  };

  return (
    <ListItem disablePadding>
      <ListItemButton
        selected={isFocused}
        onClick={handleClick}
        sx={{
          '&.Mui-selected': {
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            '&:hover': {
              backgroundColor: 'primary.dark'
            }
          }
        }}
      >
        <ListItemText
          primary={<Box component="span">{highlightSearch(label, search)}</Box>}
          secondary={path}
          secondaryTypographyProps={{
            variant: 'caption',
            color: isFocused ? 'inherit' : 'text.secondary'
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default SearchPageItem;
