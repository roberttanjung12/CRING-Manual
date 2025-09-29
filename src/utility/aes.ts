/**
 * Simple encryption utility for documentation purposes
 * In real application, this would use proper AES encryption
 */

/**
 * Simple mock encryption function
 * @param value - Value to encrypt
 * @returns Base64 encoded value (mock encryption)
 */
const onEncrypt = (value: string): string => {
  // For documentation purposes, we'll use simple base64 encoding
  // In production, this should use proper AES encryption
  return btoa(value);
};

export default onEncrypt;
