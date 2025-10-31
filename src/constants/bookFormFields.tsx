export const BOOK_FORM_FIELDS = [
  { label: "Название", name: "title" as const },
  { label: "Автор", name: "author" as const },
  { label: "Обложка", name: "coverUrl" as const },
  { label: "Год издания", name: "year" as const },
  { label: "Язык", name: "language" as const },
  { label: "Количество изданий", name: "editionCount" as const },
] as const;
