import React, { useEffect, useRef, useState } from "react";

import styled from "styled-components";

const Container = styled.div`
  outline: none;
  font-size: 16px;
  min-height: 40px;
  max-height: 60px;
  overflow-y: scroll;
  overflow-wrap: break-word;
  width: ${(props) => props.width}px; /* Dynamically set width */
`;

const Textarea = () => {
  const [content, setContent] = useState("");
  const [width, setWidth] = useState(620); // Initial width
  const containerRef = useRef(null);

  const formatTextWithMentions = (text) => {
    return text?.replace(/@(\w+)/g, (_, name) => {
      return `<span style='color: #28a69e; font-weight: normal;'>@${name}</span>`;
    });
  };

  const handleInput = (e) => {
    setContent(e.target.innerText);
  };

  // Function to calculate and set the width of the Textarea
  const resizeWidth = () => {
    const screenWidth = window.innerWidth;
    const padding = 40; // Total left and right padding
    const newWidth = screenWidth > 620 ? 620 : screenWidth - padding;
    setWidth(newWidth);
  };

  // Add resize event listener
  useEffect(() => {
    resizeWidth(); // Initial width calculation
    window.addEventListener("resize", resizeWidth);
    return () => window.removeEventListener("resize", resizeWidth);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(containerRef.current);
      range.collapse(false); // Move cursor to the end
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, [content]);

  return (
    <Container
      contentEditable
      ref={containerRef}
      onInput={handleInput}
      dangerouslySetInnerHTML={{ __html: formatTextWithMentions(content) }}
      suppressContentEditableWarning
      width={width} // Pass dynamic width as prop
    />
  );
};

export default Textarea;
