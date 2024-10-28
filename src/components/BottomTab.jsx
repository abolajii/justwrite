import { FaImage, FaSmile, FaTimes } from "react-icons/fa";
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

const ImagePreview = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 3px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  max-height: 540px;
  object-fit: cover;
  border-radius: 4px;
`;

const CloseButton = styled(FaTimes)`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 50%;
  padding: 3px;
  cursor: pointer;
`;

const BottomTab = () => {
  const [loading, setLoading] = useState(false); // To handle loading state
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setFile(null);
  };

  return (
    <Container className="flex justify-between flex-col">
      <div>
        {/* Image preview with close button */}
        {selectedImage && (
          <ImagePreview>
            <Image src={selectedImage} alt="Selected" />
            <CloseButton onClick={handleRemoveImage} title="Remove Image" />
          </ImagePreview>
        )}
      </div>
      <div className="flex justify-between align-center">
        <div>
          <IconBox>
            <FaImage
              title="Add Image"
              onClick={() => document.getElementById("imageUpload").click()}
            />
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
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
      </div>
    </Container>
  );
};

export default BottomTab;
