'use client';

import { type ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import AutocompleteAsync from '@/components/(input)/AutocompleteAsync';
import type { FilterAutocompleteAsyncProps } from './type';

/**
 * A filter component that provides an asynchronous autocomplete dropdown.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} [props.isOpen=true] - Determines if the filter is displayed.
 * @param {string} [props.id='autocomplete'] - Unique identifier for the autocomplete field.
 * @param {string} props.label - The label displayed above the autocomplete field.
 * @param {Function} props.service - The service function to fetch autocomplete options.
 * @param {Object} props.shapes - Configuration for the data shapes/structure.
 * @param {string} props.query - The query parameter name used in filtering.
 * @param {boolean} [props.disabled] - Determines if the autocomplete is disabled.
 * @param {Object} [props.params] - Current filter parameters.
 * @param {Function} props.onFilterGo - Callback function triggered when selection changes.
 *
 * @returns {React.JSX} The rendered filter autocomplete component.
 */
const FilterAutocompleteAsync = ({
  isOpen = true,
  id = 'autocomplete',
  label,
  service,
  shapes,
  query,
  params,
  disabled,
  onFilterGo
}: FilterAutocompleteAsyncProps): Readonly<ReactNode> => {
  return (
    isOpen && (
      <Box data-testid="FilterAutcomleteAsync">
        <Typography component="label" fontWeight={600}>
          {label}
        </Typography>
        <Box mt={2}>
          <AutocompleteAsync
            id={`filter--${id}`}
            disabled={disabled}
            service={service}
            shapes={shapes}
            value={params?.[query]}
            placeholder={`-Pilih ${label}-`}
            onChange={value => {
              onFilterGo({
                ...params,
                [query]: value ? { value: value?.value, text: value?.text } : undefined,
                page: 1
              });
            }}
          />
        </Box>
      </Box>
    )
  );
};

export default FilterAutocompleteAsync;
