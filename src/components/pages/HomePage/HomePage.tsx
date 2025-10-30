import { Card } from "../../Card/Card";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import type { IBook } from "../../../types/IBook";
import { useEffect } from "react";
import { fetchBooksAsync } from "../../../store/booksSlice";
import { PageLayout, Spinner } from "../../common";
import type { RootState } from "../../../store";
import styles from "./HomePage.module.css";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const {
    booksList,
    isLoading,
    error,
    favoritesBooksArr,
    hasMore,
    isLoadingMore,
  } = useAppSelector((state: RootState) => {
    return state.booksStore;
  });

  const { lastNodeRef } = useInfiniteScroll();

  useEffect(() => {
    if (booksList.length === 0) {
      dispatch(fetchBooksAsync(1));
    }
  }, [dispatch, booksList.length]);

  return (
    <PageLayout isLoading={isLoading} error={error}>
      <div>
        <div className={styles.list}>
          {booksList.map((book: IBook, index: number) => {
            const isLastElement = booksList.length === index + 1;

            return (
              <div
                key={`${book.id}-${index}`}
                ref={isLastElement && hasMore ? lastNodeRef : undefined}
              >
                <Card
                  book={book}
                  isFavorite={favoritesBooksArr.some(
                    (item) => item === book.id
                  )}
                />
              </div>
            );
          })}
        </div>
        {isLoadingMore && <Spinner size="small" className={styles.spinner} />}
      </div>
    </PageLayout>
  );
};
