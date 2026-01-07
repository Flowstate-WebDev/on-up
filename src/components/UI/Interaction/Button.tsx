import { buttonStyle } from '@/public/styles';

type Props = {
  children: React.ReactNode,
  style: "default" | "outline"
  type: "button" | "submit" | "reset"
}

export default function Button({ children, style, type }: Props) {
  return (
    <button type={type} className={buttonStyle({ style })}>{children}</button>
  )
}