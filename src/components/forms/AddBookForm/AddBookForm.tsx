import { useRef, type FormEvent, useState } from "react";
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

interface FormErrors {
  title?: string;
  author?: string;
  year?: string;
  coverUrl?: string;
}

export const AddBookForm = ({ onClose }: IProp) => {
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (formData: FormData): boolean => {
    const newErrors: FormErrors = {};
    const title = formData.get("title") as string;
    const author = formData.get("author") as string;
    const year = formData.get("year") as string;
    const coverUrl = formData.get("coverUrl") as string;

    if (!title?.trim()) {
      newErrors.title = "Название книги обязательно";
    }

    if (!author?.trim()) {
      newErrors.author = "Автор обязателен";
    }

    if (year) {
      const yearNum = Number(year);
      if (
        isNaN(yearNum) ||
        yearNum < 1000 ||
        yearNum > new Date().getFullYear()
      ) {
        newErrors.year = "Введите корректный год";
      }
    }

    if (coverUrl && !isValidUrl(coverUrl)) {
      newErrors.coverUrl = "Введите корректный URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    if (!validateForm(formData)) {
      return;
    }

    const newBook = createBookFromFormData(formData);
    dispatch(addNewBook(newBook));
    onClose();
  };

  const clearError = (fieldName: string) => {
    setErrors((prev) => ({ ...prev, [fieldName]: undefined }));
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
            <div key={index}>
              <FormInput
                label={field.label}
                name={field.name}
                className={styles.input}
                onChange={() => clearError(field.name)}
              />
              {errors[field.name as keyof FormErrors] && (
                <div className={styles.error}>
                  {errors[field.name as keyof FormErrors]}
                </div>
              )}
            </div>
          ))}
        </div>
        <Button type="submit">Добавить книгу</Button>
      </form>
    </div>
  );
};
