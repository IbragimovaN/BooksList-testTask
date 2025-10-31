import { useRef, type FormEvent } from "react";
import { Button, FormInput } from "../../common";
import { BOOK_FORM_FIELDS } from "../../../constants/bookFormFields";
import styles from "./AddBookForm.module.css";
import type { IBook } from "../../../types/IBook";
import { addNewBook } from "../../../store/booksSlice";
import { useDispatch } from "react-redux";

const createBookFromFormData = (formData: FormData): IBook => {
  const formDataObject = Object.fromEntries(formData);

  return {
    id: crypto.randomUUID(),
    title: String(formDataObject.title || ""),
    author: String(formDataObject.author || ""),
    coverUrl: String(formDataObject.coverUrl || ""),
    year: formDataObject.year ? Number(formDataObject.year) : undefined,
    language: formDataObject.language ? [String(formDataObject.language)] : [],
    editionCount: formDataObject.editionCount
      ? Number(formDataObject.editionCount)
      : undefined,
    hasFullText: false,
    ebookAccess: "",
    readOnlineUrl: "",
  };
};

interface IProp {
  onClose: () => void;
}
export const AddBookForm = ({ onClose }: IProp) => {
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const newBook = createBookFromFormData(formData);
    dispatch(addNewBook(newBook));
    onClose();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Заполните информацию о книге</h2>
      <form
        id="addBookForm"
        ref={formRef}
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <div className={styles.fields}>
          {BOOK_FORM_FIELDS.map((field, index) => (
            <FormInput
              label={field.label}
              name={field.name}
              key={index}
              className={styles.input}
            />
          ))}
        </div>
        <Button type="submit">Добавить книгу</Button>
      </form>
    </div>
  );
};
