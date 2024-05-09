import { useEffect, useRef } from "react";

type Props = {
  fetchNextPage: () => void;
  isPending: boolean;
};

export const RefreshButton = ({ fetchNextPage, isPending }: Props) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  // when btn is on the screen for the first time, fetchNextPage
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
    <button ref={btnRef} disabled={isPending} style={{ marginTop: "100px" }}>
      {isPending ? "🔃" : null} Show More
    </button>
  );
};
