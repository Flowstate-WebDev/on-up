import React from 'react';
import Logo from './Logo';
import Navigation from '../../client/Navigation';
import SearchBar from '@/components/client/SearchBar';
import BurgerMenu from '@/components/client/BurgerMenu';
import Button from '@/components/client/Button';


export default function Header() {



  return (
    <header className='flex justify-between items-center py-2 px-8 sticky top-0 z-100000 bg-bg-primary'>
        <Logo />
        <Navigation />
        <BurgerMenu />
    </header>
  )
}