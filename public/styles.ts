import { tv } from "tailwind-variants";

export const buttonStyle = tv({
    base: "rounded-lg p-2",
    variants: {
        style: {
            default: "bg-primary text-text-obj hover:bg-secondary transition-colors duration-200 ease-in-out",
            default_white: "bg-white text-text-primary hover:text-primary transition-colors duration-200 ease-in-out",
            outline: "bg-transparent text-primary border-primary border hover:text-text-primary hover:bg-quad transition-colors duration-200 ease-in-out",
        }
    }
})

export const inputStyle = tv({
    base: "border p-2 rounded-lg",
    variants: {
        style: {
            default: "border-border-primary focus:border-primary text-text-secondary focus:text-text-primary focus:bg-quad transition-colors duration-200 ease-in-out",
        }
    }
})

export const selectStyle = tv({
    base: "border p-2 rounded-lg",
    variants: {
        style: {
            default: "border-border-primary focus:border-primary text-text-secondary transition-colors duration-200 ease-in-out",
        }
    }
})