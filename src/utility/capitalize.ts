/**
 * A util that's used for changing the word to be capitalize.
 *
 * @param {string} str the word that would be changed.
 *
 * @returns {string}
 */
const toCapitalize = (str: string): string => {
  if (!str) return '';

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export default toCapitalize;
