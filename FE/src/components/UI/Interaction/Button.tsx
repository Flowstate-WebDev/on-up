import { buttonStyle } from '@/styles';

type Props = {
  children: React.ReactNode,
  style: "default" | "outline",
  type: "button" | "submit" | "reset",
  disabled?: boolean,
  onClick?: () => void
}

export default function Button({ children, style, type, disabled, onClick }: Props) {
  return (
    <button
      type={type}
      className={`${buttonStyle({ style })} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}