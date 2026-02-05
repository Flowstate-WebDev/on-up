import { inputStyle } from './Input.variants'

type Props = {
    type: "text" | "password" | "email" | "tel" | "number" | "date" | "datetime-local" | "time"
    style: "default"
    placeholder: string
}

export function Input({ type, style, placeholder }: Props) {
    return (
        <input type={type} placeholder={placeholder} className={inputStyle({ style })} />
    )
}