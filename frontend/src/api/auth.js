import { apiFetch } from './index';

export function fetchUser() {
  return apiFetch('/api/user');
}

export function logout() {
  return apiFetch('/auth/logout', {
    method: 'POST',
  });
}

export function redirectToLogin() {
  const backendURL = import.meta.env.PROD ? '' : import.meta.env.VITE_BACKEND_URL;
  window.location.href = `${backendURL}/auth/github`;
}
