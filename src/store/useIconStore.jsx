import { useState } from "react";

const shouldAnimate = (prev, current) => {
  if (prev < 1000 && current <= 1000) return true;
  if (prev < 1000 && current === 1000) return true;
  if (prev >= 1000 && prev < 1000000) {
    const prevHundreds = Math.floor(prev / 100);
    const currentHundreds = Math.floor(current / 100);
    return prevHundreds !== currentHundreds && current % 100 === 0;
  }
  if (prev < 1000000 && current === 1000000) return true;
  if (prev >= 1000000 && prev < 1000000000) {
    const prevHundredThousands = Math.floor(prev / 100000);
    const currentHundredThousands = Math.floor(current / 100000);
    return (
      prevHundredThousands !== currentHundredThousands && current % 100000 === 0
    );
  }
  if (prev < 1000000000 && current === 1000000000) return true;
  if (prev >= 1000000000) {
    const prevHundredMillions = Math.floor(prev / 100000000);
    const currentHundredMillions = Math.floor(current / 100000000);
    return (
      prevHundredMillions !== currentHundredMillions &&
      current % 100000000 === 0
    );
  }
  return false;
};

export const useIconStore = () => {
  const [count, setCount] = useState(initialDigit);
  const [prevCount, setPrevCount] = useState(initialDigit);
  const [isAnimating, setIsAnimating] = useState(false);

  // Action to increase count
  const increaseCount = () => {
    const newCount = count + 1;
    setPrevCount(count);
    setCount(newCount);
    setIsAnimating(shouldAnimate(count, newCount));
  };

  // Action to decrease count
  const decreaseCount = () => {
    const newCount = count - 1;
    setPrevCount(count);
    setCount(newCount);
    setIsAnimating(shouldAnimate(count, newCount));
  };

  return {
    count,
    prevCount,
    isAnimating,
    setCount,
    setPrevCount,
    setIsAnimating,
    increaseCount,
    decreaseCount,
  };
};
