import { getAssetPath } from "@/utils/paths";

type Props = {
  children: string;
};

export function CategoryHeading({ children }: Props) {
  return (
    <div className="flex items-center justify-center gap-2 md:gap-8 px-2">
      <img
        src={getAssetPath("/images/strzalki-prawo.webp")}
        alt=""
        className="w-[80px] md:w-[150px] object-contain shrink-0"
      />
      <h1 className="uppercase font-extrabold text-text-obj text-base sm:text-lg md:text-3xl bg-bg-tertiary rounded-lg p-2 px-3 md:px-4 w-fit text-center">
        {children}
      </h1>
      <img
        src={getAssetPath("/images/strzalki-lewo.webp")}
        alt=""
        className="w-[80px] md:w-[150px] object-contain shrink-0"
      />
    </div>
  );
}
