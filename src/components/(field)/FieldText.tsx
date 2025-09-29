import { type ReactNode, type HTMLInputTypeAttribute } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField, type TextFieldProps } from '@mui/material';
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

/**
 * A reusable text field component that integrates with React Hook Form.
 *
 * @returns {React.JSX} A JSX element containing a labeled text field with error handling
 *
 * @example
 * ```tsx
 * <FieldText
 *   label="Email Address"
 *   name="email"
 *   type="email"
 *   onAfterChange={(value) => console.log('Email changed:', value)}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <FieldText
 *   label="Description"
 *   name="description"
 *   type="textarea"
 *   disabled={isReadOnly}
 * />
 * ```
 */
const FieldText = ({
  label,
  name,
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
            onChange={event => {
              onChange(event.target.value);
              onAfterChange?.(event.target.value);
            }}
            {...fieldProps}
          />
        )}
      />
      <ReactHookFromErrorMsg error={errors} field={name} type="ori" />
    </WrapperField>
  );
};

export default FieldText;
