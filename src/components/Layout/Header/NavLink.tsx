import { Link } from '@tanstack/react-router';

type NavLinkProps = {
  href: string,
  icon?: boolean,
  children: string
};

export default function NavLink({ href, icon, children }: NavLinkProps) {

  return (
    <li>
      <div className="flex items-center justify-center">
        <Link
          to={href}
          className='flex gap-2 p-4 min-w-full rounded-lg text-text-primary hover:bg-text-secondary-hover transition-colors duration-200 ease-in-out'
        >
          {icon && (
            <img src={`/icons/${children.toLowerCase()}-icon.svg`} alt={`${children} icon`} height={20} width={20} />
          )}
          {children}
        </Link>
      </div>
    </li>
  );
}