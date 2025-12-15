import React from 'react';
import Link from 'next/link';

type NavLinkProps = {
  href: string,
  children: string
}

export default function NavLink({ href, children }: NavLinkProps) {
  return (
    <li className='even:bg-gray-300 md:even:bg-transparent p-2 text-center rounded-lg'><Link href={ href } 
    className='md:hover:bg-neutral-300/50 transition-colors duration-200 ease-in-out p-4 rounded-lg'
    >{ children }</Link></li>
  )
}