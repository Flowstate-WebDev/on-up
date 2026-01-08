import CategoryBlock from '@/components/Layout/Category/CategoryBlock';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader: async () => {
    const res = await fetch('http://localhost:3001/api/books')
    if (!res.ok) throw new Error("Could not fetch books from /api/books!")
    return res.json()
  }
})

function RouteComponent() {
  const books = Route.useLoaderData() as any[]

  // Create a record where keys are profession names and values are arrays of books
  const groups: Record<string, any[]> = {}

  books.forEach((book: any) => {
    book.professions?.forEach((p: any) => {
      const profName = p.profession.name
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
      {Object.keys(groups).length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No books found... or just an error.
        </div>
      )}
    </div>
  )
}