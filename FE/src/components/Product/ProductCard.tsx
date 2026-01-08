import { Link } from '@tanstack/react-router';

import type { Product } from '@/data/products';
import Tag from '../UI/Reusable/Tag';
import ProductPrice from './ProductPrice';

type Props = {
  data: Product
}

export default function ProductCard({ data }: Props) {
  return (
    <Link to={`/sklep/${data.slug}`} className='w-min shadow-md rounded-lg overflow-clip'>
      <div className="w-75 aspect-3/4 relative">
        <img src={`/images/books/${data.imageUrl}`} alt={`Podręcznik ${data.title}`} className="object-contain w-full h-full" />
      </div>
      <div className='bg-bg-secondary p-2'>
        <h2 className='font-bold mb-2 leading-tight'>{data.title}</h2>
        <div className='mb-4'>
          <h3 className='text-sm'>Kwalifikacje:</h3>
          <ul className='flex gap-1'>
            {
              data.qualifications.length > 0 ? (
                data.qualifications.map((item, idx) => (
                  <li key={idx}><Tag>{item.qualification.code}</Tag></li>
                ))
              ) : (
                <p className='text-xs text-text-secondary italic'>Nie podano</p>
              )
            }
          </ul>
        </div>
        <div className='flex justify-end'>
          <ProductPrice price={data.price} />
        </div>
      </div>
    </Link>
  )
}
