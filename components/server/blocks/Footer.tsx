import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/client/Button'

type Props = {}

export default function Footer({}: Props) {
  return (
    <div className='flex items-center justify-evenly bg-primary text-text-obj p-6'>
        <div className='flex'>
            <Image src={'/images/onup_logo.webp'} alt={'logo'} height={52} width={52} className='grayscale' />
            <div>
                <p>Wydawnictwo</p>
                <p>OnUp</p>
            </div>
        </div>
        <div>
            <p><Link href={'mailto:onup.wydawnictwo@gmail.com'} className='text-text-primary hover:text-text-primary-hover transition-color duration-200 ease-in-out'>Kontakt Email</Link></p>
            <Button type="default" title="JESTEM GEJEM"/>
        </div>
    </div>
  )
}