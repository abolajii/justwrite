import { Container } from "../shared/styles";
import { MdMoreHoriz } from "react-icons/md";
import React from "react";
import { baseURLImg } from "../api";
import bg from "../assets/images.jpeg";
import styled from "styled-components";
import useAuthStore from "../store/useAuthStore";

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
  justify-content: space-between;
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
  margin: 15px 0;
  /* padding: 9px; */
`;

const QuotePost = () => {
  const { user } = useAuthStore();

  return (
    <Container>
      <Top className="flex mr-2 ml-2 gap-sm">
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
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi a hic
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi a hic
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi a hic
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi a hic
          </Middle>
          {/* <Image>
            <img src={bg} alt="alt preview" />
          </Image>
 */}
          <Inner>
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
            <Middle className="pl-4 pr-4 pb-3">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi a
              hic repellat, recusandae libero fuga voluptate officiis
              repellendus culpa assumenda rem placeat facere in blanditiis!
              Dignissimos temporibus enim neque vitae aliquid perferendis
              quaerat accusantium unde eius officiis corporis accusamus, placeat
              doloribus nihil laudantium iusto dolorum nemo minima architecto
              quasi molestiae,orem ipsum dolor, sit amet consectetur adipisicing
              elit. Modi a hic repellat, recusandae libero fuga voluptate
              officiis repellendus culpa assumenda rem placeat facere in
              blanditiis! Dignissimos temporibus enim neque vitae aliquid
              perferendis quaerat accusantium unde eius officiis corporis
              accusamus, placeat doloribus nihil laudantium iusto dolorum nemo
              minima architecto quasi molestiae
            </Middle>
            {/* <Image>
              <img src={bg} alt="alt preview" />
            </Image> */}
          </Inner>
          <div className="flex justify-between pr-2 pl-2">
            <div>A</div>
            <div>B</div>
          </div>
        </div>
      </Top>
    </Container>
  );
};

export default QuotePost;
