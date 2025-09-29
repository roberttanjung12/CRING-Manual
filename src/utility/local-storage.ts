interface AuthUserData {
  authUserAccessToken: string;
  authUserRefreshToken: string;
  authUserLoginAt: string;
  authUserExpiresIn: string;
}

const AUTH_USER_KEY = 'CRING_AUTH';

/**
 * Stores a value in the browser's localStorage under the specified key.
 * The value is serialized to a JSON string before being saved.
 *
 * @param key - The key under which the value will be stored.
 * @param value - The value to store; it will be converted to a JSON string.
 */
const setLocalStorage = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * Retrieves and parses a value from localStorage by the specified key.
 *
 * @template T - The expected type of the returned value.
 * @param {string} key - The key under which the value is stored in localStorage.
 * @returns {T | null} The parsed value of type T if found, otherwise null.
 */
function getLocalStorage<T = any>(key: string): T | null {
  const item = localStorage.getItem(key);

  return item ? (JSON.parse(item) as T) : null;
}

/**
 * Removes one or more items from the browser's local storage.
 *
 * @param key - The key or array of keys to remove from local storage.
 * If an array is provided, each key in the array will be removed.
 */
const removeLocalStorage = (key: string | string[]): void => {
  if (typeof key !== 'string' && Array.isArray(key)) {
    key.forEach(item => localStorage.removeItem(item));
  } else {
    localStorage.removeItem(key);
  }
};

/**
 * Stores the authenticated user data in local storage under a predefined key.
 *
 * @param data - The authenticated user data to be saved.
 */
const setAuthUserData = (data: AuthUserData): void => {
  setLocalStorage(AUTH_USER_KEY, data);
};

/**
 * Retrieves a valid access token from local storage if it exists and has not expired.
 *
 * Checks the stored authentication data for an access token and its expiration time.
 * If the token is still valid (i.e., not expired), returns the access token.
 * If the token has expired or no authentication data is found, removes the data from local storage and returns `null`.
 *
 * @returns {string | null} The valid access token if available and not expired, otherwise `null`.
 */
const getValidAccessToken = (): string | null => {
  const data = getLocalStorage<AuthUserData>(AUTH_USER_KEY);

  if (!data) return null;

  const expiresIn = new Date(data.authUserExpiresIn).getTime();
  const now = Date.now();

  if (now < expiresIn) {
    return data.authUserAccessToken;
  } else {
    removeLocalStorage(AUTH_USER_KEY);

    return null;
  }
};

export type { AuthUserData };

export { setLocalStorage, getLocalStorage, removeLocalStorage, setAuthUserData, getValidAccessToken, AUTH_USER_KEY };
