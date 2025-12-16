import React from 'react';
import Image from 'next/image';

import ProductDescriptionBlock from '@/components/server/Product/ProductDescriptionBlock';
import ProductImageGalery from '@/components/server/Product/ProductImageGalery';
import ProductDetailsBlock from '@/components/server/Product/ProductDetailsBlock';
import prisma from '@/lib/database';

type Params = {
  params: Promise<{
    productId: string
  }>
}


export default async function ProductPage({ params }: Params) {
  const { productId } = await params;

  const product = prisma.products.findMany({
    where: {
      urlSlug: productId
    }
  });

  if (!product) return null;

  return (
    <section>
      <div className='grid grid-cols-2'>
        <ProductImageGalery images={ product?.images } />
        <ProductDetailsBlock
          category={ product?.category }
          title={ product?.title }
          qualifications={ product?.qualifications }
          price={ product?.price }
        />
      </div>
      <ProductDescriptionBlock>{ product?.description }</ProductDescriptionBlock>
    </section>
  )
}