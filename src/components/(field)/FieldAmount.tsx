import { type ReactNode, type HTMLInputTypeAttribute } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { InputAdornment, TextField, type TextFieldProps } from '@mui/material';
import ReactHookFromErrorMsg from '@/components/Form/ReactHookFormErrorMsg';
import WrapperField from '../(wrapper)/WrapperField';

interface Props {
  /**
   * The label text displayed above the input field
   */
  label: string;
  /**
   * The name of the field, used for form registration and error handling
   */
  name: string;
  /**
   * The currency type for the amount field
   */
  currency?: 'Rp' | 'IDR' | '%';
  /**
   * Whether the input field is disabled
   */
  disabled?: boolean;
  /**
   * Whether the select field is required
   */
  required?: boolean;
  /**
   * The input type, defaults to 'text'. Use 'textarea' for multiline input
   */
  type?: HTMLInputTypeAttribute;
  /**
   * Props to be passed to the underlying TextField component
   */
  fieldProps?: TextFieldProps;
  /**
   * Callback function triggered after the field value changes
   * @param value The new value of the field
   */
  onAfterChange?: (value?: string) => void;
}

const FieldAmount = ({
  label,
  name,
  currency = 'Rp',
  disabled,
  required,
  type = 'text',
  fieldProps,
  onAfterChange
}: Props): Readonly<ReactNode> => {
  const {
    formState: { errors },
    control
  } = useFormContext();

  return (
    <WrapperField label={label} required={required}>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <TextField
            fullWidth
            id={`field--${name}`}
            name={`field--${name}`}
            disabled={disabled}
            type={type}
            multiline={type === 'textarea'}
            error={!!errors[name]}
            value={value}
            minRows={type === 'textarea' ? 3 : undefined}
            placeholder={`Masukkan ${label}`}
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start">{currency}</InputAdornment>
              }
            }}
            onChange={event => {
              const inputValue = event.target.value.replace(/[^0-9.]/g, '');
              const parts = inputValue.split('.');
              const integerPart = parts[0];
              const decimalPart = parts.length > 1 ? '.' + parts.slice(1).join('') : '';
              const newValue = integerPart ? Number(integerPart).toLocaleString() + decimalPart : '';

              onChange(newValue);
              onAfterChange?.(newValue);
            }}
            {...fieldProps}
          />
        )}
      />
      <ReactHookFromErrorMsg error={errors} field={name} type="ori" />
    </WrapperField>
  );
};

export default FieldAmount;
