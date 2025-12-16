import React from 'react';
import Image from 'next/image';
import { ProductImages } from '@/data/products';

type Props = {
  images: ProductImages
}

export default function ProductImageGalery({ images }: Props) {
  return (
    <div>
      <div className='relative aspect-3/4 h-164 mx-auto border border-neutral-200 rounded-lg'>
        <Image src={ `/images/${ images.main }` } alt='' fill className='object-fill p-4'/>
      </div>
    </div>
  )
}