import { useEffect, useState } from "react";

function useCaroussel<T>(items: T[], interval: number = 3000, autoPlay = true) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState("entering");

  useEffect(() => {
    if (!autoPlay) {
      return;
    }

    const timer = setInterval(() => {
      setAnimationClass("exiting");
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
        setAnimationClass("entering");
      }, 500);
    }, interval);

    return () => clearInterval(timer);
  }, [items.length, interval, autoPlay]);

  const next = () => {
    setAnimationClass("exiting");
    setTimeout(() => {
      setCurrentIndex((currentIndex + 1) % items.length);
      setAnimationClass("entering");
    }, 500);
  };

  const prev = () => {
    setAnimationClass("exiting");
    setTimeout(() => {
      setCurrentIndex((currentIndex - 1 + items.length) % items.length);
      setAnimationClass("entering");
    }, 500);
  };

  return {
    currentItem: items[currentIndex],
    next,
    prev,
    currentIndex,
    animationClass,
  };
}

export default useCaroussel;
