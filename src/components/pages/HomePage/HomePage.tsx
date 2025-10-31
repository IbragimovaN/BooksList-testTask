import { Card } from "../../Card/Card";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import type { IBook } from "../../../types/IBook";
import { useEffect, useState, type ChangeEvent } from "react";
import { fetchBooksAsync } from "../../../store/booksSlice";
import {
  Button,
  FilterChip,
  PageLayout,
  SearchInput,
  Spinner,
} from "../../common";
import type { RootState } from "../../../store";
import styles from "./HomePage.module.css";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import { useDebounce } from "../../../hooks/useDebounce";
import { AddBookForm } from "../../forms/AddBookForm/AddBookForm";
import { ModalWindow } from "../../common/ModalWindow/ModalWindow";

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
  const [isOpenFormAddBook, setIsOpenFormNewBook] = useState(false);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const debouncedValue = useDebounce(query, 500);

  const filteredBooks = showOnlyFavorites
    ? booksList.filter((book) => favoritesBooksArr.includes(book.id))
    : booksList;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchBooksAsync({ page: 1, query: debouncedValue }));
  }, [dispatch, debouncedValue]);

  const handleToggleFavoritesFilter = () => {
    setShowOnlyFavorites((prev) => !prev);
  };

  const handleClickAddBook = () => {
    setIsOpenFormNewBook(true);
  };

  return (
    <PageLayout>
      <div className={styles.headerPanel}>
        <FilterChip
          isActive={showOnlyFavorites}
          onClick={handleToggleFavoritesFilter}
          label="Избранные"
          count={favoritesBooksArr.length}
        />
        <SearchInput value={query} handleChange={handleChange} />
        <Button onClick={handleClickAddBook}>Добавить книгу</Button>
      </div>
      <div className={`${isLoading ? styles.wrapper : ""}`}>
        {isLoading ? (
          <Spinner className={styles.spinner} />
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <>
            <div className={styles.list}>
              {filteredBooks.map((book: IBook, index: number) => {
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
      {isOpenFormAddBook && (
        <ModalWindow onClose={() => setIsOpenFormNewBook(false)}>
          <AddBookForm onClose={() => setIsOpenFormNewBook(false)} />
        </ModalWindow>
      )}
    </PageLayout>
  );
};
