const BASE = process.env.REACT_APP_API_URL || '';

function getToken() {
  return typeof window !== 'undefined' ? localStorage.getItem('tms_token') : null;
}

export async function api(path, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };
  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  const data = res.ok ? (res.status === 204 ? null : await res.json()) : await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.error || res.statusText || 'Request failed');
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export { getToken };
