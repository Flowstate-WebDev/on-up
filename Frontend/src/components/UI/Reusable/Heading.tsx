type Props = {
  children: string
}

export default function Heading({ children }: Props) {
  return (
    <h1 className='text-4xl font-bold mb-4'>{ children }</h1>
  )
}