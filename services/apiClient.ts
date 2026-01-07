/**
 * API Client Utility
 * Automatically detects environment and uses the correct API URL
 */

export function getApiUrl(): string {
  // In production (deployed on Vercel/live domain), use the full backend URL
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return 'https://cybersync-lead-email.vercel.app/api';
  }
  
  // In local development, use relative path (proxied by Vite)
  return '/api';
}

/**
 * Fetch with automatic API URL handling
 * @param endpoint - e.g., 'blogs' or 'blogs/123'
 * @param options - fetch options
 */
export async function apiCall(endpoint: string, options?: RequestInit) {
  const apiUrl = getApiUrl();
  const url = `${apiUrl}/${endpoint}`;
  
  return fetch(url, options);
}
