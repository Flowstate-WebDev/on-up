<<<<<<< HEAD
import { Link } from "@tanstack/react-router";
=======
import { Link } from '@tanstack/react-router';
import { getAssetPath } from '@/utils/paths';
>>>>>>> 6af984b2cae92230f72240fc47a720913b8c84da

interface LogoProps {
  grayscale?: boolean;
}

export default function Logo({ grayscale }: LogoProps) {
  return (
    <div className="w-fit">
<<<<<<< HEAD
      <Link
        to={"/"}
        id="logo"
        className={`flex gap-1 items-center ${grayscale ? "grayscale opacity-80" : ""}`}
      >
        <img
          src="/images/onup_logo.webp"
          alt="Logo wydawnictwa"
          width={64}
          height={64}
          className="h-16 w-auto"
        />
=======
      <Link to={'/'} id='logo' className='flex gap-1 items-center'>
        <img src={getAssetPath('/images/onup_logo.webp')} alt={'logo'} width={64} height={64} className="h-16 w-auto" />
>>>>>>> 6af984b2cae92230f72240fc47a720913b8c84da
        <div>
          <p className="text-1xl font-semibold text-text-secondary leading-none">
            Wydawnictwo
          </p>
          <h1 className="text-2xl font-bold text-text-primary leading-none">
            On-Up
          </h1>
        </div>
      </Link>
    </div>
  );
}
