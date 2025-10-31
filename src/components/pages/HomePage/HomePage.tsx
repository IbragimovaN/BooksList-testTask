import { Card } from "../../Card/Card";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import type { IBook } from "../../../types/IBook";
import { useEffect, useState, type ChangeEvent } from "react";
import { fetchBooksAsync } from "../../../store/booksSlice";
import { PageLayout, SearchInput, Spinner } from "../../common";
import type { RootState } from "../../../store";
import styles from "./HomePage.module.css";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import { useDebounce } from "../../../hooks/useDebounce";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const {
    booksList,
    error,
    favoritesBooksArr,
    hasMore,
    isLoadingMore,
    isLoading,
  } = useAppSelector((state: RootState) => {
    return state.booksStore;
  });

  const { lastNodeRef } = useInfiniteScroll();
  const [query, setQuery] = useState("");
  const debouncedValue = useDebounce(query, 500);

  useEffect(() => {
    dispatch(fetchBooksAsync({ page: 1, query: debouncedValue }));
  }, [dispatch, debouncedValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <PageLayout>
      <SearchInput value={query} handleChange={handleChange}></SearchInput>
      <div className={styles.wrapper}>
        {isLoading ? (
          <Spinner className={styles.spinner} />
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <>
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
            {isLoadingMore && (
              <Spinner size="small" className={styles.spinner} />
            )}
          </>
        )}
      </div>
    </PageLayout>
  );
};
