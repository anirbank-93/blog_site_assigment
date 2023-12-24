import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Box, Typography, styled } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { toast } from "react-hot-toast";

import { getOnePost, getAllPosts } from "../../../redux/slices/postsSlice";
import { JsonAPI } from "../../../service/api";
import { API_SERVER } from "../../../constants/config";
import { DataContext } from "../../../context/DataProvider";

const Container = styled(Box)`
  margin: 50px 100px;
`;

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const Heading = styled(Typography)`
  font-size: 38px;
  font-weight: 600;
  text-align: center;
  margin: 50px 0 100px 0;
  word-break: break-word;
`;

const EditIcon = styled(Edit)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;

const Author = styled(Box)`
  color: #878787;
  margin: 20px 0;
  display: flex;
`;

const Description = styled(Typography)`
  word-break: break-word;
`;

const PostDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { account } = useContext(DataContext);

  // Redux store
  const { post } = useSelector((state) => state.blogPostSlice);

  useEffect(() => {
    dispatch(getOnePost(id));
  }, []);

  const url = post?.image
    ? API_SERVER + post?.image
    : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  const deleteBlog = async () => {
    let res = await JsonAPI["deletePost"]({ id });

    if (res.isSuccess) {
      toast.success("Blog deleted successfully.");
      navigate("/home");
      dispatch(getAllPosts());
    }
  };

  return (
    <Container>
      <Image src={url} alt="post" />

      <Box style={{ float: "right" }}>
        {account?.username === post?.username && (
          <>
            <Link to={`/update/${id}`}>
              <EditIcon color="primary" style={{ cursor: "pointer" }} />
            </Link>
            <DeleteIcon
              color="error"
              style={{ cursor: "pointer" }}
              onClick={() => deleteBlog()}
            />
          </>
        )}
      </Box>

      <Heading>{post?.title}</Heading>

      <Author>
        <Typography>
          Author:{" "}
          <Box component="span" style={{ fontWeight: 600 }}>
            {post?.username}
          </Box>
        </Typography>
        <Typography style={{ marginLeft: "auto" }}>
          {new Date(post?.createdAt).toDateString()}
        </Typography>
      </Author>

      <Description>{post?.description}</Description>
    </Container>
  );
};

export default PostDetails;
