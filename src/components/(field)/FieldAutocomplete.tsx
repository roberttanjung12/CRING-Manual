import { type ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import AutocompleteAsync from '@/components/(input)/AutocompleteAsync';
import ReactHookFromErrorMsg from '@/components/Form/ReactHookFormErrorMsg';
import type { AutocompleteAsyncProps } from '../(input)/AutocompleteAsync/type';
import WrapperField from '../(wrapper)/WrapperField';

interface Props {
  /**
   * The label text displayed above the autocomplete field
   */
  label: string;
  /**
   * The field name used for form registration and error handling
   */
  name: string;
  /**
   * Configuration object for the autocomplete functionality
   */
  autocomplete: AutocompleteAsyncProps;
  /**
   * Whether the autocomplete field is disabled
   */
  disabled?: boolean;
  /**
   * Whether the select field is required
   */
  required?: boolean;
  /**
   * Callback function called after the autocomplete value changes
   * @param value The new value of the autocomplete field
   */
  onAfterChange?: (value: { [key: string]: any }) => void;
}

/**
 * A form field component that provides autocomplete functionality using react-hook-form.
 *
 * @param props - The component props
 * @param props.label - The label text to display above the autocomplete field
 * @param props.name - The name of the form field, used for form registration and validation
 * @param props.autocomplete - Configuration object containing service and shapes for autocomplete behavior
 * @param props.autocomplete.service - The service used to fetch autocomplete suggestions
 * @param props.autocomplete.shapes - The shapes/schema used to format autocomplete data
 * @param props.disabled - Whether the autocomplete field should be disabled
 * @param props.onAfterChange - Optional callback function triggered when the autocomplete value changes
 *
 * @returns {React.JSX} A readonly React node containing the autocomplete field with label and error handling
 *
 * @example
 * ```tsx
 * <FieldAutocomplete
 *   label="Select Country"
 *   name="country"
 *   autocomplete={{
 *     service: countryService,
 *     shapes: countryShapes
 *   }}
 *   disabled={false}
 *   onAfterChange={(value) => console.log('Selected:', value)}
 * />
 * ```
 */
const FieldAutocomplete = ({
  label,
  name,
  autocomplete,
  disabled,
  required,
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
        render={({ formState: { errors: newErrors }, field: { value, onChange } }) => (
          <AutocompleteAsync
            id={`field--${name}`}
            disabled={disabled}
            service={autocomplete.service}
            shapes={autocomplete.shapes}
            value={value}
            error={!!newErrors[name]}
            placeholder={`-Pilih ${label}-`}
            onChange={newValue => {
              const getValue = newValue || { value: '', text: '' };

              onChange(getValue);
              onAfterChange?.(getValue);
            }}
          />
        )}
      />
      <ReactHookFromErrorMsg error={errors} field={`${name}.value`} type="ori" />
    </WrapperField>
  );
};

export default FieldAutocomplete;
