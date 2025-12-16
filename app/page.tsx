import { categories } from '@/data/categories';
import CategoryBlock from '@/components/server/Category/CategoryBlock';

export default function RootPage() {
  return (
    <div className='flex flex-col gap-16'>
      {categories.map(category => (
        <CategoryBlock key={category.name} category={category.name} />
      ))}
    </div>
  );
}
