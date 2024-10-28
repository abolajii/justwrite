import { GiRapidshareArrow } from "react-icons/gi";
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
  border: 1px solid #e0e0e0;
  margin-bottom: 15px;

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

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  margin-top: 20px;
  margin-bottom: 10px;

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
  padding: 0 10px;
  font-size: 14.5px;
  line-height: 1.4;
  margin-top: 16px;
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

// const Footer = styled.div``;

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

const SinglePost = () => {
  const { user } = useAuthStore();

  return (
    <Container>
      <div className="flex top align-center pt-3 pb-3 mr-2 ml-2">
        <div>
          <SmallAvi>
            {user?.profilePic && (
              <img src={`${baseURLImg}${user?.profilePic}`} alt="User avatar" />
            )}
          </SmallAvi>
        </div>
        <div className="ml-1">
          <div className="flex align-center">
            <GiRapidshareArrow color="rgba(49, 130, 251, 1)" size={11} />
            <p className="shared-text">
              <span>Abolaji</span>
              shared this
            </p>
          </div>
        </div>
      </div>
      <Top>
        <div className="flex gap-sm">
          <div>
            <Avi>
              {user?.profilePic && (
                <img
                  src={`${baseURLImg}${user?.profilePic}`}
                  alt="User avatar"
                />
              )}
            </Avi>
          </div>
          <div className="flex flex-col">
            <div className="name">Abolaji Ade-Ajayi</div>
            <div className="time">5mins ago</div>
          </div>
        </div>
        <div className="pointer">
          <MdMoreHoriz size={18} />
        </div>
      </Top>
      <Middle>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi a hic
        repellat, recusandae libero fuga voluptate officiis repellendus culpa
        assumenda rem placeat facere in blanditiis! Dignissimos temporibus enim
        neque vitae aliquid perferendis quaerat accusantium unde eius officiis
        corporis accusamus, placeat doloribus nihil laudantium iusto dolorum
        nemo minima architecto quasi molestiae,orem ipsum dolor, sit amet
        consectetur adipisicing elit. Modi a hic repellat, recusandae libero
        fuga voluptate officiis repellendus culpa assumenda rem placeat facere
        in blanditiis! Dignissimos temporibus enim neque vitae aliquid
        perferendis quaerat accusantium unde eius officiis corporis accusamus,
        placeat doloribus nihil laudantium iusto dolorum nemo minima architecto
        quasi molestiae
      </Middle>
      {/* <Image>
        <img src={bg} alt="alt preview" />
      </Image> */}
      {/* <div className="flex justify-between pt-2 pb-2 pr-2 pl-2">
        <div>A</div>
        <div>B</div>
      </div> */}
      <ReplySection noReply />
      {/* <Footer>Footer</Footer> */}
    </Container>
  );
};

export default SinglePost;
