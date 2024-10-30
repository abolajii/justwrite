import {
  FaBookmark,
  FaComment,
  FaHeart,
  FaRegBookmark,
  FaRegComment,
  FaRegHeart,
} from "react-icons/fa";
import React, { useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";

import { BiUserVoice } from "react-icons/bi";
import { GiRapidshareArrow } from "react-icons/gi";
import LikeAnimatedCounter from "./LikeAnimateNumber";
import Modal from "./Modal";
import ReplyAnimatedCounter from "./ReplyAnimateNumber";
import { RiUserSharedLine } from "react-icons/ri";
import ShareAnimatedCounter from "./ShareAnimateNumber";
import { useIconStore } from "../store/useIconStore";

// Define the heartbeat keyframes animation
const heartbeat = keyframes`
    0% { transform: scale(1); }
    14% { transform: scale(1.3); }
    28% { transform: scale(1); }
    42% { transform: scale(1.3); }
    70% { transform: scale(1); }
`;

// Define the slide-in animation for the dropdown
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Dropdown container styling
const Dropdown = styled.div`
  position: absolute;
  top: 30px;
  left: 0;
  width: 120px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  ${({ isOpen }) =>
    isOpen &&
    css`
      animation: ${slideIn} 0.3s ease forwards;
    `}
  z-index: 1;

  div {
    padding: 4px 8px;
    cursor: pointer;

    &:hover {
      background-color: #f1f1f1;
    }
  }
`;

// Container styling
const Container = styled.div`
  position: relative;
  .value {
    font-size: 13px;
    margin-left: 2px;
  }

  .gap-sm {
    gap: 6px;
  }
  svg {
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 0px;
  left: -20px;
  background: #eaeaea;
  /* border: 1px solid #ddd; */
  box-shadow: 0px 4px 8px rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  padding: 0.5rem 0;
  width: 150px;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transform: translateY(${(props) => (props.isOpen ? "0" : "-20px")});
  transition: all 0.3s ease-in-out;
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
`;
const DropdownItem = styled.div`
  padding: 0.5rem 0.3rem;
  display: flex;
  font-size: 13px;
  margin: 0 10px;
  border-radius: 5px;

  cursor: pointer;
  &:hover {
    /* background-color: #f0f0f0; */
    background: rgba(118, 112, 112, 0.114);
  }

  svg {
    margin-right: 4px; /* Space between icon and text */
  }
`;

// Heart icon with heartbeat animation styling
const HeartIcon = styled.div`
  ${(props) =>
    props.isAnimating &&
    css`
      animation: ${heartbeat} 0.6s ease-in-out;
    `}
`;

const BottomIcon = ({
  like,
  replyCount = 0,
  shareCount = 0,
  likeCount = 0,
  onLikeClick,
  onReplyClick,
  post,
  onShareClick,
}) => {
  const [isHeartAnimating, setIsHeartAnimating] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const dropdownRef = useRef(null);

  const handleLikeClick = () => {
    setIsHeartAnimating(true); // Start animation
    setTimeout(() => setIsHeartAnimating(false), 600); // End animation after 600ms

    if (onLikeClick) {
      onLikeClick();
      setClicked(true);
    }
  };

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setDropdownOpen((prev) => !prev); // Toggle the dropdown open state
  };

  const onShare = async () => {
    await onShareClick();
    setDropdownOpen(false);
  };

  return (
    <Container className="flex justify-between">
      <Modal
        isOpen={showModal}
        quote
        data={post}
        closeModal={() => setShowModal(false)}
      />
      <div className="flex gap-sm">
        <div
          className="flex"
          onClick={(event) => {
            event.stopPropagation();
            onReplyClick();
          }}
        >
          <div className="center">
            <FaRegComment color="#58a485" />
          </div>
          <div className="value">
            <ReplyAnimatedCounter digit={replyCount} post={post} />
          </div>
        </div>
        <div
          className="flex"
          onClick={(event) => {
            event.stopPropagation();
            handleLikeClick();
          }}
        >
          <HeartIcon isAnimating={isHeartAnimating} className="center">
            {like ? (
              <FaHeart color="rgba(213, 89, 89, 0.9)" />
            ) : (
              <FaRegHeart color="rgba(213, 89, 89, 0.9)" />
            )}
          </HeartIcon>
          <div className="value">
            <LikeAnimatedCounter
              digit={likeCount}
              clicked={clicked}
              like={like}
            />
          </div>
        </div>
        <div className="flex" onClick={toggleDropdown}>
          <div className="center">
            <GiRapidshareArrow color="rgba(49, 130, 251, .49)" />
          </div>
          <div className="value">
            <ShareAnimatedCounter digit={shareCount} />
          </div>
          <div ref={dropdownRef} className="relative">
            <DropdownMenu isOpen={dropdownOpen}>
              <DropdownItem
                onClick={(event) => {
                  event.stopPropagation();
                  // share();
                  onShare();
                }}
              >
                <RiUserSharedLine size={15} color=" #166c48" />
                Pass Along
              </DropdownItem>
              <DropdownItem
                onClick={(event) => {
                  event.stopPropagation();
                  setShowModal(true);
                  // (false);
                }}
              >
                <BiUserVoice size={18} color=" #166c48" />
                Add Your Take
              </DropdownItem>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div>
        <FaRegBookmark color="rgb(222, 163, 38)" />
      </div>
    </Container>
  );
};

export default BottomIcon;
