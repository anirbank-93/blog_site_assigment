import { Box, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Redux actions
import { getAllPosts } from "../../../redux/slices/postsSlice";

// Components
import Post from "./Post";

const Posts = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  // Redux stores
  const { posts } = useSelector((state) => state.blogPostSlice);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [category]);

  return (
    <>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Grid item lg={3} sm={3} xs={12}>
            <Link
              to={`/post-details/${post.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Post post={post} />
            </Link>
          </Grid>
        ))
      ) : (
        <Box style={{ color: "#878787", margin: "30px 80px", fontSize: 18 }}>
          Currently no posts are available
        </Box>
      )}
    </>
  );
};

export default Posts;
