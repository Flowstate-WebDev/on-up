import { buttonStyles } from './Button.variants';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode,
  style: "default" | "outline" | "default_white" | "outline_white",
}

export const Button = ({ children, style, className, disabled, ...props }: Props) => {
  return (
    <button
      className={`${buttonStyles({ style })} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className || ''}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}