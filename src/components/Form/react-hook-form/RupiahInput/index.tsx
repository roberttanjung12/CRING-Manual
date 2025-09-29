import { NumericFormat } from 'react-number-format';
import RHFRupiahInputFieldRender from './components/FieldRender';

interface RHFRupiahInputProps {
  isDisabled?: boolean;
  value?: number | string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * A React component that renders a numeric input field formatted as Rupiah currency,
 * integrated with react-hook-form. It uses a custom input renderer and supports
 * thousand separators for better readability.
 *
 * @param {Object} props - The component props.
 * @param {boolean} [props.isDisabled=false] - If true, disables the input field.
 * @param {string} [props.value=''] - The current value of the input field.
 * @param {(event: React.ChangeEvent<HTMLInputElement>) => void} [props.onChange=() => null] - Callback fired when the input value changes.
 *
 * @returns {JSX.Element} The formatted Rupiah input component.
 */
const RHFRupiahInput = ({ isDisabled = false, value = '', onChange = () => null }: RHFRupiahInputProps) => {
  return (
    <NumericFormat
      thousandSeparator
      customInput={RHFRupiahInputFieldRender}
      disabled={isDisabled}
      value={value}
      onChange={onChange}
    />
  );
};

export default RHFRupiahInput;
