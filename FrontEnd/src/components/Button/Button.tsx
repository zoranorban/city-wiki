import { FC, ReactNode } from "react";

import "./Button.scss";

type ButtonColor = "white" | "blue";

type ButtonType = "submit" | "button";

interface ButtonProps {
  children: ReactNode;
  type?: ButtonType;
  onClick?: () => void;
  color?: ButtonColor;
}

const Button: FC<ButtonProps> = ({
  children,
  type = "button",
  color = "blue",
  onClick,
}) => {
  const className = `button button-${color}`;
  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
