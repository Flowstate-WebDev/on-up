import { tv } from "tailwind-variants";

export const selectStyle = tv({
  base: "border p-2 rounded-lg",
  variants: {
    style: {
      default: "border-border-primary focus:border-primary text-text-secondary transition-colors duration-200 ease-in-out",
    }
  }
})