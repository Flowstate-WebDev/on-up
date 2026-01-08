type Props = {
  imageUrl: string
}

export default function ProductImageGalery({ imageUrl }: Props) {
  return (
    <div className="content-center">
      <div className='relative aspect-3/4 h-164 mx-auto border border-border-primary rounded-lg'>
        <img src={`/images/books/${imageUrl}`} alt='' className='object-fill p-4 w-full h-full' />
      </div>
    </div>
  )
}