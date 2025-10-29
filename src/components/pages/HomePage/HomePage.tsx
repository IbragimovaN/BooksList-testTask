import { Card } from "../../Card/Card";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import type { IBook } from "../../../types/IBook";
import { useEffect } from "react";
import { fetchBooksAsync } from "../../../store/booksSlice";
import { PageLayout } from "../../common";
import type { RootState } from "../../../store";
import styles from "./HomePage.module.css";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { booksList, isLoading, error } = useAppSelector((state: RootState) => {
    return state.booksStore;
  });
  useEffect(() => {
    dispatch(fetchBooksAsync());
  }, [dispatch]);

  return (
    <PageLayout isLoading={isLoading} error={error}>
      <div>
        <div className={styles.list}>
          {booksList.map((book: IBook) => (
            <Card key={book.id} book={book} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
};
