
type Props = {}

export default function Footer({ }: Props) {
  return (
    <div className='flex items-center justify-around bg-primary text-text-obj p-6 rounded-t-lg'>
      <div className='flex gap-1'>
        <img src={'/images/onup_logo.webp'} alt={'logo'} height={52} width={52} className='grayscale' />
        <div className='flex flex-col'>
          <p>Wydawnictwo</p>
          <p className='font-bold'>OnUp</p>
        </div>
      </div>
      <div>

      </div>
      <div className=''>
        <p>506 610 405</p>
        <p>onup.wydawnictwo@gmail.com</p><br />
        <p>ul. Gajowa 14/2, 82-500 Rakowiec</p>
        <p>NIP 5811228975, REGON 192050931</p>
        <p>Firma wpisana do CEIDG</p>
      </div>
    </div>
  )
}