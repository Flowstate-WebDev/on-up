import { Link } from "@tanstack/react-router";
import { getAssetPath } from "@/utils/paths";

interface LogoProps {
  grayscale?: boolean;
}

export const Logo = ({ grayscale }: LogoProps) => {
  return (
    <div className="w-fit">
      <Link to={"/"} id="logo" className={`flex gap-1 items-center`}>
        <img
          src={getAssetPath("/images/onup_logo.webp")}
          alt="Logo wydawnictwa"
          className={`h-12 select-none ${grayscale ? "grayscale" : ""}`}
        />
        <div>
          <p className={`text-1xl font-semibold ${grayscale ? "text-shadow-text-secondary-hover" : "text-text-primary"} leading-none`}>
            Wydawnictwo
          </p>
          <h1 className={`text-2xl font-bold ${grayscale ? "text-text-obj" : "text-text-primary"} leading-none`}>
            On-Up
          </h1>
        </div>
      </Link>
    </div>
  );
}
