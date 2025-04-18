export async function apiFetch(path, options = {}) {
  const defaultOptions = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  const res = await fetch(path, defaultOptions);

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'API error');
  }

  if (res.status === 204 || res.headers.get('Content-Length') === '0') {
    return null;
  }

  return res.json();
}
