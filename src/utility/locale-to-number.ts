/**
 * Converts a locale-formatted string to a number by removing all non-numeric characters except decimal points.
 *
 * @param val - The locale-formatted string to convert (e.g., "1,234.56", "$100.00")
 * @returns {String} The numeric representation of the input string
 *
 * @example
 * ```typescript
 * localteToNumber("1,234.56"); // returns 1234.56
 * localteToNumber("$100.00"); // returns 100.00
 * localteToNumber("€1.500,50"); // returns 1500.50
 * ```
 */
const localteToNumber = (val: string) => Number(val.replace(/[^0-9.]/g, ''));

export default localteToNumber;
