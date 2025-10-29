import type { IBook } from "../../types/IBook";
import { bookTransformer } from "./helpers/bookTransformer";

export const fetchBookById = async (bookId: string): Promise<IBook> => {
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=key:/works/${bookId}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("cuurentData", data);

    if (!data.docs || data.docs.length === 0) {
      throw new Error("Book not found");
    }

    return bookTransformer(data.docs[0]);
  } catch (error) {
    console.error("Error fetching book:", error);
    throw error;
  }
};
