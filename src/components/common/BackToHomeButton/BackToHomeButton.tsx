import { Link } from "react-router";
import styles from "./BackToHomeButton.module.css";

interface BackToHomeButtonProps {
  className?: string;
}

export const BackToHomeButton = ({ className = "" }: BackToHomeButtonProps) => {
  return (
    <Link to="/" className={`${styles.link} ${className}`}>
      Вернуться на главную
    </Link>
  );
};
