import Feeds from "./Feeds";
import { MainContainer } from "../components";
import React from "react";
import Reels from "../components/Reels";
import Widget from "./Widget";
import styled from "styled-components";
import usePostStore from "../store/usePostStore";

const Dashboard = () => {
  const { loading } = usePostStore();
  return (
    <MainContainer>
      <Container loading={loading}>
        <div className="one">
          <TopInner>
            <Reels />
          </TopInner>
          <Feeds />
        </div>
        <Three className="two">
          <Widget />
        </Three>
      </Container>
    </MainContainer>
  );
};

export default Dashboard;

const Three = styled.div`
  /* background-color: green; */
  height: 100%;
  overflow-y: scroll;
  /* Hide scrollbar */
  scrollbar-width: none; /* For Firefox */
  -ms-overflow-style: none; /* For Internet Explorer and Edge */
  &::-webkit-scrollbar {
    display: none; /* For Chrome, Safari, and Opera */
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const TopInner = styled.div`
  /* height: 80px; */
  position: sticky;
  top: 0;
  /* padding: 10px; */
  background-color: #f3f3f3;

  /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05); */

  margin-top: 10px;

  z-index: 999;
`;

const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: ${({ loading }) => (loading ? "hidden" : "auto")};

  .one {
    flex: 1.2;
  }

  .two {
    flex: 0.8;

    @media (max-width: 768px) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
`;
