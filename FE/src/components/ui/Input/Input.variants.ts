import { tv } from "tailwind-variants";

export const inputStyle = tv({
  base: "border p-2 rounded-lg",
  variants: {
    style: {
      default: "border-border-primary focus:border-primary text-text-secondary focus:text-text-primary focus:bg-quad transition-colors duration-200 ease-in-out",
    }
  }
})

export const errorInput = tv({
  base: "text-red-500 text-md"
})