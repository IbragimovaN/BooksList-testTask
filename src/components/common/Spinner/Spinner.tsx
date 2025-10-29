import styles from "./Spinner.module.css";

interface IProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

export const Spinner = ({ size = "medium", className = "" }: IProps) => {
  return (
    <div className={`${styles.spinner} ${styles[size]} ${className}`}>
      <div className={styles.loader}></div>
    </div>
  );
};
