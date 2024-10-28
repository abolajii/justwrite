import AllPosts from "./AllPosts";
import CreatePost from "./CreatePost";
import React from "react";

const Feeds = () => {
  return (
    <div>
      <div>
        <CreatePost />
      </div>
      <div>
        <AllPosts />
      </div>
    </div>
  );
};

export default Feeds;
