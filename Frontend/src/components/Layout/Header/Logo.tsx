import { Link } from '@tanstack/react-router';

export default function Logo() {
  return (
    <div className="w-fit">
      <Link to={'/'} id='logo' className='flex gap-1 items-center'>
        <img src="/images/onup_logo.webp" alt="Logo wydawnictwa" width={64} height={64} className="h-16 w-auto" />
        <div>
          <p className="text-1xl font-semibold text-text-secondary leading-none">Wydawnictwo</p>
          <h1 className="text-2xl font-bold text-text-primary leading-none">On-Up</h1>
        </div>
      </Link>
    </div>
  );
}