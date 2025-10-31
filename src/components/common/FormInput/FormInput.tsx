import { type InputHTMLAttributes } from "react";
import styles from "./FormInput.module.css";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
  name: string;
}

export const FormInput = ({ label, placeholder, name }: IProps) => {
  return (
    <label className={styles.label}>
      <span className={styles.labelText}>{label}</span>
      <input name={name} className={styles.input} placeholder={placeholder} />
    </label>
  );
};
