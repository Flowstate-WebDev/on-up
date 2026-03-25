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

export const fetchProfessions = async () => {
  return apiClient('/professions');
}

export const fetchQualifications = async () => {
  return apiClient('/qualifications');
}