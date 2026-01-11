import CategoryBlock from '@/components/Layout/Category/CategoryBlock';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader: async () => {
    try {
      const res = await fetch('http://localhost:3001/api/books')
      if (!res.ok) {
        return { books: [], error: true }
      }
      const data = await res.json()
      return { books: Array.isArray(data) ? data : [], error: false }
    } catch (err) {
      console.error('Failed to fetch books:', err)
      return { books: [], error: true }
    }
  }
})

function RouteComponent() {
  const { books, error } = Route.useLoaderData() as { books: any[], error: boolean }

  if (error || !books || !Array.isArray(books)) {
    return (
      <div className="text-center py-10 text-gray-500">
        Błąd podczas ładowania książek. Spróbuj odświeżyć stronę.
      </div>
    )
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        Nie znaleziono żadnych książek.
      </div>
    )
  }

  // Create a record where keys are profession names and values are arrays of books
  const groups: Record<string, any[]> = {}

  books.forEach((book: any) => {
    book.professions?.forEach((p: any) => {
      const profName = p.profession?.name
      if (!profName) return

      if (!groups[profName]) {
        groups[profName] = []
      }
      if (!groups[profName].some(b => b.id === book.id)) {
        groups[profName].push(book)
      }
    })
  })

  return (
    <div className="flex flex-col gap-8">
      {Object.entries(groups).map(([profName, filteredBooks]) => (
        <CategoryBlock
          key={profName}
          title={profName}
          books={filteredBooks}
        />
      ))}
    </div>
  )
}