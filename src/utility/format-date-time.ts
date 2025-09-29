import moment, { type Moment } from 'moment';

/**
 * Converts an ISO 8601 date string into a locale-formatted date string (MM/DD/YYYY).
 * Handles "zero" dates ('0001-01-01T00:00:00Z') and invalid inputs by returning -.
 *
 * @param isoDateString - The date string in ISO 8601 format, e.g., '2023-10-26T14:35:00Z'.
 * @returns A date string in MM/DD/YYYY format (e.g., "07/12/2023"), or an empty string if input is invalid or a "zero" date.
 */
export const getLocaleDate = (isoDateString: string): string => {
  if (!isoDateString || isoDateString === '0001-01-01T00:00:00Z') {
    return '-';
  }

  try {
    const date = new Date(isoDateString);

    if (isNaN(date.getTime())) {
      return '';
    }

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };

    return date.toLocaleDateString('id-ID', options);
  } catch (error) {
    console.error('Error formatting date:', error);

    return '';
  }
};

/**
 * Converts an ISO 8601 date string into a locale-formatted time string (HH:MM:SS).
 * Handles "zero" dates ('0001-01-01T00:00:00Z') and invalid inputs by returning -.
 *
 * @param isoDateString - The date string in ISO 8601 format, e.g., '2023-10-26T14:35:00Z'.
 * @returns A time string in HH:MM:SS format (e.g., "15:41:42"), or an empty string if input is invalid or a "zero" date.
 */
export const getLocaleTime = (isoDateString: string): string => {
  if (!isoDateString || isoDateString === '0001-01-01T00:00:00Z') {
    return '-';
  }

  try {
    const date = new Date(isoDateString);

    if (isNaN(date.getTime())) {
      return '';
    }

    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };

    return date.toLocaleTimeString('en-US', options);
  } catch (error) {
    console.error('Error formatting time:', error);

    return '';
  }
};

/**
 * Formats a date input (string, Date, or Moment) using a specified format.
 * Returns a fallback character if the input is invalid.
 *
 * @param dateInput - The date to format (ISO string, Date object, or Moment).
 * @param format - The desired output format (default: 'DD-MM-YYYY').
 * @param emptyChar - The character to return if the date is invalid (default: '-').
 * @returns The formatted date string or the fallback character if invalid.
 */
export const formatDate = (
  dateInput: string | Date | Moment,
  format: string = 'DD-MM-YYYY',
  emptyChar: string = ''
): string => {
  const parsedDate = moment(dateInput);

  if (!parsedDate.isValid()) return emptyChar;

  try {
    return parsedDate.format(format);
  } catch (error) {
    console.error('Error formatting date:', error);

    return emptyChar;
  }
};
