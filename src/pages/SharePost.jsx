/* eslint-disable react/prop-types */
import { formatDate, formattedContent } from "../utils";

import { BottomIcon } from "../components";
import { GiRapidshareArrow } from "react-icons/gi";
import { MdMoreHoriz } from "react-icons/md";
import React from "react";
import ReplySection from "./ReplySection";
import { baseURLImg } from "../api";
import styled from "styled-components";
import useAuthStore from "../store/useAuthStore";

const Container = styled.div`
  border-radius: 5px;
  background-color: #f3f3f3;
  /* border: 1px solid #e0e0e0; */
  margin-bottom: 15px;
  margin-bottom: 30px;

  .top {
    border-bottom: 1px solid rgba(213, 213, 213, 0.6);
    /* margin: 9px 0; */
    padding-bottom: 5px;
  }

  .shared-text {
    font-size: 11px;
    /* font-weight: normal; */

    span {
      font-weight: bold;
      margin-right: 2px;
    }
  }
`;

const SmallAvi = styled.div`
  height: 18px;
  width: 18px;
  border-radius: 50%;
  background-color: #313838;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const Middle = styled.div`
  padding: 0 10px;
  font-size: 14px;
  line-height: 1.4;
  word-wrap: break-word;
  margin-top: 6px;
`;

const Avi = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: #313838;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  margin-top: 9px;
  /* margin-bottom: 10px; */

  .name {
    font-size: 15px;
    font-weight: 500;
  }

  .time {
    font-size: 12px;
    margin-top: -4px;
  }
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
  padding: 5px 0;
`;

const SharePost = ({ post }) => {
  const { user } = useAuthStore();
  return (
    <Container>
      <div className="flex top align-center pt-3 pb-3 mr-2 ml-2">
        <div>
          <SmallAvi>
            {post?.user?.profilePic && (
              <img src={post.user?.profilePic} alt="User avatar" />
            )}
          </SmallAvi>
        </div>
        <div className="ml-1">
          <div className="flex align-center">
            <GiRapidshareArrow color="rgba(49, 130, 251, 1)" size={11} />
            <p className="shared-text">
              <span>
                {post?.user?.name === user?.name ? "You" : post?.user?.name}
              </span>
              shared this
            </p>
          </div>
        </div>
      </div>
      <Top>
        <div className="flex gap-sm">
          <div>
            <Avi>
              {post?.originalPost?.user?.profilePic && (
                <img
                  src={post?.originalPost.user?.profilePic}
                  alt="User avatar"
                />
              )}
            </Avi>
          </div>
          <div className="flex flex-col">
            <div className="name">{post?.originalPost.user?.name}</div>
            <div className="time">
              {formatDate(post?.originalPost.createdAt)}
            </div>
          </div>
        </div>
        <div className="pointer">
          <MdMoreHoriz size={18} />
        </div>
      </Top>
      <Middle>{formattedContent(post.originalPost.content)}</Middle>
      {post?.originalPost?.imageUrl && (
        <Image className="mb-1">
          <img src={post?.originalPost?.imageUrl} alt="Project Update" />
        </Image>
      )}
      {post.originalPost.originalPost && (
        <Inner>
          <Top className="second">
            <div className="flex gap-sm">
              <div>
                <Avi>
                  {post?.originalPost?.originalPost?.user.profilePic && (
                    <img
                      src={post?.originalPost?.originalPost?.user.profilePic}
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
      )}
      <ReplySection noReply post={post} share />
    </Container>
  );
};

export default SharePost;
