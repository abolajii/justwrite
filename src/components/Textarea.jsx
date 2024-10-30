import React, { useEffect, useRef, useState } from "react";

import styled from "styled-components";
import usePostStore from "../store/usePostStore";

const Container = styled.div`
  outline: none;
  font-size: 16px;
  min-height: 40px;
  max-height: 60px;
  line-height: 1;
  width: ${(props) => props.width}px;
  position: relative;
`;

const SuggestionBox = styled.div`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 200px;
  max-height: 150px;
  overflow-y: auto;
  z-index: 999;

  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: 0;
  transform: translateY(-10px);
  visibility: hidden;

  &.show {
    opacity: 1;
    transform: translateY(0);
    visibility: visible;
  }
`;

const SuggestionItem = styled.div`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const users = [
  { id: 1, name: "Abolaji King", username: "@abolajiking" },
  { id: 2, name: "New Abolaji King", username: "@abolajiking_123" },
  { id: 3, name: "Yusuf Musa", username: "@yusufmusa" },
  { id: 4, name: "Yinka Kehinde", username: "@yinkyy" },
];

const Textarea = () => {
  const { setContent, content, postSent } = usePostStore();
  const [width, setWidth] = useState(620);
  const containerRef = useRef(null);
  const [isMentioning, setIsMentioning] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [mentionPosition, setMentionPosition] = useState({ top: 0, left: 0 });
  const [mentionText, setMentionText] = useState("");

  const formatTextWithMentions = (text) => {
    return text?.replace(/@(\w+)/g, (_, name) => {
      return `<span style='color: #28a69e; font-weight: normal;'>@${name}</span>`;
    });
  };

  useEffect(() => {
    if (postSent && containerRef.current) {
      containerRef.current.innerText = "";
    }
  }, [postSent]);

  const handleInput = (e) => {
    const text = e.target.innerText;
    setContent(text);

    const caretPos = window
      .getSelection()
      .getRangeAt(0)
      .getBoundingClientRect();
    const mentionMatch = text.match(/@(\w*)$/);

    if (mentionMatch) {
      setIsMentioning(true);
      setMentionText(mentionMatch[1]);
      setMentionPosition({
        top: caretPos.bottom + 10,
        // left: caretPos.left,
      });

      // Filter suggestions based on input
      const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(mentionMatch[1].toLowerCase())
      );

      if (filteredUsers.length > 0) {
        setSuggestions(filteredUsers);
      } else {
        setIsMentioning(false); // Hide suggestions if no matches found
        setSuggestions([]);
      }
    } else {
      setIsMentioning(false);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (username) => {
    const newContent = content.replace(/@(\w*)$/, username);
    setContent(newContent);
    setIsMentioning(false);
    setSuggestions([]);
  };

  const resizeWidth = () => {
    const screenWidth = window.innerWidth;
    const padding = 40;
    const newWidth = screenWidth > 620 ? 620 : screenWidth - padding;
    setWidth(newWidth);
  };

  useEffect(() => {
    resizeWidth();
    window.addEventListener("resize", resizeWidth);
    return () => window.removeEventListener("resize", resizeWidth);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(containerRef.current);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, [content]);

  return (
    <>
      <Container
        contentEditable
        ref={containerRef}
        onInput={handleInput}
        dangerouslySetInnerHTML={{ __html: formatTextWithMentions(content) }}
        suppressContentEditableWarning
        width={width}
      />

      <SuggestionBox
        top={mentionPosition.top}
        left={mentionPosition.left}
        className={
          isMentioning && mentionText && suggestions.length > 0 ? "show" : ""
        }
      >
        {suggestions.map((user) => (
          <SuggestionItem
            key={user.id}
            onClick={() => handleSuggestionClick(user.username)}
          >
            {user.username}
          </SuggestionItem>
        ))}
      </SuggestionBox>
    </>
  );
};

export default Textarea;
