import type { ReactNode } from "react";
import styles from "./Button.module.css";

interface IProps {
  children: ReactNode;
  onClick: () => void;
}
export const Button = ({ children, onClick }: IProps) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};
