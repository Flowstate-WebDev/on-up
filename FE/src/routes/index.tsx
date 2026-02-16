import { createFileRoute } from '@tanstack/react-router';

import { CategorySection } from '@/routes/components/CategorySection';
import { QueryState } from '@/components/ui/QueryState';

import { useBooks } from '@/hooks/queries/books/useBooks';
import { BackgroundShapes } from './sklep/components/BackgroundShapes';

export const Route = createFileRoute('/')({
  component: HomePage,
  beforeLoad: () => {
    document.title = 'ON-UP | Wydawnictwo podręczników'
  }
})

function HomePage() {
  const { isPending, error, data: books } = useBooks()

  if (isPending) {
    return <QueryState>Ładowanie książek...</QueryState>
  }

  if (error || !books || !Array.isArray(books)) {
    return <QueryState>Ups... coś poszło nie tak.</QueryState>
  }

  if (books.length === 0) {
    return <QueryState>Nie znaleziono żadnych książek...</QueryState>
  }

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
    <>
      <BackgroundShapes />
      <div className="flex flex-col gap-8">
        {Object.entries(groups).map(([profName, filteredBooks]) => (
          <CategorySection
            key={profName}
            title={profName}
            books={filteredBooks}
          />
        ))}
      </div>
    </>
  )
}