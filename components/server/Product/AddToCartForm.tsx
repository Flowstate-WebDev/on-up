"use clinet";

import React from 'react';

type Props = {}

export default function AddToCartForm({}: Props) {
  return (
    <form className='flex w-fit'>
      <input className='rounded-tl-lg rounded-bl-lg border border-r-0 border-neutral-200 outline-none py-2 px-4 w-20 bg-white' type="number"/>
      <button className='block rounded-tr-lg rounded-br-lg bg-blue-600 hover:bg-blue-500 text-white px-8 cursor-pointer'>Dodaj do koszyka</button>
    </form>
  )
}