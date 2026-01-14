import CategoryHeading from './CategoryHeading';
import ProductCard from '@/components/Product/ProductCard';

export default function CategoryBlock({ title, books }: { title: string, books: any[] }) {

  return (
    <section>
      <CategoryHeading>{title}</CategoryHeading>
      <div className='grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-x-6 gap-y-12 py-4 justify-items-center sm:justify-items-start'>
        {books.map((book: any) => (
          <ProductCard key={book.id} data={book} />
        ))}
      </div>
    </section>
  )
}
