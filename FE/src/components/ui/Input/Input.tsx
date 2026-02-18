import { inputStyle } from "./Input.variants";

interface Props extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "style"
> {
  style: "default";
}

export const Input = ({ style, className, ...props }: Props) => {
  return (
    <input
      className={`${inputStyle({ style })} w-full ${className}`}
      {...props}
    />
  );
};
