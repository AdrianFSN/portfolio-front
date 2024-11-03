import { useEffect, useState } from "react";

function useCarousel(
  items: unknown[],
  interval: number = 3000,
  autoPlay = true
) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, interval);

    return () => clearInterval(timer);
  }, [items.length, interval, autoPlay]);

  return {
    currentItem: items[currentIndex],
    next: () => setCurrentIndex((currentIndex + 1) % items.length),
    prev: () =>
      setCurrentIndex((currentIndex - 1 + items.length) % items.length),
    currentIndex,
  };
}

export default useCarousel;
