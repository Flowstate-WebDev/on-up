import { getAssetPath } from '@/utils/paths';

type Props = {
  imageUrl: string
}

export function ProductImageGalery({ imageUrl }: Props) {
  return (
    <div className="content-center">
      <div className='relative aspect-3/4 max-h-164 mx-auto border border-border-primary rounded-lg'>
        <img src={getAssetPath(`/images/books/${imageUrl}`)} alt='' className='object-fill p-4 w-full h-full' />
      </div>
    </div>
  )
}