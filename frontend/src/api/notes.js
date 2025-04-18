import { apiFetch } from './index';

export function getAllNotes() {
  return apiFetch('/api/user/notes');
}

export function getNoteById(id) {
  return apiFetch(`/api/user/notes/${id}`);
}

export function createNote(data) {
  return apiFetch('/api/user/notes/new', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateNote(id, data) {
  return apiFetch(`/api/user/notes/edit/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function deleteNote(id) {
  return apiFetch(`/api/user/notes/delete/${id}`, {
    method: 'DELETE',
  });
}
