"use-client";

import React from 'react'

type Props = {}

export default function SearchBar({}: Props) {
  return (
    <div className='w-1/3'>
      <input
          type="text"
          className='border-2 border-neutral-400 rounded-lg text-center h-10
                      focus:border-neutral-950 transition-all duration-300 ease-in-out
                      hidden md:block m-auto w-full
                      '
          placeholder='Wyszukaj produkt'
      >

      </input>
    </div>
  )
}