const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Builds an absolute API URL from a path like '/api/auth/login'
 */
export function apiUrl(path) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
}

/**
 * Drop-in fetch() wrapper that prepends the backend base URL
 */
export function apiFetch(path, options = {}) {
  return fetch(apiUrl(path), options);
}

/**
 * Returns the Authorization header for the logged-in user (email-based token)
 */
export function authHeader() {
  const email = localStorage.getItem('userEmail');
  return email ? { Authorization: `Bearer ${email}` } : {};
}

/**
 * Pings the backend to wake it from Render cold-start
 */
export async function pingServer() {
  try {
    await fetch(API_BASE_URL, {
      method: 'GET',
      signal: AbortSignal.timeout(10000),
    });
  } catch {
    // Swallow errors — server may still be waking up
  }
}
