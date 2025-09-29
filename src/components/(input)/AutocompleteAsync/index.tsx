import { type ReactNode, useMemo, useState } from 'react';
import { InputAdornment } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import qs from 'qs';
import useSWR from 'swr';
import useDebounce from '@/hooks/useDebounce';
import onGetAutocompleteAsync from './service';
import type { AutocompleteAsyncProps } from './type';

/**
 * A component that's designed for showing autocomplete asynchronous.
 *
 * @author Robert Tanjung <robert.tanjung@spesolution.com>
 *
 * @returns {React.JSX}
 */
const AutocompleteAsync = ({
  shapes,
  service,
  disableOpt,
  value,
  error,
  placeholder,
  sx,
  onBlur,
  onChange,
  isReset = false,
  id = 'component-auto-async',
  disabled = false
}: AutocompleteAsyncProps): Readonly<ReactNode> => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [inputValue, setInputValue] = useState<string>('');

  const debouncedInputValue: string = useDebounce(inputValue, 500);

  const valueControlled = useMemo(() => {
    const set: AutocompleteAsyncProps['value'] = {};

    if (value) {
      Object.keys(value).forEach(item => {
        Object.assign(set, { [item]: value[item] });
      });
    } else {
      shapes.forEach(item => {
        Object.assign(set, { [item.field]: '' });
      });
    }

    return set;
  }, [shapes, value]);

  const params = useMemo(() => {
    const set = { limit: '10', ...service?.params };

    service.keyword.forEach(item => {
      Object.assign(set, { [item]: debouncedInputValue });
    });

    return set;
  }, [debouncedInputValue, service.keyword, service?.params]);

  const { isLoading, data } = useSWR(isOpen && `/autocomplete/${id}?${qs.stringify(params)}`, () =>
    onGetAutocompleteAsync(service.endpoint, params)
  );

  const options = useMemo(() => {
    const set: { [key: string]: any }[] = [];

    if (data?.status === 200) {
      data.data.forEach(item => {
        const isAllow = disableOpt?.length ? Boolean(disableOpt.find(find => item[find.field] !== find.value)) : true;

        if (isAllow) {
          const setItem = {};

          shapes.forEach(shape => {
            Object.assign(setItem, {
              [shape.field]: shape.from === 'null' ? item : shape.from === null ? item : item[shape.from]
            });
          });

          set.push(setItem);
        }
      });
    }

    return set;
  }, [data?.data, data?.status, disableOpt, shapes]);

  const onCheck = (newValue: { [key: string]: any } | null, cb: () => void) => {
    if (!isReset || (isReset && newValue)) cb();
  };

  return (
    <Autocomplete
      data-testid="Autocomplete"
      id={id}
      isOptionEqualToValue={() => true}
      loading={isLoading}
      open={isOpen}
      disabled={disabled}
      options={options}
      getOptionKey={option => `${option[shapes[0].field]}-${option[shapes[1].field]}`}
      getOptionLabel={option => option[shapes[1].field]}
      renderInput={inputParams => (
        <TextField
          {...inputParams}
          slotProps={{
            input: {
              ...inputParams.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <>
                  {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                  {inputParams.InputProps.endAdornment}
                </>
              )
            }
          }}
          error={error}
          placeholder={placeholder}
          sx={{
            background: ({ palette }) => palette.background.paper,
            border: ({ palette }) => `1px solid ${palette.background.default}`
          }}
        />
      )}
      sx={{ minWidth: 200, ...sx }}
      inputValue={inputValue}
      value={valueControlled}
      onBlur={onBlur}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      onInputChange={(e, newValue) => setInputValue(newValue)}
      onChange={(e, newValue) => !disabled && onCheck(newValue, () => onChange?.(newValue))}
    />
  );
};

export default AutocompleteAsync;
