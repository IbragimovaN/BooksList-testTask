import type { ReactNode } from "react";
import styles from "./Page.layout.module.css";
import { Spinner } from "../Spinner/Spinner";

interface IProps {
  children: ReactNode;
  isLoading?: boolean;
  error?: string | null;
}
export const PageLayout = ({ children, isLoading, error }: IProps) => {
  return (
    <div className={styles.page}>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};
