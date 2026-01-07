
type Props = {
  children: string
}

export default function ProductDescriptionBlock({ children }: Props) {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Opis</h1>
      <p>{ children }</p>
    </div>
  )
}