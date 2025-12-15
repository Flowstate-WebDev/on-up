import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {}

export default function Footer({}: Props) {
  return (
    <div className='flex items-center justify-evenly bg-blue-950 text-gray-50 p-6'>
        <div className='flex'>
            <Image src={'/images/onup_logo.webp'} alt={'logo'} height={52} width={52} className='grayscale' />
            <div>
                <p>Wydawnictwo</p>
                <p>OnUp</p>
            </div>
        </div>
        <div>
            <p><Link href={'mailto:onup.wydawnictwo@gmail.com'} className='hover:text-gray-300 transition-color duration-200 ease-in-out'>Kontakt Email</Link></p>
        </div>
    </div>
  )
}