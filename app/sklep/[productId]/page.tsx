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

  const product = await prisma.products.findFirst({
    where: {
      slug: productId
    }
  });

  if (!product) return null;

  return (
    <section>
      <div className='flex gap-16 justify-center'>
        <ProductImageGalery images={product?.images} />
        <div className='flex flex-col gap-4'>
          <ProductDetailsBlock
            category={product?.category}
            title={product?.title}
            qualifications={product?.qualifications}
            price={product?.price}
          />
          <ProductDescriptionBlock>{product?.description}</ProductDescriptionBlock>
        </div>
      </div>
    </section>
  )
}