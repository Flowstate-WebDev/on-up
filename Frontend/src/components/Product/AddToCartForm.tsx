type Props = {}

export default function AddToCartForm({}: Props) {
  return (
    <form className='flex w-fit'>
      <input className='rounded-tl-lg rounded-bl-lg border border-r-0 border-border-secondary outline-none py-2 px-4 w-20 bg-bg-primary' type="number" min="1" defaultValue={1}/>
      <button className='block rounded-tr-lg rounded-br-lg bg-primary hover:bg-secondary text-text-obj px-8 cursor-pointer'>Dodaj do koszyka</button>
    </form>
  )
}