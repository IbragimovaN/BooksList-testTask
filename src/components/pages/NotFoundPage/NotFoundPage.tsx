import { BackToHomeButton, PageLayout } from "../../common";
import styles from "./NotFoudPage.module.css";

export const NotFoundPage = () => {
  return (
    <PageLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.message}>Страница не найдена</p>
        <BackToHomeButton />
      </div>
    </PageLayout>
  );
};
