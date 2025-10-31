import styles from "./FilterChip.module.css";

interface FilterChipProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
  count?: number;
}

export const FilterChip = ({
  isActive,
  onClick,
  label,
  count,
}: FilterChipProps) => {
  return (
    <button
      className={`${styles.chip} ${isActive ? styles.active : ""}`}
      onClick={onClick}
      type="button"
    >
      {label}
      {count !== undefined && <span className={styles.count}>({count})</span>}
    </button>
  );
};
