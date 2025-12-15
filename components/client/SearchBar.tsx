"use-client";

import React from 'react'

type Props = {}

export default function SearchBar({}: Props) {
  return (
    <input
        type="text"
        className='border-2 border-neutral-400 rounded-lg text-center w-md h-10
                    focus:border-neutral-950 transition-all duration-300 ease-in-out
                    hidden md:block
                    '
        placeholder='Wyszukaj produkt'
    >

    </input>
  )
}