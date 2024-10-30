import React, { useEffect } from "react";

import AllPost from "./AllPost";
import AllPosts from "./AllPosts";
import CreatePost from "./CreatePost";
import { TbReload } from "react-icons/tb";
import { getFeeds } from "../api/requests";
import styled from "styled-components";
import usePostStore from "../store/usePostStore";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem 0;

  .reload {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 36px;
    width: 36px;
    border-radius: 50%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background-color: #f0f0f0;
    cursor: pointer;
    transition: box-shadow 0.2s ease;

    &:hover {
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    }
  }
`;

const Feeds = () => {
  //
  const { setPosts, setLoading } = usePostStore();

  //
  const handleReload = async () => {
    setLoading(true);
    try {
      const response = await getFeeds();
      setPosts(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleReload();
  }, []);

  return (
    <div>
      <div>
        <CreatePost />
      </div>
      <Container>
        <div className="reload" onClick={handleReload}>
          <TbReload size={18} color="#28a69e" />
        </div>
      </Container>
      <AllPost />
    </div>
  );
};

export default Feeds;
