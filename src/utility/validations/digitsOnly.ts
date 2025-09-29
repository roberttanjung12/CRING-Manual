/**
 * A util that's used for validation only number
 *
 * @param {String} value value of field
 *
 * @returns {Boolean} status of validation
 */
const validationDigitOnly = (value?: number | string): boolean => {
  let set = true;
  const newValue = value ? String(value) : '';

  if (newValue || newValue === '0') {
    if (!/^\d+$/.test(newValue)) set = false;
  }

  return set;
};

export default validationDigitOnly;
