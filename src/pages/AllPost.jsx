import { useEffect, useState } from "react";

import Post from "./Post";
import Skeleton from "./Skeleton";
import styled from "styled-components";
import usePostStore from "../store/usePostStore";

const Wrapper = styled.div`
  overflow: ${({ loading }) => (loading ? "hidden" : "auto")};
  height: 100vh;
`;

const Container = styled.div`
  color: #161616;
`;

const Inner = styled.div`
  height: 400px;
  border-radius: 6px;
  margin-top: 20px;
  /* padding: 20px; */
  /* border: 1px solid #e0e0e0; */

  .avi {
    overflow: hidden;
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }
`;

const AllPost = () => {
  //
  const { loading, posts } = usePostStore();

  if (loading) {
    return (
      <Wrapper>
        <Inner>
          <div className="flex gap-sm mb-2">
            <div className="avi">
              <Skeleton height={"100%"} width={"100%"} />
            </div>
            <div>
              <div className="flex flex-col">
                <Skeleton height={"10px"} width={"60px"} mt={"4px"} />
                <Skeleton height={"10px"} width={"40px"} mt={"4px"} />
              </div>
            </div>
          </div>

          <Skeleton width={"100%"} height={"350px"} border={"9"} />
        </Inner>
        <Inner>
          <div className="flex gap-sm mb-2">
            <div className="avi">
              <Skeleton height={"100%"} width={"100%"} />
            </div>
            <div>
              <div className="flex flex-col">
                <Skeleton height={"10px"} width={"60px"} mt={"4px"} />
                <Skeleton height={"10px"} width={"40px"} mt={"4px"} />
              </div>
            </div>
          </div>
          <Skeleton width={"100%"} height={"350px"} border={"9"} />
        </Inner>
      </Wrapper>
    );
  }

  if (posts.length === 0 && !loading) {
    return (
      <div className="text-sm mt-4">
        No post yet. Create one e.g "Hello World!👾"
      </div>
    );
  }

  return (
    <Wrapper>
      <div className="text-sm mt-4">
        {posts.length > 0 &&
          posts?.map((p) => {
            return (
              <div key={p._id}>
                <Post post={p} />
              </div>
            );
          })}
      </div>
    </Wrapper>
  );
};

export default AllPost;
