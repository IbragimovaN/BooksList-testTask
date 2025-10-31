import { useCallback, useRef } from "react";
import type { RootState } from "../store";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchBooksAsync } from "../store/booksSlice";

export const useInfiniteScroll = () => {
  const dispatch = useAppDispatch();
  const { isLoading, isLoadingMore, hasMore, currentPage } = useAppSelector(
    (state: RootState) => state.booksStore
  );

  const observer = useRef<IntersectionObserver | undefined>(undefined);

  const lastNodeRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || isLoadingMore || !hasMore) return;
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((elem) => {
        if (elem[0].isIntersecting && hasMore) {
          dispatch(fetchBooksAsync({ page: currentPage + 1, query: "" }));
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, hasMore, isLoadingMore, currentPage, dispatch]
  );
  return { lastNodeRef };
};
