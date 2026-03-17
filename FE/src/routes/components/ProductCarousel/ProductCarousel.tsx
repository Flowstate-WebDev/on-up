import { type ReactNode, useRef } from "react";

export function ProductCarousel({ children }: { children: ReactNode }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      // Get the width of the container to scroll by approximately one screen size or a fixed amount
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full xl:w-4/5 mx-auto group">
      {/* Scroll Left Button */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-bg-primary/95 hover:bg-bg-primary text-text-primary shadow-md p-2 rounded-r-lg opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity focus:opacity-100 hidden sm:block cursor-pointer"
        aria-label="Poprzednie"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto md:gap-x-6 py-4 px-2 hide-scrollbar"
      >
        {children}
      </div>

      {/* Scroll Right Button */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-bg-primary/95 hover:bg-bg-primary text-text-primary shadow-md p-2 rounded-l-lg opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity focus:opacity-100 hidden sm:block cursor-pointer"
        aria-label="Następne"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
      </button>
    </div>
  );
}
