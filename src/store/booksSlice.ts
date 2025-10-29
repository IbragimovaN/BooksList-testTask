import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { IBook } from "../types/IBook";
import type { RootState } from "@reduxjs/toolkit/query";

export interface IBooksSlice {
  booksList: [] | IBook[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IBooksSlice = {
  booksList: [],
  isLoading: false,
  error: null,
};

export const fetchBooksAsync = createAsyncThunk(
  "books/fetchBooks",
  async () => {
    console.log("async func start");
    try {
      const response = await fetch(
        "https://openlibrary.org/search.json?subject=fiction&limit=20"
      );
      const data = await response.json();

      const formattedBooks = data.docs
        .map((book) => ({
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
        .filter((book) => book.title && book.author);

      return formattedBooks;
    } catch (error) {
      console.error("Error fetching books:", error);
      return "Error fetching books";
    }
  }
);

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addNewBook: (state, action: PayloadAction<IBook>) =>
      state.booksList.push(action.payload.book),
    deleteBook: (state, action: PayloadAction<IBook>) =>
      state.booksList.filter((book) => book.id !== action.payload.book.id),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooksAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBooksAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.booksList = action.payload;
        state.error = null;
      })
      .addCase(fetchBooksAsync.rejected, (state) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { addNewBook, deleteBook } = booksSlice.actions;

export default booksSlice.reducer;

export const selectBooksList = (state: RootState) => state.books.booksList;
export const selectIsLoading = (state: RootState) => state.books.isLoading;
export const selectError = (state: RootState) => state.books.error;
