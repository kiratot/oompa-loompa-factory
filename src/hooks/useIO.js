import { useCallback, useRef } from "react";

export const useIO = (loading, hasMore, setPage) => {
  const observer = useRef();
  const loadMoreRef = useCallback(
    (el) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect(); //resets the observer
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (hasMore) setPage((prev) => prev + 1);
        }
      });
      if (el) observer.current.observe(el);
    },
    [loading, hasMore, setPage]
  );
  return loadMoreRef;
};
