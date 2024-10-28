import Feeds from "./Feeds";
import { MainContainer } from "../components";
import React from "react";
import Reels from "../components/Reels";
import styled from "styled-components";

const Dashboard = () => {
  return (
    <MainContainer>
      <Container>
        <div className="one">
          <TopInner>
            <Reels />
          </TopInner>
          <Feeds />
        </div>
        <div className="two">B</div>
      </Container>
    </MainContainer>
  );
};

export default Dashboard;

const TopInner = styled.div`
  /* height: 80px; */
  position: sticky;
  top: 0;
  /* padding: 10px; */
  /* background-color: #e1e1e1; */
  /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05); */

  margin-top: 10px;

  /* background: red; */
`;

const Container = styled.div`
  display: flex;

  .one {
    flex: 1.2;
  }

  .two {
    flex: 0.8;
  }
`;
