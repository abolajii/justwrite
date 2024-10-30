/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

import usePostStore from "../store/usePostStore";

const slideDown = keyframes`
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(100%); opacity: 0; }
`;

const CounterContainer = styled.div`
  position: relative;
  height: 1.6rem; /* Adjust width dynamically */
  display: flex;
  justify-content: center;
  overflow: hidden;
  font-size: 14px;
`;

const DigitContainer = styled.div`
  position: relative;
  height: 100%;
  margin: 0 0.1rem;
  font-size: 14px;
  width: 5px;
`;

const Digit = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AnimatedDigit = styled(Digit)`
  animation: ${(props) => (props.isEntering ? slideDown : slideUp)} 0.3s ease
    forwards;
`;

const formatNumber = (num) => {
  if (num === 0) return "";
  if (num >= 1000000000) {
    const billions = Math.floor(num / 100000000) / 10;
    return billions % 1 === 0 ? `${billions}B` : `${billions.toFixed(1)}B`;
  }
  if (num >= 1000000) {
    const millions = Math.floor(num / 100000) / 10;
    return millions % 1 === 0 ? `${millions}M` : `${millions.toFixed(1)}M`;
  }
  if (num >= 1000) {
    const thousands = Math.floor(num / 100) / 10;
    return thousands % 1 === 0 ? `${thousands}K` : `${thousands.toFixed(1)}K`;
  }
  return num.toString();
};

// const getWidthForNumber = (num) => {
//   if (num <= 99) return ".9rem"; // 0-99
//   if (num <= 1099) return "1rem"; // 100-999
//   if (num <= 100000) return "2rem"; // 1K-99.9K
//   if (num < 1000000) return "1.5rem"; // 100K-999K
//   if (num < 1000000000) return "2rem"; // 1M-999M
//   return "2.5rem"; // 1B and above
// };

const ReplyAnimatedCounter = ({ digit = 0, post }) => {
  const [count, setCount] = useState(digit);
  const [prevCount, setPrevCount] = useState(digit);
  const [isAnimating, setIsAnimating] = useState(false);
  const { hasComment, selectedPost } = usePostStore();

  const updateCount = (change) => {
    const newCount = count + change;
    setPrevCount(count);
    setCount(newCount);
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Match with animation duration
  };

  useEffect(() => {
    // console.log(post, selectedPost);
    // console.log(post?._id, selectedPost?._id);
    if (post?._id === selectedPost?._id) {
      // console.log({ post, selectedPost });
      console.log();
      if (hasComment) updateCount(1);
    }
  }, [selectedPost, hasComment]);

  // useEffect(() => {
  // }, [hasComment]);

  const renderDigit = (current, previous, index) => (
    <DigitContainer key={index}>
      {isAnimating ? (
        <>
          <AnimatedDigit isEntering={false}>{previous}</AnimatedDigit>
          <AnimatedDigit isEntering={true}>{current}</AnimatedDigit>
        </>
      ) : (
        <Digit>{current}</Digit>
      )}
    </DigitContainer>
  );

  const formattedCurrent = formatNumber(count);
  const formattedPrevious = formatNumber(prevCount);
  // const dynamicWidth = getWidthForNumber(count);

  // Conditionally render the counter if count > 0
  if (count === 0) {
    return <CounterContainer> </CounterContainer>; // Hide when count is 0
  }

  return (
    <div>
      <CounterContainer>
        {formattedCurrent
          .split("")
          .map((digit, index) =>
            renderDigit(
              digit,
              index < formattedPrevious.length ? formattedPrevious[index] : "",
              index
            )
          )}
      </CounterContainer>
    </div>
  );
};

export default ReplyAnimatedCounter;
