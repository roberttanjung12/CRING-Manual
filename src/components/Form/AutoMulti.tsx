import { useMemo, useState, type ReactNode } from 'react';
import { Autocomplete, Box, TextField } from '@mui/material';
import qs from 'qs';
import useSWRImmutable from 'swr/immutable';
import type { TypeServices } from '@/configs/service-ts';
import useDebounce from '@/hooks/useDebounce';

interface TypeOption {
  value: string;
  label: string;
}

interface TypeProp {
  value: Array<TypeOption>;
  service: (param?: { [key: string]: any }) => Promise<TypeServices>;
  onChange: (value: Array<TypeOption>) => void;
  isAsync?: boolean;
  id?: string;
  options?: Array<TypeOption>;
  limit?: number;
  disabled?: boolean;
  param?: { [key: string]: any };
  shape?: TypeOption;
  search?: string;
  placeholder?: string;
  width?: number | string;
}

/**
 * A component that's designed for managing autocomplete-multiple.
 *
 * @author Robert Tanjung <robert.tanjung@spesolution.com>
 *
 * @param {Object} props list of prop
 * @param {Boolean} props.isAsync status of async, whether it's asyncronous or static
 * @param {String} props.id identity of component
 * @param {String} props.options list of option
 * @param {TypeOption} props.shape shape of response the serivce
 * @param {String} props.search key of search param
 * @param {Array<TypeOption>} props.value currently value
 * @param {Object} props.disabled status of component
 * @param {Object} props.param list of param
 * @param {String} props.placeholder placeholder of component
 * @param {String} props.limit limitation of data
 * @param {Number} props.width width of component
 * @param {Function} props.service is used for requesting
 * @param {Function} props.onChange is used for change new value
 *
 * @returns {React.JSX}
 */
const AutoMulti = ({
  isAsync,
  id,
  options,
  shape,
  search,
  value,
  disabled,
  param,
  service,
  placeholder,
  onChange,
  limit = 1,
  width = 300
}: TypeProp): Readonly<ReactNode> => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [searching, setSearching] = useState<string>('');

  const debouncedSearching = useDebounce(searching, 500);

  const isCall = useMemo<boolean>(() => !!isAsync && isOpen, [isAsync, isOpen]);

  const { isLoading, data } = useSWRImmutable<TypeServices>(
    isCall && `/component/autocomplete?${qs.stringify({ search: debouncedSearching, ...param })}`,
    () => service({ ...param, [search as string]: debouncedSearching })
  );

  const newOptions = useMemo<Array<TypeOption>>(() => {
    let set: Array<TypeOption> = [];

    if (!isAsync) {
      if (Array.isArray(options)) set = options;
    } else if (isOpen) {
      if (data?.status && Array.isArray(data?.data?.data) && shape?.value) {
        data?.data?.data.forEach(item => {
          set.push({
            value: typeof item === 'string' ? item : item[shape.value],
            label: typeof item === 'string' ? item : item[shape.label]
          });
        });
      }
    }

    return set;
  }, [data?.data?.data, data?.status, isAsync, isOpen, options, shape?.label, shape?.value]);

  const filteredOptions = useMemo<Array<TypeOption>>(() => {
    const set: Array<TypeOption> = [];
    const newValue: Array<TypeOption> = value?.length ? value : [];

    newOptions.forEach(item => {
      if (!newValue.map(({ value }) => value).includes(item.value)) set.push(item);
    });

    return set;
  }, [newOptions, value]);

  const onOpen = () => {
    setSearching('');
    setIsOpen(true);
  };

  return (
    <Box data-testid="AutoMulti" position="relative" height={40} width={{ xs: 250, lg: width }}>
      <Box position="absolute" top={0} left={0} height="100%" width="100%">
        <Autocomplete
          multiple
          id={id}
          open={isOpen}
          loading={isLoading}
          limitTags={limit}
          options={filteredOptions}
          disabled={disabled}
          value={value}
          getOptionKey={({ value }) => value}
          getOptionLabel={({ label }) => label}
          sx={{
            minWidth: { xs: 150, lg: 250 },
            maxWidth: { xs: 300, lg: width === 300 ? 600 : width },
            width: '100%',
            '.MuiInputBase-root': {
              minHeight: 40,
              height: 'auto'
            },
            '.MuiChip-label': {
              paddingTop: 1,
              marginRight: 2
            }
          }}
          renderInput={params => (
            <TextField
              {...params}
              placeholder={!value.length ? placeholder : 'Ketuk untuk mencari'}
              onChange={event => setSearching(event.target.value)}
            />
          )}
          onOpen={onOpen}
          onClose={() => setIsOpen(false)}
          onChange={(oldValue, newValue) => onChange(newValue)}
        />
      </Box>
    </Box>
  );
};

export default AutoMulti;
