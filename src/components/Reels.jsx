import { AiOutlinePlus } from "react-icons/ai"; // Import the add icon
import React from "react";
import { baseURLImg } from "../api";
import styled from "styled-components";
import useAuthStore from "../store/useAuthStore";

const Container = styled.div`
  /* padding: 20px; */
  display: flex;
  gap: 30px;
  position: sticky;
  top: 0;
  /* background: #1c1c1c; */
  z-index: 100;
`;

const One = styled.div``;

const Two = styled.div`
  display: flex;
  flex-direction: row; /* Change to row for horizontal layout */
  gap: 15px;
  max-height: 300px; //Set a max height to make it scrollable
  overflow-y: auto; /* Enable vertical scrolling */
  padding-right: 10px; /* Add padding for scrollbar */
  flex-wrap: wrap; /* Allow items to wrap to the next line */
`;

const Story = styled.div`
  display: flex;
  align-items: center; /* Center vertically */
  justify-content: center; /* Center horizontally */
  flex-direction: column; /* Align items in a column */
  font-size: 14px;
`;

const PositionedStory = styled(Story)`
  position: relative; /* Set position to relative for absolute positioning of the add icon */
`;

const Image = styled.div`
  height: 50px;
  width: 50px;
  background-color: #313838;
  margin-bottom: 5px; /* Add margin below image for spacing */
  border-radius: 6px;
  overflow: hidden;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    /* border-radius: 6px; */
  }
`;

const AddIcon = styled(AiOutlinePlus)`
  position: absolute;
  bottom: 22px; /* Adjust position from the bottom */
  right: 0px; /* Adjust position from the right */
  color: white; /* Change icon color */
  background-color: #36bbba; /* Add background color to the icon */
  border-radius: 50%; /* Make it round */
  padding: 3px; /* Add some padding around the icon */
  cursor: pointer; /* Change cursor to pointer on hover */

  &:hover {
    background-color: #28a69e; /* Change background on hover */
  }
`;

const Reels = () => {
  const { user } = useAuthStore();
  console.log(user);
  return (
    <Container>
      <One>
        <PositionedStory>
          <Image>
            {user?.profilePic && (
              <img src={`${baseURLImg}${user?.profilePic}`} alt="User avatar" />
            )}
          </Image>
          <div>My Reels</div>
          <AddIcon size={11} /> {/* Add icon positioned at the bottom right */}
        </PositionedStory>
      </One>
      <Two>
        {/* <Story>
          <Image />
          <div>Abolaji</div>
        </Story>
        <Story>
          <Image />
          <div>Joseph</div>
        </Story>
        <Story>
          <Image />
          <div>Mikel</div>
        </Story>
        <Story>
          <Image />
          <div>Emmanuel</div>
        </Story>
        <Story>
          <Image />
          <div>Opeyemi</div>
        </Story>
        <Story>
          <Image />
          <div>David</div>
        </Story> */}
        {/* <Story>
          <Image />
          <div>Ivy</div>
        </Story> */}
      </Two>
    </Container>
  );
};

export default Reels;
