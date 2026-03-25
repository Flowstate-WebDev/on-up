import React from "react";

type Props = {
  children: React.ReactNode;
  style?: string;
};

export default function FooterGridElem({ children, style }: Props) {
  return (
    <div className={style}>
      <div className="flex flex-col gap-1 md:mt-2 text-center md:text-left">
        {children}
      </div>
    </div>
  );
}
