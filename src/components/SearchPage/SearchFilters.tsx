import React from 'react';
import {
  Box,
  Chip,
  Typography,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Stack,
  type SelectChangeEvent
} from '@mui/material';
import { Tune, Category, Speed, TypeSpecimen, HighlightOff } from '@mui/icons-material';

export interface SearchFilters {
  category: string;
  type: string;
  complexity: string;
}

export interface SearchFiltersProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  categories: string[];
  types: string[];
  showFilters: boolean;
}

const SearchFiltersComponent: React.FC<SearchFiltersProps> = ({
  filters,
  onFilterChange,
  categories,
  types,
  showFilters
}) => {
  const handleFilterChange = (key: keyof SearchFilters) => (event: SelectChangeEvent<string>) => {
    onFilterChange({
      ...filters,
      [key]: event.target.value
    });
  };

  const clearFilters = () => {
    onFilterChange({
      category: '',
      type: '',
      complexity: ''
    });
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  if (!showFilters) return null;

  return (
    <Box
      className="search-filters-dropdown"
      onMouseDown={e => e.stopPropagation()}
      onClick={e => e.stopPropagation()}
      onKeyDown={e => e.stopPropagation()}
      sx={{
        p: 2,
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper'
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1} mb={2.5}>
        <Tune fontSize="small" color="primary" />
        <Typography variant="subtitle2" fontWeight={600} color="text.primary">
          Filter Pencarian
        </Typography>
        {activeFiltersCount > 0 && (
          <Chip
            size="small"
            label={`${activeFiltersCount} filter aktif`}
            onDelete={clearFilters}
            variant="outlined"
            color="primary"
            deleteIcon={<HighlightOff fontSize="small" />}
            sx={{
              ml: 'auto',
              fontSize: '0.75rem',
              height: 22
            }}
          />
        )}
      </Stack>

      <Stack
        direction="column"
        spacing={2}
        sx={{
          '& .MuiFormControl-root': {
            width: '100%'
          }
        }}
      >
        <FormControl size="small">
          <InputLabel>Kategori</InputLabel>
          <Select
            value={filters.category}
            label="Kategori"
            onChange={handleFilterChange('category')}
            onFocus={e => e.stopPropagation()}
            onMouseDown={e => e.stopPropagation()}
            sx={{
              '& .MuiSelect-select': {
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }
            }}
            MenuProps={{
              disableScrollLock: true,
              PaperProps: {
                onMouseDown: (e: React.MouseEvent) => e.stopPropagation()
              }
            }}
          >
            <MenuItem value="">
              <em>Semua Kategori</em>
            </MenuItem>
            {categories.map(category => (
              <MenuItem key={category} value={category} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Category fontSize="small" />
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small">
          <InputLabel>Tipe</InputLabel>
          <Select
            value={filters.type}
            label="Tipe"
            onChange={handleFilterChange('type')}
            onFocus={e => e.stopPropagation()}
            onMouseDown={e => e.stopPropagation()}
            sx={{
              '& .MuiSelect-select': {
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }
            }}
            MenuProps={{
              disableScrollLock: true,
              PaperProps: {
                onMouseDown: (e: React.MouseEvent) => e.stopPropagation()
              }
            }}
          >
            <MenuItem value="">
              <em>Semua Tipe</em>
            </MenuItem>
            {types.map(type => (
              <MenuItem key={type} value={type} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TypeSpecimen fontSize="small" />
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small">
          <InputLabel>Kompleksitas</InputLabel>
          <Select
            value={filters.complexity}
            label="Kompleksitas"
            onChange={handleFilterChange('complexity')}
            onFocus={e => e.stopPropagation()}
            onMouseDown={e => e.stopPropagation()}
            sx={{
              '& .MuiSelect-select': {
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }
            }}
            MenuProps={{
              disableScrollLock: true,
              PaperProps: {
                onMouseDown: (e: React.MouseEvent) => e.stopPropagation()
              }
            }}
          >
            <MenuItem value="">
              <em>Semua Level</em>
            </MenuItem>
            <MenuItem value="beginner" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Speed fontSize="small" />
              <Chip size="small" label="Pemula" color="success" variant="outlined" />
            </MenuItem>
            <MenuItem value="intermediate" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Speed fontSize="small" />
              <Chip size="small" label="Menengah" color="warning" variant="outlined" />
            </MenuItem>
            <MenuItem value="advanced" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Speed fontSize="small" />
              <Chip size="small" label="Lanjutan" color="error" variant="outlined" />
            </MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
};

export default SearchFiltersComponent;
