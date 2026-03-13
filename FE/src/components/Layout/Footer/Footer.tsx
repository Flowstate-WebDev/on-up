import { Link } from "@tanstack/react-router";

// import { Button } from "@/components/ui/Button";
import { Logo } from "../Header/Logo";
// import { Heading } from "@/components/ui/Heading";
import { ContactBlock } from "@/components/ui/ContactBlock";

export const Footer = () => {
  return (
    <div className="w-full xl:w-2/3 xl:mx-auto items-stretch justify-center px-8 bg-primary text-text-obj p-6 rounded-t-lg">
      <div className="mb-4">
        <Logo grayscale />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="">
          <h4 className="font-bold text-md mb-2">Realizacja strony</h4>
          <ContactBlock
            icon="/icons/mail-icon.svg"
            text="huelleigor1@outlook.com"
          />
          <ContactBlock
            icon="/icons/mail-icon.svg"
            text="33patryk.jarosz@gmail.com"
          />
        </div>
        <div className="">
          <div className="flex flex-col gap-1 mt-2">
            <Link
              to="/polityka/regulamin"
              className="text-sm text-text-obj hover:opacity-80 transition-opacity"
            >
              Regulamin strony
            </Link>
            <Link
              to="/polityka/dostawy-i-platnosci"
              className="text-sm text-text-obj hover:opacity-80 transition-opacity"
            >
              Dostawy i płatność
            </Link>
            <Link
              to="/polityka/polityka-prywatnosci"
              className="text-sm text-text-obj hover:opacity-80 transition-opacity"
            >
              Polityka prywatnośći
            </Link>
          </div>
        </div>
        <div className="">
          <div className="flex flex-col gap-1 mt-2">
            <Link
              to="/polityka/o-nas"
              className="text-sm text-text-obj hover:opacity-80 transition-opacity"
            >
              O nas
            </Link>
            <Link
              to="/polityka/polityka-zwrotow"
              className="text-sm text-text-obj hover:opacity-80 transition-opacity"
            >
              Polityka zwrotów
            </Link>
          </div>
        </div>
        <div className="">
          <div className="flex flex-col gap-1 mt-2">
            <Link
              to="/"
              className="text-sm text-text-obj hover:opacity-80 transition-opacity"
            >
              Strona główna
            </Link>
            <a
              href="/downloads/umowaonup.pdf"
              download
              className="text-sm text-text-obj hover:opacity-80 transition-opacity"
            >
              Formularz odstąpienia
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
