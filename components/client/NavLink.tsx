import React from "react";
import Image from "next/image";
import Link from "next/link";

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
          href={href}
          className='flex gap-2 p-4 min-w-full rounded-lg hover:bg-neutral-300/50 transition-colors duration-200 ease-in-out'
        >
          {icon && (
            <Image src={`/icons/${ children }-icon.svg`} alt={`${children} icon`} height={20} width={20} />
          )}
          {children}
        </Link>
      </div>
    </li>
  );
}