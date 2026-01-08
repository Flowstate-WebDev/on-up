
type Props = {
  description: string
}

export default function ProductDescriptionBlock({ description }: Props) {
  return (
    <div className="py-16">
      <h1 className='text-2xl font-bold mb-4'>Opis</h1>
      <p>{description}</p>
    </div>
  )
}