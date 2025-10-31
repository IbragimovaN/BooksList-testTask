import type { IBook } from "../../types/IBook";
import { bookTransformer } from "./helpers/bookTransformer";

export const fetchBooks = async (
  page: number = 1,
  query: string
): Promise<{
  booksList: IBook[];
  hasMore: boolean;
}> => {
  const limit = 20;
  const searchType = query
    ? `q=${encodeURIComponent(query)}`
    : "subject=fiction";
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?${searchType}&limit=${limit}&page=${page}`
    );
    const data = await response.json();

    const formattedBooks = data.docs
      .map(bookTransformer)
      .filter((book: IBook) => {
        if (!book.title || !book.author) return false;

        const searchTerm = query.toLowerCase();
        const titleMatch = book.title.toLowerCase().includes(searchTerm);
        const authorMatch = book.author.toLowerCase().includes(searchTerm);

        return titleMatch || authorMatch;
      });

    const totalResults = data.numFound;
    const hasMore = page * limit < totalResults;

    return { booksList: formattedBooks, hasMore };
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};
