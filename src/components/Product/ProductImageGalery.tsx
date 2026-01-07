import type { ProductImages } from '@/data/products';

type Props = {
  images: ProductImages
}

export default function ProductImageGalery({ images }: Props) {
  return (
    <div>
      <div className='relative aspect-3/4 h-164 mx-auto border border-border-primary rounded-lg'>
        <img src={`/images/${images.main}`} alt='' className='object-fill p-4 w-full h-full' />
      </div>
    </div>
  )
}