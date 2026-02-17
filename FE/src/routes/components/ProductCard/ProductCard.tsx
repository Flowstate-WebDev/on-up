import { Link } from '@tanstack/react-router';
import { getAssetPath } from '@/utils/paths';

import { Tag } from '@/components/ui/Tag';
import { ProductPrice } from '@/routes/sklep/components/ProductDetailsSection/ProductPrice';

import type { ProductCardProps } from './ProductCard.types';

export const ProductCard = ({ data }: ProductCardProps) => {
  return (
    <Link
      to="/sklep/$productId"
      params={{ productId: data.slug }}
      className=' w-4/5 md:w-1/3 lg:w-1/4 xl:w-1/6 shadow-md rounded-lg overflow-clip flex flex-col bg-bg-secondary'
    >
      <div className="aspect-4/5 relative shrink-0">
        <img src={getAssetPath(`/images/books/${data.imageUrl}`)} alt={`Podręcznik ${data.title}`} className="object-cover w-full h-full" />
      </div>
      <div className='p-3 flex flex-col flex-1 gap-y-3'>
        <h2 className='font-bold leading-tight line-clamp-3 overflow-hidden text-sm sm:text-base min-h-[3em]'>{data.title}</h2>
        <div className='flex-1'>
          <h3 className='text-[10px] uppercase tracking-wider text-text-tertiary mb-1'>Kwalifikacje:</h3>
          <ul className='flex flex-wrap gap-1'>
            {data.qualifications.length > 0 ? (
              data.qualifications.map((item, idx) => (
                <li key={idx}><Tag>{item.qualification.code}</Tag></li>
              ))
            ) : (
              <p className='text-xs text-text-secondary italic'>Nie podano</p>
            )}
          </ul>
        </div>
        <div className='flex justify-end items-end mt-auto'>
          <ProductPrice price={data.price} />
        </div>
      </div>
    </Link>
  )
}
