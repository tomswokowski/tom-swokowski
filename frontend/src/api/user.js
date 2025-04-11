import { apiFetch } from './index';

export function login() {
  const backendURL = import.meta.env.PROD ? '' : import.meta.env.VITE_BACKEND_URL;
  window.location.href = `${backendURL}/auth/github`;
}

export function logout() {
  return apiFetch('/auth/logout', {
    method: 'POST',
  });
}

export async function getUser() {
  return await apiFetch('/api/user');
}
