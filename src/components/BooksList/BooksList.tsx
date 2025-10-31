import { Card } from "../Card/Card";
import type { IBook } from "../../types/IBook";
import { Spinner } from "../common";
import styles from "./BooksList.module.css";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

interface BooksListProps {
  books: IBook[];
  favoritesBooksArr: string[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  showOnlyFavorites: boolean;
  query: string;
}

export const BooksList = ({
  books,
  favoritesBooksArr,
  isLoading,
  isLoadingMore,
  error,
  hasMore,
  showOnlyFavorites,
  query,
}: BooksListProps) => {
  const { lastNodeRef } = useInfiniteScroll();

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <Spinner className={styles.spinner} />
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {books.map((book: IBook, index: number) => {
          const isLastElement = books.length === index + 1;

          return (
            <div
              key={`${book.id}-${index}`}
              ref={
                isLastElement && hasMore && !showOnlyFavorites && query === ""
                  ? lastNodeRef
                  : undefined
              }
            >
              <Card
                book={book}
                isFavorite={favoritesBooksArr.some((item) => item === book.id)}
              />
            </div>
          );
        })}
      </div>
      {isLoadingMore && <Spinner size="small" className={styles.spinner} />}
      {showOnlyFavorites && books.length === 0 && (
        <div className={styles.emptyState}>В избранном пока нет книг</div>
      )}
    </div>
  );
};
