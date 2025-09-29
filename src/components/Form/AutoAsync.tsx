import { type ReactNode, useMemo, useState } from 'react';
import { InputAdornment } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import useSWR from 'swr';
import { type TypeServices } from '@/configs/service-ts';
import useDebounce from '@/hooks/useDebounce';

type TypeValue<T = { [key: string]: any }> = T;

interface TypeShape {
  key: string;
  value: string;
}

interface Type<T = { [key: string]: any }> {
  service: (args: TypeValue<T>) => Promise<TypeServices>;
  serviceKeyword: string;
  onChange: (args: TypeValue<T>) => void;
  isReset?: boolean;
  id?: string;
  disabled?: boolean;
  disableOpt?: TypeShape[];
  shapeData?: TypeShape[];
  serviceValue?: string;
  serviceText?: string;
  getLabel?: string;
  getValue?: string;
  value?: TypeValue<T>;
  params?: TypeValue<T>;
  placeholder?: string;
  sx?: TypeValue<T>;
  onBlur?: () => void;
}

/**
 * A component that's designed for showing autocomplete asynchronous.
 *
 * @author Robert Tanjung <robert.tanjung@spesolution.com>
 *
 * @returns {React.JSX}
 */
const AutoAsync = ({
  service,
  serviceKeyword,
  serviceValue,
  serviceText,
  shapeData,
  disableOpt,
  value,
  params,
  placeholder,
  sx,
  onBlur,
  onChange,
  isReset = false,
  id = 'component-auto-async',
  disabled = false,
  getLabel = 'text',
  getValue = 'value'
}: Type): Readonly<ReactNode> => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [inputValue, setInputValue] = useState<string>('');

  const debouncedInputValue: string = useDebounce(inputValue, 500);

  const { isLoading, data } = useSWR<TypeServices>(isOpen && `/autocomplete/${id}?keyword=${debouncedInputValue}`, () =>
    service({ [serviceKeyword]: debouncedInputValue, limit: '10', ...params })
  );

  const shapes = useMemo<TypeShape[]>(() => {
    const set: TypeShape[] = Array.isArray(shapeData) ? shapeData : [];

    if (!Array.isArray(shapeData)) {
      if (serviceValue) set.push({ key: 'value', value: serviceValue });

      if (serviceText) set.push({ key: 'text', value: serviceText });
    }

    return set;
  }, [serviceText, serviceValue, shapeData]);

  const valueConvert = useMemo<TypeValue>(() => {
    const set: TypeValue = {};

    shapes.forEach(shape => {
      Object.assign(set, { [shape.key]: value ? value[shape.key] : '' });
    });

    return set;
  }, [shapes, value]);

  const options = useMemo(() => {
    const set: TypeValue[] = [];
    const defaultSet: TypeValue = {};

    shapes.forEach(shape => {
      Object.assign(defaultSet, { [shape.key]: '' });
    });

    set.push(defaultSet);

    if (data?.status && Array.isArray(data?.data?.data)) {
      data?.data?.data.forEach(item => {
        const getDisabledOpt = Array.isArray(disableOpt)
          ? disableOpt.find(find => find.value === item[find.key])
          : undefined;

        if (!getDisabledOpt) {
          const newSet: TypeValue = {};

          shapes.forEach(shape => {
            Object.assign(newSet, { [shape.key]: serviceValue === 'NULL' ? item : item[shape.value] });
          });

          set.push(newSet);
        }
      });
    }

    return set;
  }, [data?.data?.data, data?.status, disableOpt, serviceValue, shapes]);

  const onCheck = (newValue: TypeValue | null, cb: () => void) => {
    if (!isReset || (isReset && newValue)) cb();
  };

  const onChangeConvert = (newValue: TypeValue | null): TypeValue => {
    const set = {};

    shapes.forEach(shape => {
      Object.assign(set, { [shape.key]: newValue?.[shape.key] ?? '' });
    });

    return set;
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
      getOptionKey={(option: TypeValue) => option[getValue]}
      getOptionLabel={(option: TypeValue) => option[getLabel]}
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
          placeholder={placeholder}
          sx={{
            background: ({ palette }) => palette.background.paper,
            border: ({ palette }) => `1px solid ${palette.background.default}`
          }}
        />
      )}
      sx={{ minWidth: 200, ...sx }}
      inputValue={inputValue}
      value={valueConvert}
      onBlur={onBlur}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      onInputChange={(e, newValue) => setInputValue(newValue)}
      onChange={(e, newValue) => onCheck(newValue, () => onChange(onChangeConvert(newValue)))}
    />
  );
};

export default AutoAsync;
