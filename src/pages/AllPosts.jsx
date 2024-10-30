import QuotePost from "./QuotePost";
import React from "react";
import SharedPost from "./SharedPost";
import SinglePost from "./SinglePost";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 50px;
  padding-bottom: 50px;

  @media (max-width: 768px) {
    margin-top: 10px;
    padding-bottom: 60px;
  }
`;

const AllPosts = () => {
  return (
    <Container>
      <SharedPost />
      <QuotePost />
      <SinglePost />
    </Container>
  );
};

export default AllPosts;
