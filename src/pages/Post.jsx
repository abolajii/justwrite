import QuotePost from "./QuotePost";
import React from "react";
import SharePost from "./SharePost";
import SinglePost from "./SinglePost";

const Post = ({ post }) => {
  if (post.postType === "quoted") {
    return <QuotePost post={post} />;
  }

  if (post.postType === "shared") {
    return <SharePost post={post} />;
  }
  return <SinglePost post={post} />;
};

export default Post;
