import { Link } from "react-router";
import styles from "./Card.module.css";
import type { IBook } from "../../types/IBook";
import { FavoritesIcon } from "../common";
import { useAppDispatch } from "../../store/hooks";
import { setFavorites } from "../../store/booksSlice";

interface IProps {
  book: IBook;
  isFavorite: boolean;
}

export const Card = ({ book, isFavorite }: IProps) => {
  const dispatch = useAppDispatch();
  const handleClickHeart = () => {
    dispatch(setFavorites(book.id));
  };

  return (
    <div className={styles.card}>
      <Link to={`${book.id}`}>
        <div className={styles.cover}>
          {book.coverUrl ? (
            <img
              src={book.coverUrl}
              alt={`Обложка книги "${book.title}"`}
              className={styles.image}
              loading="lazy"
            />
          ) : (
            <div className={styles.placeholder}>📚</div>
          )}
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{book.title}</h3>
          <p className={styles.author}>{book.author}</p>
        </div>
      </Link>
      <FavoritesIcon
        className={styles.heart}
        isRed={isFavorite}
        onClick={handleClickHeart}
      />
    </div>
  );
};
