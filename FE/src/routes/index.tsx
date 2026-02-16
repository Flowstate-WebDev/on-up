import { createFileRoute } from '@tanstack/react-router';

import { CategorySection } from '@/routes/components/CategorySection';
import { QueryState } from '@/components/ui/QueryState';

import { useBooks } from '@/hooks/queries/books/useBooks';

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
      <div className="absolute inset-0 -z-10 overflow-clip opacity-10 pointer-events-none">
        <img src="./images/shapes/half_circle_lines.svg" className='absolute top-40 right-0 translate-x-1/2 rotate-180 aspect-square w-100' alt="" />
        <img src="./images/shapes/circle_lines_fill.svg" className='absolute top-150 left-0 -translate-x-1/3 rotate-45 aspect-square w-100' alt="" />
        <img src="./images/shapes/bubble.svg" className='absolute top-235 left-65 -translate-x-1/2 aspect-square w-20' alt="" />
        <img src="./images/shapes/bubble.svg" className='absolute top-250 left-46 -translate-x-1/2 aspect-square w-10' alt="" />
        <img src="./images/shapes/bubble.svg" className='absolute top-260 left-58 -translate-x-1/2 aspect-square w-5' alt="" />
        <img src="./images/shapes/star.svg" className='absolute top-260 right-45 translate-x-1/2 aspect-square w-30' alt="" />
        <img src="./images/shapes/star.svg" className='absolute top-250 right-15 translate-x-1/2 aspect-square w-20' alt="" />
        <img src="./images/shapes/star.svg" className='absolute top-275 right-20 translate-x-1/2 aspect-square w-10' alt="" />
        <img src="./images/shapes/star.svg" className='absolute top-290 right-10 translate-x-1/2 aspect-square w-5' alt="" />
        <img src="./images/shapes/sharp_waves.svg" className='absolute top-300 right-10 translate-x-1/2 aspect-square w-100' alt="" />
        <img src="./images/shapes/half_circle_lines.svg" className='absolute top-350 left-0 -translate-x-1/4 rotate-90 aspect-square w-100' alt="" />
      </div>
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