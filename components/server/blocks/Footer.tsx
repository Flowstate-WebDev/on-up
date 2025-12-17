import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/client/Button'

type Props = {}

export default function Footer({}: Props) {
  return (
    <div className='flex flex-col text-center md:text-left md:flex-row items-center justify-around bg-primary text-text-obj p-6 rounded-t-lg'>
        <div className='flex flex-col'>
          <div className='flex gap-1 mb-6'>
              <Image src={'/images/onup_logo.webp'} alt={'logo'} height={52} width={52} className='grayscale' />
              <div className='flex flex-col text-left'>
                  <p>Wydawnictwo</p>
                  <p className='font-bold'>OnUp</p>
              </div>
          </div>
          <Button style='default_white' type='button'><Link href={'/'}>Warunki i zasady</Link></Button>
        </div>
        <div className=''>
          <div className='mb-6'>
            <p>506 610 405</p>
            <p>onup.wydawnictwo@gmail.com</p>
          </div>
          <div className=''>
            <p>ul. Gajowa 14/2, 82-500 Rakowiec</p>
            <p>NIP 5811228975, REGON 192050931</p>
            <p>Firma wpisana do CEIDG</p>
          </div>
        </div>
    </div>
  )
}