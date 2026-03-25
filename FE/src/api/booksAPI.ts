import { apiClient } from './apiClient';

export const fetchBooks = async () => {
  return apiClient('/books');
}

export const createBook = async (data: any) => {
  return apiClient('/books', {
    method: 'POST',
    body: JSON.stringify(data),
    credentials: 'include'
  });
}

export const updateBook = async (id: string, data: any) => {
  return apiClient(`/books/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    credentials: 'include'
  });
}

export const deleteBook = async (id: string) => {
  return apiClient(`/books/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });
}

export const uploadBookImage = async (file: File): Promise<{ url: string }> => {
  const formData = new FormData();
  formData.append('image', file);

  const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';
  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Image upload failed');
  }
  return res.json();
};

export const fetchProfessions = async () => {
  return apiClient('/professions');
}

export const fetchQualifications = async () => {
  return apiClient('/qualifications');
}