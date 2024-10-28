import MobileSidebar from "./MobileSidebar";
import React from "react";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const MainContainer = ({ children }) => {
  return (
    <Container className="flex">
      <Sidebar />
      <MobileSidebar />
      <Main>{children}</Main>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  background-color: #f3f3f3;
  /* background-color: red; */
`;

const Main = styled.div`
  flex: 2.5;
`;

export default MainContainer;
