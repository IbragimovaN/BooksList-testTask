import { type ChangeEvent } from "react";
import styles from "./SearchInput.module.css";

interface SearchInputProps {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value: string;
}

export const SearchInput = ({
  handleChange,
  placeholder = "Поиск книг...",
  value,
}: SearchInputProps) => {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={value}
          onChange={(e) => handleChange(e)}
          placeholder={placeholder}
          className={styles.input}
        />
      </div>
    </div>
  );
};
