import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { IBook } from "../types/IBook";
import type { RootState } from "./index";
import { fetchBooks } from "./api/fetchBooks";
import { fetchBookById } from "./api/fetchBookById";
import { ERROR_MESSAGES } from "../constants/errorMessages";

export interface IBooksSlice {
  booksList: IBook[];
  isLoading: boolean;
  error: string | null;
  favoritesBooksArr: string[];
  currentBook: IBook | null;
  currentPage: number;
  hasMore: boolean;
  isLoadingMore: boolean;
}

const initialState: IBooksSlice = {
  booksList: [],
  isLoading: false,
  error: null,
  favoritesBooksArr: [],
  currentBook: null,
  currentPage: 1,
  hasMore: true,
  isLoadingMore: false,
};

export const fetchBooksAsync = createAsyncThunk(
  "books/fetchBooks",
  async ({ page = 1, query = "" }: { page: number; query?: string }) => {
    return await fetchBooks(page, query);
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
      console.log("addd", action.payload);
      state.booksList.unshift(action.payload);
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
      .addCase(fetchBooksAsync.pending, (state, action) => {
        if (action.meta.arg.page === 1) {
          state.isLoading = true;
        } else {
          state.isLoadingMore = true;
        }
        state.error = null;
      })
      .addCase(fetchBooksAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoadingMore = false;

        if (action.meta.arg.page === 1) {
          state.booksList = action.payload.booksList;
        } else {
          const existingIds = new Set(state.booksList.map((book) => book.id));
          const newBooks = action.payload.booksList.filter(
            (book) => !existingIds.has(book.id)
          );
          state.booksList = [...state.booksList, ...newBooks];
        }

        state.hasMore = action.payload.hasMore;
        state.currentPage = action.meta.arg.page;
        state.error = null;
      })
      .addCase(fetchBooksAsync.rejected, (state) => {
        state.isLoading = false;
        state.error = ERROR_MESSAGES.FAILED_FETCH_BOOKS;
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
      .addCase(fetchBookByIdAsync.rejected, (state) => {
        state.isLoading = false;
        state.error = ERROR_MESSAGES.FAILED_FETCH_BOOKS;
        state.currentBook = null;
      });
  },
});

export const { addNewBook, setFavorites, clearCurrentBook } =
  booksSlice.actions;

export default booksSlice.reducer;

export const selectBooksList = (state: RootState) => state.booksStore.booksList;
export const selectFavoritesArr = (state: RootState) =>
  state.booksStore.favoritesBooksArr;
export const selectIsLoading = (state: RootState) => state.booksStore.isLoading;
export const selectError = (state: RootState) => state.booksStore.error;
export const selectCurrentBook = (state: RootState) =>
  state.booksStore.currentBook;
export const selectHasMoreForInfiniteScroll = (state: RootState) =>
  state.booksStore.hasMore;
