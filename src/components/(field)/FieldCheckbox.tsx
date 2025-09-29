import React, { type ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox, FormControlLabel, type FormControlLabelProps } from '@mui/material';

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
   * Props to be passed to the underlying TextField component
   */
  checkboxProps?: FormControlLabelProps;
  /**
   * Callback function triggered after the field value changes
   * @param value The new value of the field
   */
  onAfterChange?: (value?: boolean) => void;
}

/**
 * A controlled checkbox field component that integrates with React Hook Form.
 *
 * @returns {React.JSX} A readonly React node containing the controlled checkbox field
 *
 * @example
 * ```tsx
 * <FieldCheckbox
 *   name="agreeToTerms"
 *   label="I agree to the terms and conditions"
 *   onAfterChange={(checked) => console.log('Checkbox changed:', checked)}
 * />
 * ```
 */
const FieldCheckbox = ({ label, name, disabled, checkboxProps, onAfterChange }: Props): Readonly<ReactNode> => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { name, value, onChange } }) => (
        <FormControlLabel
          id={`field--${name}`}
          name={`field--${name}`}
          disabled={disabled}
          checked={!!value}
          control={<Checkbox />}
          label={label}
          onChange={(event, checked) => {
            onChange(checked);
            onAfterChange?.(checked);
          }}
          {...checkboxProps}
        />
      )}
    />
  );
};

export default FieldCheckbox;
