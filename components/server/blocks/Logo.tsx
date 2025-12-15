import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <div className="w-fit">
      <Link href={'/'} id='logo' className='flex gap-1 items-center'>
        <Image src="/images/onup_logo.webp" alt="Logo wydawnictwa" width={64} height={64} className="h-16 w-auto" />
        <div>
          <p className="text-1xl font-semibold text-neutral-600 leading-none">Wydawnictwo</p>
          <h1 className="text-2xl font-bold leading-none">On-Up</h1>
        </div>
      </Link>
    </div>
  );
}