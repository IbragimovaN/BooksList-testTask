import type { MouseEvent, ReactNode } from "react";
import styles from "./Button.module.css";

interface IProps {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export const Button = ({
  children,
  onClick,
  type = "button",
  className,
}: IProps) => {
  return (
    <button
      className={`${styles.button} ${
        className ? className : styles.defaultBtn
      }`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
