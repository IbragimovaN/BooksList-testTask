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
        observer.current.disconnect(); //если у нас уже есть экземпляр IntersectionObserver, мы отключаем его. Это нужно, чтобы избежать утечек памяти
      }
      observer.current = new IntersectionObserver((elem) => {
        //Здесь мы создаем новый экземпляр IntersectionObserver. Этот объект будет следить за тем, когда элемент становится видимым на экране.elem — это массив элементов нам нужен первый
        if (elem[0].isIntersecting && hasMore) {
          dispatch(fetchBooksAsync(currentPage + 1));
        }
      });
      if (node) {
        observer.current.observe(node); //передаем дом узел за которым хотим следить (див в с книжкой)
      }
    },
    [isLoading, hasMore, isLoadingMore, currentPage, dispatch]
  );
  return { lastNodeRef };
};
