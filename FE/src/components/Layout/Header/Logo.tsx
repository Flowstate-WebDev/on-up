import { Link } from "@tanstack/react-router";

<<<<<<< HEAD
interface LogoProps {
  grayscale?: boolean;
}

export default function Logo({ grayscale }: LogoProps) {
  return (
    <div className="w-fit">
      <Link to={"/"} id="logo" className={`flex gap-1 items-center`}>
        <img
          src="/images/onup_logo.webp"
          alt="Logo wydawnictwa"
          width={64}
          height={64}
          className={`h-16 w-auto ${grayscale ? "grayscale" : ""}`}
        />
=======
export const Logo = () => {
  return (
    <div className="w-fit">
      <Link to={'/'} id='logo' className='flex gap-1 items-center'>
        <img src={getAssetPath('/images/onup_logo.webp')} alt={'logo'} width={52} height={52} className="h-13 w-auto" />
>>>>>>> 8925610a0e0439229b67a9e42e1ac801f895b79f
        <div>
          <p
            className={`text-1xl font-semibold ${grayscale ? "text-shadow-text-secondary-hover" : "text-text-primary"} leading-none`}
          >
            Wydawnictwo
          </p>
          <h1
            className={`text-2xl font-bold ${grayscale ? "text-text-obj" : "text-text-primary"} leading-none`}
          >
            On-Up
          </h1>
        </div>
      </Link>
    </div>
  );
}
