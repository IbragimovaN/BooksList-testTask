import type { MouseEvent, ReactNode } from "react";
import styles from "./Button.module.css";

interface IProps {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
}

export const Button = ({ children, onClick, type = "button" }: IProps) => {
  return (
    <button className={styles.button} onClick={onClick} type={type}>
      {children}
    </button>
  );
};
