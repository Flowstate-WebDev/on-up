import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/Button";
import { Logo } from "../Header/Logo";
import { Heading } from "@/components/ui/Heading";
import { ContactBlock } from "@/components/ui/ContactBlock";

export const Footer = () => {
  return (
    <div className="w-full xl:w-2/3 xl:mx-auto items-stretch justify-center px-8 bg-primary text-text-obj p-6 rounded-t-lg">
      <div className="mb-4">
        <Logo grayscale />
      </div>
      <div className="grid grid-cols-4">
        <div className="">
          <Heading size="md">Kontakt</Heading>
          <ContactBlock icon="/icons/mail-icon.svg" text="huelleigor1@outlook.com" />
          <ContactBlock icon="/icons/mail-icon.svg" text="33patryk.jarosz@gmail.com" />
        </div>
        <div className="">
          <Heading size="md">Polityka strony</Heading>
          <Button style={"outline_white"} type={"button"}>
            <Link to={"/polityka"}>Zobacz politykę</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
