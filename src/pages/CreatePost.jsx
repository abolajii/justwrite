import BottomTab from "../components/BottomTab";
import React from "react";
import Textarea from "../components/Textarea";
import styled from "styled-components";

const CreatePost = () => {
  return (
    <Container>
      <Inner>
        <Textarea />
        <BottomTab />
      </Inner>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Inner = styled.div`
  border: 1px solid rgba(54, 187, 186, 0.2);
  padding: 10px;
  border-radius: 4px;
  margin-top: 20px;
  width: 100%;
  max-width: 620px !important; /* Ensures it doesn’t exceed 620px */

  @media (max-width: 768px) {
    margin-bottom: 80px;
  }
`;

export default CreatePost;
