import React, { useEffect, useRef, useState } from "react";

import { MainContainer } from "../components";
import styled from "styled-components";

const TabContainer = styled.div`
  display: flex;
  position: relative;
  /* height: 50px; // Set a height for the tab container */
  padding: 15px 0;
  position: sticky;
  top: 0;
  border-bottom: 1px solid #ccc;
  background-color: rgba(232, 239, 239, 0.95);
  z-index: 999;
`;

const Tab = styled.div`
  flex: 1;
  padding: 5px 0;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  /* color: ${(props) => (props.active ? "#fff" : "#333")}; // Text color */
`;

const Slider = styled.div`
  position: absolute;
  bottom: 0;
  left: ${(props) => props.left}px; // Use pixel value for left position
  height: 3px; // Slider height
  width: ${(props) => props.width}px; // Use pixel value for width
  background-color: rgba(27, 157, 135, 0.7);

  transition: left 0.3s, width 0.3s; // Smooth transition for the slider
`;

const Notification = () => {
  const [activeTab, setActiveTab] = useState(0); // State for active tab
  const [tabWidth, setTabWidth] = useState(0); // Width of the active tab
  const tabsRef = useRef([]); // Ref to hold the tab elements

  useEffect(() => {
    // Update the width of the active tab when activeTab changes
    if (tabsRef.current[activeTab]) {
      setTabWidth(tabsRef.current[activeTab].offsetWidth);
    }
  }, [activeTab]);

  const handleTabChange = (index) => {
    setActiveTab(index); // Update the active tab
  };

  return (
    <MainContainer>
      <TabContainer>
        {["All", "Mention", "Interaction"].map((label, index) => (
          <Tab
            key={label}
            ref={(el) => (tabsRef.current[index] = el)} // Store each tab in refs
            active={activeTab === index}
            onClick={() => handleTabChange(index)}
          >
            {label}
          </Tab>
        ))}
        <Slider
          left={
            tabsRef.current[activeTab]
              ? tabsRef.current[activeTab].offsetLeft
              : 0
          }
          width={tabWidth}
        />
      </TabContainer>
    </MainContainer>
  );
};

export default Notification;
