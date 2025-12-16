"use client";

import React, { useState } from 'react'
import NavLink from './NavLink';
import Image from 'next/image';

import { navpaths } from '@/data/navpaths';

type Props = {}

const menu = "icons/menu-icon.svg"
const close = "icons/close-icon.svg"

export default function BurgerMenu({}: Props) {

  const [isOpen, setIsOpen] = useState(false);

  const ToggleMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className='relative inline-block lg:hidden'>
      <button onClick={ToggleMenu} className='px-3 py-2 cursor-pointer rounded-lg hover:bg-neutral-300/50 transition-colors duration-200 ease-in-out'>
        <Image src={isOpen ? close : menu} alt={"menuIcon"} width={32} height={32} />
      </button>
      {isOpen && (
        <div className='absolute left-1/2 top-full transform -translate-x-[60%] mt-2 bg-gray-200 shadow-lg rounded-lg list-none z-50 cursor-pointer min-w-max'>
          {
            navpaths.map((item, idx) => (
              <NavLink key={idx} href={ item.redirect } icon={ item.hasIcon }>{ item.name }</NavLink>
            ))
          }
        </div>
      )}
    </div>
  )
}

