import BottomTab from "../components/BottomTab";
import React from "react";
import Textarea from "../components/Textarea";
import styled from "styled-components";

const CreatePost = () => {
  return (
    <Container>
      <Inner>
        <Textarea />
        <Image />
        <BottomTab />
      </Inner>
    </Container>
  );
};

const Container = styled.div``;

const Inner = styled.div`
  border: 1px solid rgba(54, 187, 186, 0.2);
  padding: 10px;
  border-radius: 4px;
  margin-top: 20px;
`;

const Image = styled.div`
  max-height: 600px;
`;

export default CreatePost;
