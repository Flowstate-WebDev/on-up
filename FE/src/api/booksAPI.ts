export async function fetchBooks() {
  // await new Promise((resolve) => setTimeout(resolve, 1000)) // DELAY W MILISEKUNDACH
  const res = await fetch('http://localhost:3001/api/books')
  if (!res.ok) throw new Error('Could not fetch books from /api/books')
  const data = await res.json()
  return data
} 