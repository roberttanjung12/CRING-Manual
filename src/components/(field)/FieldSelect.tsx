import { type ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { MenuItem, Select, type SelectProps } from '@mui/material';
import ReactHookFromErrorMsg from '@/components/Form/ReactHookFormErrorMsg';
import type { Option } from '@/types/option';
import selectedText from '@/utility/selected-text';
import WrapperField from '../(wrapper)/WrapperField';

interface Props {
  /**
   * The label text displayed above the select field
   */
  label: string;
  /**
   * The field name used for form registration and error handling
   */
  name: string;
  /**
   * An array of options for the select dropdown
   */
  options: Option[];
  /**
   * Whether the select field is disabled
   */
  disabled?: boolean;
  /**
   * Whether the select field is required
   */
  required?: boolean;
  /**
   * Props to be passed to the underlying Select component
   */
  selectProps?: Omit<SelectProps, 'children' | 'renderValue' | 'defaultValue'>;
  /**
   * Callback function called after the select value changes
   */
  onAfterChange?: (value?: string) => void;
}

/**
 * A reusable select field component that integrates with React Hook Form.
 *
 * @returns {React.JSX} A readonly React node containing the select field with label and error handling
 *
 * @example
 * ```tsx
 * <FieldSelect
 *   label="Country"
 *   name="country"
 *   options={[
 *     { value: "us", text: "United States" },
 *     { value: "ca", text: "Canada" }
 *   ]}
 *   onAfterChange={(value) => console.log('Selected:', value)}
 * />
 * ```
 */
const FieldSelect = ({
  label,
  name,
  options,
  disabled,
  required,
  selectProps,
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
          <Select
            displayEmpty
            fullWidth
            id={`field--${name}`}
            name={`field--${name}`}
            disabled={disabled}
            value={value}
            error={!!errors[name]}
            variant="outlined"
            renderValue={(selected?: string) => selectedText(selected, options)}
            onChange={event => {
              onChange(event.target.value);
              onAfterChange?.(event.target.value);
            }}
            {...selectProps}
          >
            {options.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.text}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      <ReactHookFromErrorMsg error={errors} field={name} type="ori" />
    </WrapperField>
  );
};

export default FieldSelect;
