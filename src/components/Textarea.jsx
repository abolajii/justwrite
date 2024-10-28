import React, { useEffect, useRef, useState } from "react";

import styled from "styled-components";

const Container = styled.div`
  outline: none;
  font-size: 16px;
  min-height: 40px;
  width: 100%;
`;

const MentionSpan = styled.span`
  color: #007bff; /* Blue color for mentions */
  font-weight: bold;
`;

const Textarea = () => {
  const [content, setContent] = useState();
  const containerRef = useRef(null);

  // Function to process text and wrap mentions in MentionSpan with actual names
  const formatTextWithMentions = (text) => {
    return text?.replace(/@(\w+)/g, (_, name) => {
      return `<span style='color: #28a69e; font-weight: normal;'>@${name}</span>`;
    });
  };

  const handleInput = (e) => {
    setContent(e.target.innerText);
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
      ref={containerRef}
      onInput={handleInput}
      dangerouslySetInnerHTML={{ __html: formatTextWithMentions(content) }}
      suppressContentEditableWarning
    />
  );
};

export default Textarea;
