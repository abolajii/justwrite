/* eslint-disable react/prop-types */
import { formatDate, formattedContent } from "../utils";

import { BottomIcon } from "../components";
// import { Container } from "../shared/styles";
import { MdMoreHoriz } from "react-icons/md";
import React from "react";
import ReplySection from "./ReplySection";
import { baseURLImg } from "../api";
import bg from "../assets/images.jpeg";
import styled from "styled-components";
import useAuthStore from "../store/useAuthStore";

const Container = styled.div`
  border-radius: 5px;
  background-color: #f3f3f3;
  /* border: 1px solid #e0e0e0; */
  margin-bottom: 15px;
  margin-bottom: 30px;
`;

const Avi = styled.div`
  height: 36px;
  width: 36px;
  border-radius: 50%;
  background-color: #ccc;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

export const Top = styled.div`
  display: flex;
  &.second {
    padding: 9px;
  }

  .name {
    font-size: 15px;
    font-weight: 500;
  }

  .time {
    font-size: 12px;
    margin-top: -4px;
  }
`;

const Middle = styled.div`
  font-size: 14.5px;
  line-height: 1.4;
  margin-top: 2px;
  word-wrap: break-word;
`;

const Image = styled.div`
  margin-top: 10px;
  height: 600px;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const Inner = styled.div`
  border-radius: 5px;
  background-color: #ececec;
  margin: 6px 0;
  /* padding: 9px; */
`;

const QuotePost = ({ post }) => {
  return (
    <Container>
      <Top className="flex gap-sm">
        <div>
          <Avi>
            {post?.user?.profilePic && (
              <img src={post?.user?.profilePic} alt="User avatar" />
            )}
          </Avi>
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <div>
              <div className="name">{post.user.name}</div>
              <div className="time">{formatDate(post?.createdAt)}</div>
            </div>
            <div className="pointer">
              <MdMoreHoriz size={18} />
            </div>
          </div>
        </div>
      </Top>

      <Middle>{formattedContent(post.content)} </Middle>
      {post?.imageUrl && (
        <Image className="mb-1">
          <img src={post?.imageUrl} alt="Project Update" />
        </Image>
      )}
      <Inner>
        <Top className="second">
          <div className="flex gap-sm">
            <div>
              <Avi>
                {post.originalPost?.user.profilePic && (
                  <img
                    src={post?.originalPost.user.profilePic}
                    alt="User avatar"
                  />
                )}
              </Avi>
            </div>
            <div className="flex flex-col">
              <div className="name">{post?.originalPost.user.name}</div>
              <div className="time">
                {formatDate(post?.originalPost.createdAt)}
              </div>
            </div>
          </div>
        </Top>
        <Middle className="pl-4 pr-4 pb-3">
          {formattedContent(post.originalPost.content)}
        </Middle>
        {/* <Image>
              <img src={bg} alt="alt preview" />
            </Image> */}
      </Inner>
      <ReplySection noReply post={post} />
    </Container>
  );
};

export default QuotePost;
