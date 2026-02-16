import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/Button";
import Logo from "../Header/Logo";

export const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row w-full xl:w-2/3 xl:mx-auto items-stretch justify-center px-8 bg-primary text-text-obj p-6 rounded-t-lg divider-lines">
      <div className="flex grow gap-1 mb-6 md:mb-0 justify-center items-center">
        <Logo grayscale />
      </div>
      <div className="flex grow flex-col text-center justify-center items-center">
        <div className="flex gap-2">
          <p>Strona wykonana przez</p>
        </div>
        <div className="flex gap-2">
          <img
            className="w-4 h-4 brightness-0 invert self-center"
            src="/icons/mail-icon.svg"
            alt=""
          />
          <p>huelleigor1@outlook.com</p>
        </div>
        <div className="flex gap-2 mb-4">
          <img
            className="w-4 h-4 brightness-0 invert self-center"
            src="/icons/mail-icon.svg"
            alt=""
          />
          <p>33patryk.jarosz@gmail.com</p>
        </div>
        <Button style={"outline_white"} type={"button"}>
          <Link to={"/polityka"}>Polityka strony</Link>
        </Button>
      </div>
      <div className="grow mt-6 md:mt-0 text-center flex flex-col justify-center items-center">
        <p>ul. Gajowa 14/2, 82-500 Rakowiec</p>
        <p>NIP 5811228975, REGON 192050931</p>
        <p>Firma wpisana do CEIDG</p>
      </div>
    </div>
  );
};
