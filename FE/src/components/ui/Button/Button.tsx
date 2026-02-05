import { buttonStyles } from './Button.variants';

type Props = {
  children: React.ReactNode,
  style: "default" | "outline" | "default_white" | "outline_white",
  type: "button" | "submit" | "reset",
  disabled?: boolean,
  onClick?: () => void
}

export function Button({ children, style, type, disabled, onClick }: Props) {
  return (
    <button
      type={type}
      className={`${buttonStyles({ style })} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}