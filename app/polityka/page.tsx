import React from 'react'
import Link from 'next/link'

type Props = {}

export default function Polityka({}: Props) {
  return (
    <div className='flex flex-col items-center my-16'>
        <h1 className='text-5xl'>Warunki i zasady</h1>
        <ul className='flex flex-col gap-4 mt-16 text-center'>
            <li><Link href={'/polityka/regulamin'} className='hover:text-text-primary-hover transition-colors duration-200'>Regulamin</Link></li>
            <li><Link href={'/polityka/dostawy-i-platnosci'} className='hover:text-text-primary-hover transition-colors duration-200'>Dostawy i płatności</Link></li>
            <li><Link href={'/polityka/polityka-prywatnosci'} className='hover:text-text-primary-hover transition-colors duration-200'>Polityka prywatności</Link></li>
            <li><Link href={'/polityka/polityka-zwrotow'} className='hover:text-text-primary-hover transition-colors duration-200'>Zwroty</Link></li>
            <li><Link href={'/polityka/o-nas'} className='hover:text-text-primary-hover transition-colors duration-200'>O nas</Link></li>
        </ul>
    </div>
  )
}