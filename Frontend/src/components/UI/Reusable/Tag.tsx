type Props = {
  children: string
}

export default function Tag({ children }: Props) {
  return (
    <span className='text-text-obj text-sm bg-secondary rounded-full px-2 border-primary border-2'>{ children }</span>
  )
}