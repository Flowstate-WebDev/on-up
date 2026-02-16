import { Link } from '@tanstack/react-router';
import { getAssetPath } from '@/utils/paths';

export const Logo = () => {
  return (
    <div className="w-fit">
      <Link to={'/'} id='logo' className='flex gap-1 items-center'>
        <img src={getAssetPath('/images/onup_logo.webp')} alt={'logo'} width={52} height={52} className="h-13 w-auto" />
        <div>
          <p className="text-1xl font-semibold text-text-secondary leading-none">Wydawnictwo</p>
          <h1 className="text-2xl font-bold text-text-primary leading-none">On-Up</h1>
        </div>
      </Link>
    </div>
  );
}