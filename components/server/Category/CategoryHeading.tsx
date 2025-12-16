import React from 'react';
import Image from 'next/image';

type Props = {
  children: string
}

export default function CategoryHeading({ children }: Props) {
  return (
    <div className='flex'>
      <Image src={'/images/strzalki-prawo.webp'} alt='' width={150} height={50}/>
      <h1 className='uppercase font-extrabold text-white text-3xl bg-black rounded-lg p-2 px-4 w-fit'>{ children }</h1>
      <Image src={'/images/strzalki-lewo.webp'} alt='' width={150} height={50}/>
    </div>
  )
}