import { Card } from "../../Card/Card";
import styles from "./HomePage.module.css";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import type { IBook } from "../../../types/IBook";
import { Spinner } from "../../common/Spinner/Spinner";
import { useEffect } from "react";
import { fetchBooksAsync } from "../../../store/booksSlice";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { booksList, isLoading, error } = useAppSelector((state) => {
    console.log(state);
    return state.booksStore;
  });
  useEffect(() => {
    dispatch(fetchBooksAsync());
  }, [dispatch]);
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.list}>
          {booksList.map((book: IBook) => (
            <Card key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};
