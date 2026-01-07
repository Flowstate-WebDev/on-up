
type Props = {
  children: string
}

export default function CategoryHeading({ children }: Props) {
  return (
    <div className='flex'>
      <img src={'/images/strzalki-prawo.webp'} alt='' width={150} height={50} />
      <h1 className='uppercase font-extrabold text-text-obj text-3xl bg-bg-tertiary rounded-lg p-2 px-4 w-fit'>{children}</h1>
      <img src={'/images/strzalki-lewo.webp'} alt='' width={150} height={50} />
    </div>
  )
}