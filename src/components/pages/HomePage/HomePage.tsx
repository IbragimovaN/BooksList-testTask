import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useEffect, useState, type ChangeEvent } from "react";
import { fetchBooksAsync } from "../../../store/booksSlice";
import { Button, FilterChip, PageLayout, SearchInput } from "../../common";
import type { RootState } from "../../../store";
import styles from "./HomePage.module.css";
import { useDebounce } from "../../../hooks/useDebounce";
import { AddBookForm } from "../../forms/AddBookForm/AddBookForm";
import { ModalWindow } from "../../common/ModalWindow/ModalWindow";
import { BooksList } from "../../BooksList/BooksList";

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

      <BooksList
        books={filteredBooks}
        favoritesBooksArr={favoritesBooksArr}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
        error={error}
        hasMore={hasMore}
        showOnlyFavorites={showOnlyFavorites}
        query={query}
      />

      {isOpenFormAddBook && (
        <ModalWindow onClose={() => setIsOpenFormNewBook(false)}>
          <AddBookForm onClose={() => setIsOpenFormNewBook(false)} />
        </ModalWindow>
      )}
    </PageLayout>
  );
};
