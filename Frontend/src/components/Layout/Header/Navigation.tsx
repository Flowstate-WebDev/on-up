import NavLink from './NavLink';

import { navpaths } from '@/data/navpaths';

export default function Navigation() {
  return (
    <nav>
      <ul className='h-full hidden lg:flex items-center gap-8'>
        {
          navpaths.map((item, idx) => (
            <NavLink key={idx} href={item.redirect} icon={item.hasIcon}>{item.name}</NavLink>
          ))
        }
      </ul>
    </nav>
  )
}
