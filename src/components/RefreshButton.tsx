import { useEffect, useRef } from "react";

type Props = {
  fetchNextPage: () => void;
  isFetching: boolean;
};

export const RefreshButton = ({ fetchNextPage, isFetching }: Props) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (btnRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            fetchNextPage();
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(btnRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [fetchNextPage]);

  return (
    <button
      ref={btnRef}
      disabled={isFetching}
      style={{ marginTop: "100px" }}
      onClick={() => fetchNextPage()}
    >
      {isFetching ? "🔃" : null} Show More
    </button>
  );
};
