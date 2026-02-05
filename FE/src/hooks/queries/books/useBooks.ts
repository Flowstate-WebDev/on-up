import { fetchBooks } from "@/api/booksAPI";
import { useQuery } from "@tanstack/react-query";
import { bookKeys } from "../queryKeys";

export const useBooks = () => {
  return useQuery({
    queryKey: bookKeys.all,
    queryFn: fetchBooks
  })
}