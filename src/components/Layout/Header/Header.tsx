
import Navigation from './Navigation';
import BurgerMenu from './BurgerMenu';
import Logo from './Logo';


export default function Header() {
  return (
    <header className='flex justify-between items-center py-2 px-8 sticky top-0 z-100000 bg-bg-primary'>
      <Logo />
      <Navigation />
      <BurgerMenu />
    </header>
  )
}