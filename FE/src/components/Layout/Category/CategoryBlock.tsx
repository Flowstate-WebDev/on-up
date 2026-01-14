import CategoryHeading from './CategoryHeading';
import ProductCard from '@/components/Product/ProductCard';

export default function CategoryBlock({ title, books }: { title: string, books: any[] }) {

  return (
    <section>
      <CategoryHeading>{title}</CategoryHeading>
      <div className='flex flex-wrap justify-center gap-x-6 gap-y-12 py-4 w-full md:max-w-4/5 mx-auto'>
        {books.map((book: any) => (
          <ProductCard key={book.id} data={book} />
        ))}
      </div>
    </section>
  )
}
