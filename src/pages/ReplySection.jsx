import { BottomIcon, Modal } from "../components";
import React, { useEffect, useState } from "react";
import { likePost, passAlongPost } from "../api/requests";

import { MdMoreHoriz } from "react-icons/md";
import { baseURLImg } from "../api";
import styled from "styled-components";
import useAuthStore from "../store/useAuthStore";
import usePostStore from "../store/usePostStore";

const Container = styled.div`
  padding: 9px;

  .name {
    font-size: 15px;
    font-weight: 500;
  }

  .time {
    font-size: 12px;
    margin-top: -4px;
  }
`;

const Reply = styled.div`
  border-top: 1px solid rgba(213, 213, 213, 0.6);
  padding: 8px 0;
  margin-top: 5px;
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

const Middle = styled.div`
  font-size: 14.5px;
  line-height: 1.4;
  margin-top: 3px;
  word-wrap: break-word;
`;

const ReplySection = ({ noReply, quote, post, share, single }) => {
  const { user } = useAuthStore();
  const [like, setLike] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { setSelectedPost, setHasComment, setPosts, posts } = usePostStore();
  // useEffect(() => {
  //   if (post.likes.includes(user?.id)) {
  //     setLike(true);
  //   } else {
  //     setLike(false);
  //   }
  // }, [post.likes, user?._id]);

  if (noReply) {
    return (
      <div className="pr-2 pl-2">
        <Modal
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          onSubmit={() => {}}
          onCancel={() => {}}
          data={post}
          share={share}
          single={single}
        />
        <BottomIcon
          showDropdown={showDropdown}
          post={post}
          like={like}
          replyCount={
            share ? post.originalPost.comments.length : post.comments.length
          }
          shareCount={
            share ? post.originalPost.shares.length : post.shares.length
          }
          likeCount={share ? post.originalPost.likes.length : post.likes.length}
          onReplyClick={() => {
            setIsOpen(true);
            setSelectedPost(post);
            setHasComment(false);
          }}
          onLikeClick={async () => {
            setLike(!like);
            try {
              await likePost(share ? post.originalPost._id : post._id);
              // console.log(response);
            } catch (e) {
              console.log(e);
            }
          }}
          onShareClick={() => {
            // setShowDropdown(!showDropdown);
            const sharePost = async () => {
              const postId =
                post.postType === "normal"
                  ? post._id
                  : post.postType === "quoted"
                  ? post._id
                  : post.originalPost._id;

              try {
                const response = await passAlongPost(postId);
                const newPosts = [response, ...posts];
                setPosts(newPosts);
              } catch (e) {
                console.log(e);
              }
            };

            sharePost();
          }}
        />
      </div>
    );
  }

  return (
    <Container>
      <Reply className="flex gap-sm">
        <div>
          <Avi>
            {user?.profilePic && (
              <img src={`${baseURLImg}${user?.profilePic}`} alt="User avatar" />
            )}
          </Avi>
        </div>
        <div>
          <div className="flex justify-between">
            <div>
              <div className="name">Oko Innocent</div>
              <div className="time">2mins ago</div>
            </div>
            <div className="pointer">
              <MdMoreHoriz size={18} />
            </div>
          </div>
          <Middle>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi a hic
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi a hic
          </Middle>
          <div className="pt-2">
            <BottomIcon />
          </div>
        </div>
      </Reply>
    </Container>
  );
};

export default ReplySection;
