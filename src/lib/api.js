const ENV_BASE = process.env.REACT_APP_API_URL;
const IS_PROD = process.env.NODE_ENV === 'production';
const BASE = ENV_BASE || '';

function getToken() {
  return typeof window !== 'undefined' ? localStorage.getItem('tms_token') : null;
}

export async function api(path, options = {}) {
  if (IS_PROD && !ENV_BASE) {
    throw new Error(
      "Missing REACT_APP_API_URL. Your frontend is calling the API on the same origin, which commonly returns 405/404 in production. Set REACT_APP_API_URL to your backend base URL (e.g. https://tms-backend-t7a8.onrender.com) and rebuild/redeploy the frontend."
    );
  }
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
