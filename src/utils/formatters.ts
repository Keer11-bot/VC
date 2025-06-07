/**
 * Formats a number as currency
 * @param value - The value to format
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number): string => {
  // For values greater than or equal to 1 million
  if (value >= 1000000) {
    const millions = value / 1000000;
    // Format with 2 decimal places for millions
    return `$${millions.toFixed(2)} Million`;
  }
  
  // For values less than 1 million
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
};

/**
 * Truncates a string to a given length
 * @param str - The string to truncate
 * @param length - The maximum length
 * @returns Truncated string
 */
export const truncateString = (str: string, length: number): string => {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
};