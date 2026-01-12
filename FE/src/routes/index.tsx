import CategoryBlock from '@/components/Layout/Category/CategoryBlock';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

async function fetchBooks() {
  // await new Promise((resolve) => setTimeout(resolve, 1000)) // DELAY W MILISEKUNDACH
  const res = await fetch('http://localhost:3001/api/books')
  if (!res.ok) throw new Error('Could not fetch books from /api/books')
  const data = await res.json()
  return data
}

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isPending, error, data } = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks
  })

  if (isPending) {
    return (
      <div className="text-center py-10 text-gray-500">
        Ładowanie książek...
      </div>
    )
  }

  if (error || !data || !Array.isArray(data)) {
    return (
      <div className="text-center py-10 text-gray-500">
        Ups... coś poszło nie tak.
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        Nie znaleziono żadnych książek...
      </div>
    )
  }

  const groups: Record<string, any[]> = {}

  data.forEach((book: any) => {
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