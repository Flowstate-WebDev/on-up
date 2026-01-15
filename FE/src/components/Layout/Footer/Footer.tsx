import Button from "@/components/UI/Interaction/Button"
import { Link } from "@tanstack/react-router"

type Props = {}

export default function Footer({ }: Props) {
  return (
    <div className='flex flex-col md:flex-row items-stretch justify-center px-8 bg-primary text-text-obj p-6 rounded-t-lg divider-lines'>
      <div className='flex grow gap-1 mb-6 md:mb-0 justify-center items-center'>
        <img src={'/images/onup_logo.webp'} alt={'logo'} height={52} width={52} className='grayscale' />
        <div className='flex flex-col'>
          <p className="text-1xl font-semibold text-white leading-none">Wydawnictwo</p>
          <h1 className="text-2xl font-bold text-white leading-none">On-Up</h1>
        </div>
      </div>
      <div className="flex grow flex-col text-center justify-center items-center">
        <div className="flex gap-2">
          <img className="w-4 h-4 brightness-0 invert self-center" src="/icons/phone-icon.svg" alt="" />
          <p>506 610 405</p>
        </div>
        <div className="flex gap-2 mb-4">
          <img className="w-4 h-4 brightness-0 invert self-center" src="/icons/mail-icon.svg" alt="" />
          <p>onup.wydawnictwo@gmail.com</p>
        </div>
        <Button style={"outline_white"} type={"button"}><Link to={'/polityka'}>Polityka strony</Link></Button>
      </div>
      <div className='grow mt-6 md:mt-0 text-center flex flex-col justify-center items-center'>
        <p>ul. Gajowa 14/2, 82-500 Rakowiec</p>
        <p>NIP 5811228975, REGON 192050931</p>
        <p>Firma wpisana do CEIDG</p>
      </div>
    </div>
  )
}