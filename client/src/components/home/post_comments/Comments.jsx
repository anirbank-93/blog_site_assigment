import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DataContext } from "../../../context/DataProvider";
import { JsonAPI } from "../../../service/api";
import { toast } from "react-hot-toast";

// Redux action
import { getAllPostComments } from "../../../redux/slices/postCommentsSlice";

// Components
import { Box, TextareaAutosize, Button, styled } from "@mui/material";
import OneComment from "./OneComment";

// Assets
const url = "https://static.thenounproject.com/png/12017-200.png";

const Container = styled(Box)`
  margin-top: 100px;
  display: flex;
`;

const Image = styled("img")({
  width: 50,
  height: 50,
  borderRadius: "50%",
});

const StyledTextarea = styled(TextareaAutosize)`
  height: 100px;
  width: 100%;
  margin: 0 20px;
`;

const initialValues = {
  name: "",
  userId: "",
  postId: "",
  comment: "",
};

const Comments = ({ post }) => {
  // console.log("post", post);
  const dispatch = useDispatch();
  const [comment, setcomment] = useState(initialValues);
  const { account } = useContext(DataContext);

  // Redux stores
  const { comments } = useSelector((state) => state.postCommentSlice);
  console.log("comments", comments);

  useEffect(() => {
    dispatch(getAllPostComments(post?.id));
  }, [post?.id, dispatch]);

  const handleChange = (event) => {
    setcomment((prevState) => {
      let update = JSON.parse(JSON.stringify(prevState));
      update.name = account?.name;
      update.userId = account?.user_id;
      update.postId = post?.id;

      return { ...update, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (comment.comment == "") {
      toast.error("Comment cannot be empty");
    } else {
      let res = await JsonAPI["addComment"](comment);

      if (res.isSuccess) {
        toast.success("Comment Added Successfully.");
        setcomment(initialValues);
        dispatch(getAllPostComments(post?.id));
      }
    }
  };

  return (
    <Box>
      <Container>
        <Image src={url} alt="dp" />
        <StyledTextarea
          minRows={5}
          placeholder="What's on your mind?"
          name="comment"
          value={comment.comment}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          size="medium"
          style={{ height: 40 }}
          onClick={handleSubmit}
        >
          Post
        </Button>
      </Container>
      <Box>
        {comments?.length > 0 &&
          comments.map((item, idx) => (
            <OneComment
              key={idx}
              comment={item}
              getComments={getAllPostComments}
            />
          ))}
      </Box>
    </Box>
  );
};

export default Comments;
