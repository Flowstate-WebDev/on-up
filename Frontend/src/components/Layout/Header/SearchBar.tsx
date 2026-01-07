type Props = {}

export default function SearchBar({ }: Props) {
  return (
    <div className='w-1/3'>
      <input
        type="text"
        className='
          border-2 border-border-primary rounded-lg text-center h-10
          focus:border-primary text-text-primary transition-all duration-300 ease-in-out
          hidden md:block m-auto w-full
        '
        placeholder='Wyszukaj produkt'
      >
      </input>
    </div>
  )
}