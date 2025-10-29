import { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  fetchBookByIdAsync,
  selectCurrentBook,
  selectIsLoading,
  selectError,
} from "../../../store/booksSlice";
import { PageLayout } from "../../common";
import { Button } from "../../common/Button/Button";
import styles from "./BookPage.module.css";

export const BookPage = () => {
  const { id } = useParams();
  console.log(id);
  const dispatch = useAppDispatch();
  const currentBook = useAppSelector(selectCurrentBook);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    if (id) {
      dispatch(fetchBookByIdAsync(id));
    }
  }, [id, dispatch]);

  const handleReadBook = () => {
    if (currentBook?.readOnlineUrl) {
      window.open(currentBook.readOnlineUrl, "_blank");
    }
  };

  return (
    <PageLayout isLoading={isLoading} error={error}>
      {currentBook && (
        <div className={styles.container}>
          <div className={styles.coverSection}>
            {currentBook.coverUrl ? (
              <img
                src={currentBook.coverUrl}
                alt={currentBook.title}
                className={styles.cover}
              />
            ) : (
              <div className={styles.coverPlaceholder}>📚</div>
            )}
          </div>

          <div className={styles.infoSection}>
            <h1 className={styles.title}>{currentBook.title}</h1>
            <p className={styles.author}>{currentBook.author}</p>

            <div className={styles.details}>
              {currentBook.year && (
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Год издания:</span>
                  <span>{currentBook.year}</span>
                </div>
              )}

              {currentBook.language && currentBook.language.length > 0 && (
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Языки:</span>
                  <span>{currentBook.language.join(", ")}</span>
                </div>
              )}

              {currentBook.editionCount && (
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Изданий:</span>
                  <span>{currentBook.editionCount}</span>
                </div>
              )}

              {currentBook.hasFullText && (
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Полный текст:</span>
                  <span className={styles.available}>Доступен</span>
                </div>
              )}
            </div>

            {currentBook.readOnlineUrl && (
              <Button onClick={handleReadBook}>Скачать из источника</Button>
            )}
          </div>
        </div>
      )}
    </PageLayout>
  );
};
