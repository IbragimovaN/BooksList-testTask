import type { IBook } from "../../types/IBook";
import { bookTransformer } from "./helpers/bookTransformer";

export const fetchBooks = async (): Promise<IBook[]> => {
  try {
    const response = await fetch(
      "https://openlibrary.org/search.json?subject=fiction&limit=20"
    );
    const data = await response.json();
    console.log(data);
    const formattedBooks = data.docs
      .map(bookTransformer)
      .filter((book: IBook) => book.title && book.author);

    return formattedBooks;
  } catch (error) {
    console.log("Error fetching books:", error);
    throw error;
  }
};
