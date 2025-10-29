import styles from "./FavoritesIcon.module.css";

interface IProps {
  className: string;
  isRed: boolean;
  onClick?: () => void;
}
export const FavoritesIcon = ({ className, isRed, onClick }: IProps) => {
  return (
    <div className={`${styles.wrapper} ${className}`} onClick={onClick}>
      <div className={` ${isRed ? styles.active : styles.outline}`}></div>
    </div>
  );
};
