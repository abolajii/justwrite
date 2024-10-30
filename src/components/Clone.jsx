import { FaImage, FaSmile } from "react-icons/fa";
import { formatDate, truncateWords } from "../utils";
/* eslint-disable react/prop-types */
import styled, { keyframes } from "styled-components";

import { AiOutlineGif } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { RiCalendarScheduleFill } from "react-icons/ri";
import Spinner from "./Spinner";
import { baseURLImg } from "../api";
import { useState } from "react";
import useUserStore from "../store/userStore";

// Styled Components
const ModalContainer = styled.div`
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100vw;
  z-index: 1000;
  display: flex;
  justify-content: center;

  .flex-col {
    /* height: calc(100% - 20px); */
  }

  svg {
    cursor: pointer;
    color: #555555; /* Set the default text color */

    transition: color 0.5s ease;

    &:hover {
      color: #28a69e; /* Change color on hover */
    }
  }
`;

// Keyframes for slide-in and slide-out effects
const slideIn = keyframes`
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-30px);
    opacity: 0;
  }
`;

const ModalContent = styled.div`
  width: 500px;
  padding: 10px 15px;
  background-color: #fefefe;

  margin-top: 20px;

  height: ${({ hasImage }) =>
    hasImage ? "730px" : "400px"}; /* Adjust height based on image presence */
  max-height: 730px;
  /* overflow: hidden; */
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  animation: ${({ isClosing }) => (isClosing ? slideOut : slideIn)} 0.5s ease
    forwards;

  .reply {
    font-size: 12px;
  }
`;

const Name = styled.div`
  font-size: 14px;
  font-weight: normal;
`;

const Time = styled.div`
  font-size: 12px;
  color: #747474; /* Light gray for subtle contrast */
  margin-top: 2px;
`;

const ImageAvi = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: #8c9a9a; /* Softer teal for the avatar */
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-right: 15px; */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const PostContainer = styled.div`
  font-size: 14px;
  line-height: 1.31;
  margin-bottom: 2px;
  color: #525252; /* Set the default text color */
`;

const BarContainer = styled.div`
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Height = styled.div`
  width: 2px;
  height: calc(100% - 10px);
  background-color: rgba(40, 166, 158, 0.4);
`;

const TextArea = styled.div`
  width: 100%;

  textarea {
    background: transparent;
    resize: none;
    outline: none;
    border: none;
    width: 100%;
    /* height: 50px; */
  }
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
`;

const IconBox = styled.div`
  display: flex;
  gap: 10px;
`;

const ShareButton = styled.button`
  background-color: #36bbba;
  color: white !important;
  border: none;
  border-radius: 4px;
  padding: 7px 15px;
  width: 70px;
  cursor: pointer;

  &:hover {
    background-color: #28a69e; /* Darken on hover */
  }
`;

const ImageWrapper = styled.div`
  overflow-y: auto;
  border-radius: 6px;
  height: 100%;
`;

// Modify the ImagePreview styles to fit within the scrollable area
const ImagePreview = styled.img`
  width: 100%; /* Set a fixed width */
  height: auto; /* Set height to auto to maintain aspect ratio */
  max-height: 430px; /* Set height to auto to maintain aspect ratio */
  object-fit: cover; /* Maintain aspect ratio while filling the box */
  border-radius: 6px;

  /* Hide scrollbar */
  scrollbar-width: none; /* For Firefox */
  -ms-overflow-style: none; /* For Internet Explorer and Edge */
  &::-webkit-scrollbar {
    display: none; /* For Chrome, Safari, and Opera */
  }
`;

const Modal = ({ isOpen, closeModal, data, handleSubmit, share, comment }) => {
  return (
    <ModalContainer
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <ModalContent hasImage={!!selectedImage}>
        <div className="flex flex-col flex-1 h-100">
          <div className="flex align-center justify-between w-100 mb-1">
            Top
          </div>
          <div className="flex-1">
            <div className="flex flex-col pt-2">
              <div className="flex gap-sm">
                <div>
                  <div>
                    <ImageAvi></ImageAvi>
                  </div>
                </div>
                <div className="flex-1 flex justify-between mt-2">
                  <div>
                    <div>
                      <div>
                        Name
                        {/* {share ? data.originalPost.user.name : data?.user.name} */}
                      </div>
                      {/* add a verified icon */}
                    </div>
                    <div>5mins ago</div>
                  </div>
                </div>
              </div>
              <div className="flex gap-sm">
                <div>
                  <BarContainer>
                    <Height />
                  </BarContainer>
                </div>
                <div className="flex flex-col">
                  <PostContainer>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Ratione labore veniam adipisci animi esse. Magni labore
                    numquam corporis sit vitae, nulla nam quas odio non cumque
                    temporibus nobis id at?
                  </PostContainer>
                  <div className="reply mb-2 mt-1">
                    <p className="text-xs">Replying to</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-md">B</div>
            </div>
          </div>
          {/* {error && <ErrorMessage>{error}</ErrorMessage>} */}
          <div className="flex"></div>
        </div>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
