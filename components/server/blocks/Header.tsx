import React from 'react';
import Logo from './Logo';
import Navigation from '../../client/Navigation';
import SearchBar from '@/components/client/SearchBar';
import BurgerMenu from '@/components/client/BurgerMenu';


export default function Header() {



  return (
    <header className='flex justify-between items-center p-2 px-8 sticky top-0 z-100000 bg-white'>
        <Logo />
        <SearchBar />
        <Navigation />
        <BurgerMenu />
    </header>
  )
}