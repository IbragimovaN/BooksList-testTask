import type { IBook, IOpenLibraryBook } from "../../../types/IBook";

export const bookTransformer = (book: IOpenLibraryBook): IBook => {
  return {
    id: book.key.split("/").pop() || book.key,
    title: book.title || "Без названия",
    author: book.author_name?.[0] || "Неизвестный автор",
    coverUrl: book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
      : undefined,
    year: book.first_publish_year,
    language: book.language,
    editionCount: book.edition_count,
    hasFullText: book.has_fulltext,
    ebookAccess: book.ebook_access,
    readOnlineUrl: book.ia?.[0]
      ? `https://archive.org/details/${book.ia[0]}`
      : undefined,
  };
};
