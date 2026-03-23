const RAW_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
export const API_URL = RAW_API_URL.replace(/\/$/, ''); // Remove trailing slash if present

export async function apiGet(path) {
  const headers = {};
  if (authToken) headers['Authorization'] = `Bearer ${authToken}`;
  
  // Add timestamp to prevent caching
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const separator = cleanPath.includes('?') ? '&' : '?';
  const url = `${API_URL}${cleanPath}${separator}_t=${Date.now()}`;
  
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json();
}

let authToken = '';
export function setToken(token) { authToken = token || ''; }
export function getToken() { return authToken; }
export function clearToken() { authToken = ''; }

export async function apiPost(path, body = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (authToken) headers['Authorization'] = `Bearer ${authToken}`;
  
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const res = await fetch(`${API_URL}${cleanPath}`, { 
    method: 'POST', 
    headers, 
    body: JSON.stringify(body) 
  });
  
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `POST ${path} failed: ${res.status}`);
  }
  return res.json();
}