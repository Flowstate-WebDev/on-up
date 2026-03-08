import { inputStyle } from "./Input.variants";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  style?: "default";
};

export const Input = ({ style = "default", className, ...props }: Props) => {
  return (
    <input
      className={inputStyle({ style }) + (className ? ` ${className}` : "")}
      {...props}
    />
  );
};
