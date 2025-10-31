import { Link } from "react-router";
import styles from "./BackToHomeButton.module.css";
import { ROUTES } from "../../../constants/routes";

interface BackToHomeButtonProps {
  className?: string;
}

export const BackToHomeButton = ({ className = "" }: BackToHomeButtonProps) => {
  return (
    <Link to={ROUTES.HOME} className={`${styles.link} ${className}`}>
      Вернуться на главную
    </Link>
  );
};
