import type { IBook } from "../../types/IBook";
import { bookTransformer } from "./helpers/bookTransformer";

export const fetchBooks = async (
  page: number = 1
): Promise<{
  booksList: IBook[];
  hasMore: boolean;
}> => {
  const limit = 20;
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?subject=fiction&limit=${limit}&page=${page}`
    );
    const data = await response.json();
    console.log(data);
    const formattedBooks = data.docs
      .map(bookTransformer)
      .filter((book: IBook) => book.title && book.author);

    const totalResults = data.numFound;
    const hasMore = page * limit < totalResults;

    return { booksList: formattedBooks, hasMore };
  } catch (error) {
    console.log("Error fetching books:", error);
    throw error;
  }
};
