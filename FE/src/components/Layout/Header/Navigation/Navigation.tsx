import { NavLink } from './NavLink';

import { navpaths } from '@/data/navpaths';

import { useCart } from '@/context/CartContext';

export const Navigation = () => {
  const { products } = useCart();
  const cartItemCount = products.length;

  return (
    <nav>
      <ul className='h-full hidden lg:flex items-center gap-8'>
        {
          navpaths.map((item, idx) => (
            <NavLink
              key={idx}
              href={item.redirect}
              icon={item.hasIcon}
              badge={item.name === "Koszyk" ? cartItemCount : undefined}
            >
              {item.name}
            </NavLink>
          ))
        }
      </ul>
    </nav>
  )
}
