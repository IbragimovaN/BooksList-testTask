import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { IBook } from "../types/IBook";
import type { RootState } from "./index";
import { fetchBooks } from "./api/fetchBooks";

export interface IBooksSlice {
  booksList: IBook[];
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
    return await fetchBooks();
  }
);

export const booksSlice = createSlice({
  name: "booksStore",
  initialState,
  reducers: {
    addNewBook: (state, action: PayloadAction<IBook>) => {
      state.booksList.push(action.payload);
    },
    deleteBook: (state, action: PayloadAction<IBook["id"]>) => {
      state.booksList = state.booksList.filter(
        (book) => book.id !== action.payload
      );
    },
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
      .addCase(fetchBooksAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch books";
      });
  },
});

export const { addNewBook, deleteBook } = booksSlice.actions;

export default booksSlice.reducer;

export const selectBooksList = (state: RootState) => state.booksStore.booksList;
export const selectIsLoading = (state: RootState) => state.booksStore.isLoading;
export const selectError = (state: RootState) => state.booksStore.error;
