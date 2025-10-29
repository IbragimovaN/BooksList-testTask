import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { IBook } from "../types/IBook";
import type { RootState } from "./index";
import { fetchBooks } from "./api/fetchBooks";
import { fetchBookById } from "./api/fetchBookById";

export interface IBooksSlice {
  booksList: IBook[];
  isLoading: boolean;
  error: string | null;
  favoritesBooksArr: string[];
  currentBook: IBook | null;
}

const initialState: IBooksSlice = {
  booksList: [],
  isLoading: false,
  error: null,
  favoritesBooksArr: [],
  currentBook: null,
};

export const fetchBooksAsync = createAsyncThunk(
  "books/fetchBooks",
  async () => {
    return await fetchBooks();
  }
);

export const fetchBookByIdAsync = createAsyncThunk(
  "books/fetchBookById",
  async (bookId: string): Promise<IBook> => {
    return await fetchBookById(bookId);
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
    setFavorites: (state, action: PayloadAction<IBook["id"]>) => {
      const currentId = action.payload;
      if (state.favoritesBooksArr.some((item) => item === currentId)) {
        state.favoritesBooksArr = state.favoritesBooksArr.filter(
          (item) => item !== currentId
        );
      } else {
        state.favoritesBooksArr.push(currentId);
      }
    },
    clearCurrentBook: (state) => {
      state.currentBook = null;
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
      })
      .addCase(fetchBookByIdAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.currentBook = null;
      })
      .addCase(fetchBookByIdAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentBook = action.payload;
        state.error = null;
      })
      .addCase(fetchBookByIdAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch book";
        state.currentBook = null;
      });
  },
});

export const { addNewBook, deleteBook, setFavorites, clearCurrentBook } =
  booksSlice.actions;

export default booksSlice.reducer;

export const selectBooksList = (state: RootState) => state.booksStore.booksList;
export const selectFavoritesArr = (state: RootState) =>
  state.booksStore.favoritesBooksArr;
export const selectIsLoading = (state: RootState) => state.booksStore.isLoading;
export const selectError = (state: RootState) => state.booksStore.error;
export const selectCurrentBook = (state: RootState) =>
  state.booksStore.currentBook;
