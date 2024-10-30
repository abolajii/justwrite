import React, { useEffect, useRef, useState } from "react";

import styled from "styled-components";

const Container = styled.div`
  outline: none;
  font-size: 15px;
  min-height: 40px;
  max-height: 60px;
  line-height: 1;
  overflow-y: scroll;
  width: ${(props) => props.width}px; /* Dynamically set width */

  &:empty:before {
    content: attr(placeholder);
    color: #aaa;
    font-size: 13px;
  }
`;

const MiniTextarea = ({ width, setText }) => {
  const containerRef = useRef(null);
  const [content, setContent] = useState("");

  const formatTextWithMentions = (text) => {
    return text?.replace(/@(\w+)/g, (_, name) => {
      return `<span style='color: #28a69e; font-weight: normal;'>@${name}</span>`;
    });
  };

  const handleInput = (e) => {
    setText(e.target.innerText);
  };

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
      placeholder="Share your thought"
      ref={containerRef}
      onInput={handleInput}
      dangerouslySetInnerHTML={{ __html: formatTextWithMentions(content) }}
      suppressContentEditableWarning
      width={width} // Pass dynamic width as prop
    />
  );
};

export default MiniTextarea;
