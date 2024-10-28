import { FaImage, FaSmile } from "react-icons/fa";
import React, { useState } from "react";

import { AiOutlineGif } from "react-icons/ai";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { Spinner } from "./Spinner";
import styled from "styled-components";

const Container = styled.div``;

const IconBox = styled.div`
  display: flex;
  gap: 10px;
  color: #555;
  position: relative;

  svg {
    cursor: pointer;
    transition: color 0.5s ease;

    &:hover {
      color: #28a69e; /* Change color on hover */
    }
  }
`;

const ShareButton = styled.button`
  background-color: #36bbba;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 9px 12px;
  width: 70px;
  cursor: pointer;

  &:hover {
    background-color: #28a69e; /* Darken on hover */
  }
`;

const BottomTab = () => {
  const [loading, setLoading] = useState(false); // To handle loading state

  return (
    <Container className="flex align-center justify-between">
      <div>
        <IconBox>
          <FaImage title="Add Image" />
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            style={{ display: "none" }}
          />
          <FaSmile title="Add Emoji" className="relative" />
          {/* <AiOutlineGif title="GIF" /> */}
          <RiCalendarScheduleFill title="Schedule Post" />
        </IconBox>
      </div>
      <div>
        <ShareButton className="center">
          {loading ? <Spinner /> : "Share"}
        </ShareButton>
      </div>
    </Container>
  );
};

export default BottomTab;
