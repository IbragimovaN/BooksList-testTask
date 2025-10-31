import type { ReactNode } from "react";
import styles from "./ModalWindow.module.css";

interface IProps {
  children: ReactNode;
  onClose: () => void;
}

export const ModalWindow = ({ children, onClose }: IProps) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
};
