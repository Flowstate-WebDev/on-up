import Button from "@/components/UI/Interaction/Button"
import { Link } from "@tanstack/react-router"

type Props = {}

export default function Footer({ }: Props) {
  return (
    <div className='flex flex-col md:flex-row items-center justify-around bg-primary text-text-obj p-6 rounded-t-lg'>
      <div className='flex gap-1 mb-6 md:mb-0'>
        <img src={'/images/onup_logo.webp'} alt={'logo'} height={52} width={52} className='grayscale' />
        <div className='flex flex-col'>
          <p>Wydawnictwo</p>
          <p className='font-bold'>OnUp</p>
        </div>
      </div>
      <div className="flex flex-col text-center">
        <p>506 610 405</p>
        <p>onup.wydawnictwo@gmail.com</p>
        <Button style={"outline_white"} type={"button"}><Link to={'/polityka'}>Polityka strony</Link></Button>
      </div>
      <div className='mt-6 md:mt-0 text-center'>
        <p>ul. Gajowa 14/2, 82-500 Rakowiec</p>
        <p>NIP 5811228975, REGON 192050931</p>
        <p>Firma wpisana do CEIDG</p>
      </div>
    </div>
  )
}