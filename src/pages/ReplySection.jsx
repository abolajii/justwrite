import { MdMoreHoriz } from "react-icons/md";
import React from "react";
import { baseURLImg } from "../api";
import styled from "styled-components";
import useAuthStore from "../store/useAuthStore";

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

const ReplySection = ({ noReply }) => {
  const { user } = useAuthStore();

  if (noReply) {
    return (
      <div className="flex justify-between pt-2 pb-2 pr-2 pl-2">
        <div>A</div>
        <div>B</div>
      </div>
    );
  }

  return (
    <Container>
      <div className="flex justify-between">
        <div>A</div>
        <div>B</div>
      </div>
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
          <div className="flex justify-between">
            <div>A</div>
            <div>B</div>
          </div>
        </div>
      </Reply>
    </Container>
  );
};

export default ReplySection;
