import { fetchBooks, createBook, updateBook, deleteBook, fetchProfessions, fetchQualifications } from "@/api/booksAPI";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bookKeys } from "../queryKeys";

export const useBooks = () => {
  return useQuery({
    queryKey: bookKeys.all,
    queryFn: fetchBooks
  })
}

export const useProfessions = () => {
  return useQuery({
    queryKey: ['professions'],
    queryFn: fetchProfessions,
    staleTime: 1000 * 60 * 60, // 1 hour
  })
}

export const useQualifications = () => {
  return useQuery({
    queryKey: ['qualifications'],
    queryFn: fetchQualifications,
    staleTime: 1000 * 60 * 60, // 1 hour
  })
}

export const useCreateBook = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookKeys.all })
    }
  })
}

export const useUpdateBook = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateBook(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookKeys.all })
    }
  })
}

export const useDeleteBook = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookKeys.all })
    }
  })
}