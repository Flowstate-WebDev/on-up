import { apiClient } from './apiClient';

export const fetchProduct = async (productId: string) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000)) // DELAY W MILISEKUNDACH
  return apiClient(`/books/${productId}`);
}