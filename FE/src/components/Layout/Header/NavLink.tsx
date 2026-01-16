import { Link } from '@tanstack/react-router';

type NavLinkProps = {
  href: string,
  icon?: boolean,
  children: string,
  badge?: number
};

export default function NavLink({ href, icon, children, badge }: NavLinkProps) {

  return (
    <li>
      <div className="flex items-center justify-center">
        <Link
          to={href}
          className='flex gap-2 p-4 min-w-full rounded-lg text-text-primary hover:bg-text-secondary-hover transition-colors duration-200 ease-in-out relative'
        >
          {icon && (
            <img src={`/icons/${children.toLowerCase()}-icon.svg`} alt={`${children} icon`} height={20} width={20} />
          )}
          {badge !== undefined && badge > 0 && (
            <span className='absolute top-2 right-2 bg-primary text-text-obj text-xs font-bold px-1.5 py-0.5 rounded-full'>
              {badge}
            </span>
          )}
          {children}
        </Link>
      </div>
    </li>
  );
}