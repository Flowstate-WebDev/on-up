import React from 'react';
import { categories, CategoryName } from '@/data/categories';
import ProductDisplay from '@/components/server/Product/ProductCard';
import CategoryHeading from './CategoryHeading';

import prisma from '@/lib/database';

type Props = {
  category: CategoryName
}

export default async function CategoryBlock({ category }: Props) {

  // const products = await prisma.products.findMany()
  // if (!products) return null;

  const categoryData = categories.find(c => c.name === category);
  if (!categoryData) return null;

  return (
    <section>
      <CategoryHeading>{categoryData.text}</CategoryHeading>
      <div className='grid grid-cols-5 gap-4 overflow-auto py-4'>
        {/* {products.map((product, idx) =>
          product.category == category ? (
            <ProductDisplay key={idx} data={product} />
          ) : null
        )} */}
      </div>
    </section>
  )
}