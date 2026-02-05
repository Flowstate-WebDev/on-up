import { tv } from "tailwind-variants";

export const buttonStyles = tv({
  base: "rounded-lg p-2 cursor-pointer",
  variants: {
    style: {
      default: "bg-primary text-text-obj hover:bg-secondary transition-colors duration-200 ease-in-out",
      default_white: "bg-white text-text-primary hover:text-primary transition-colors duration-200 ease-in-out",
      outline: "bg-transparent text-primary border-primary border hover:text-text-primary hover:bg-quad transition-colors duration-200 ease-in-out",
      outline_white: "bg-transparent text-text-obj border-text-obj border hover:text-text-primary hover:bg-quad transition-colors duration-200 ease-in-out",
    }
  }
})