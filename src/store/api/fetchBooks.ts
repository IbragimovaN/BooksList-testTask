import type { IBook, IOpenLibraryBook } from "../../types/IBook";

export const fetchBooks = async (): Promise<IBook[]> => {
  try {
    const response = await fetch(
      "https://openlibrary.org/search.json?subject=fiction&limit=20"
    );
    const data = await response.json();
    console.log(data);
    const formattedBooks = data.docs
      .map((book: IOpenLibraryBook) => ({
        id: book.key,
        title: book.title || "Без названия",
        author: book.author_name?.[0] || "Неизвестный автор",
        year: book.first_publish_year,
        subjects: book.subject?.slice(0, 5) || [],
        isbn: book.isbn?.[0] || null,
        coverUrl: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
          : null,
      }))
      .filter((book: IBook) => book.title && book.author);

    return formattedBooks;
  } catch (error) {
    console.log("Error fetching books:", error);
    throw error;
  }
};
