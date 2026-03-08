const BASE_URL = 'http://localhost:3001/api';

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Request failed with status ${res.status}`);
  }
  return res.json();
};

export const fetchBooks = async () => {
  const res = await fetch(`${BASE_URL}/books`)
  return handleResponse(res);
}

export const createBook = async (data: any) => {
  const res = await fetch(`${BASE_URL}/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include'
  })
  return handleResponse(res);
}

export const updateBook = async (id: string, data: any) => {
  const res = await fetch(`${BASE_URL}/books/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include'
  })
  return handleResponse(res);
}

export const deleteBook = async (id: string) => {
  const res = await fetch(`${BASE_URL}/books/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  })
  return handleResponse(res);
}

export const fetchProfessions = async () => {
  const res = await fetch(`${BASE_URL}/professions`)
  return handleResponse(res);
}

export const fetchQualifications = async () => {
  const res = await fetch(`${BASE_URL}/qualifications`)
  return handleResponse(res);
}