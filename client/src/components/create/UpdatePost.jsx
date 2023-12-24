import {
  Box,
  Button,
  FormControl,
  InputBase,
  styled,
  TextareaAutosize,
} from "@mui/material";
import { AddCircle as Add } from "@mui/icons-material";
import { useState, useEffect, useContext } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { DataContext } from "../../context/DataProvider";
import { API_SERVER } from "../../constants/config";
import { FormData_API } from "../../service/formDataApi";
import { JsonAPI } from "../../service/api";
import { getOnePost, getAllPosts } from "../../redux/slices/postsSlice";

const Container = styled(Box)`
  margin: 50px 100px;
`;

const Img = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const StyledFormedControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
`;

const TextArea = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 50px;
  font-size: 18px;
  border: none;
  &: focus-visible {
    outline: none;
  }
`;

const initialPost = {
  title: "",
  description: "",
  image: "",
  category: "",
  username: "",
  userId: "",
};

const UpdatePost = () => {
  const params = useParams();
  console.log("id", params);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [blog, setblog] = useState(initialPost);
  const [file, setFile] = useState("");
  const { account } = useContext(DataContext);

  // Redux stores
  const { post } = useSelector((state) => state.blogPostSlice);
  console.log("post to edit", post);

  useEffect(() => {
    dispatch(getOnePost(params.id));
    setblog((prev) => {
      let updated = JSON.parse(JSON.stringify(prev));
      updated.title = post?.title;
      updated.description = post?.description;
      updated.image = post?.image;
      updated.category = post?.category;
      updated.username = post?.username;
      updated.userId = post?.userId;

      return updated;
    });
  }, []);

  useEffect(() => {
    const getImg = async () => {
      const DATA = new FormData();

      if (typeof file == "string") {
        DATA.append("name", "filename.jpg");
        DATA.append("file", {
          // uri: String(file),
          // type: 'image/jpeg',
          // name: 'filename.jpg',
          fieldname: "file",
          originalname: String(file),
          encoding: "7bit",
          mimetype: "image/jpeg",
        });
      } else {
        DATA.append("name", file.name);
        DATA.append("file", file);
      }

      // Api call
      const res = await FormData_API.uploadFile(DATA);
      blog.image = res.data.image_url;
      // if (file) {
      //   console.log(file, 'this file');
      //   const DATA = new FormData();
      //   DATA.append('name', file.name);
      //   DATA.append('file', file);

      //   // Api call
      //   const res = await FormData_API.uploadFile(DATA);
      //   post.image = res.data.image_url;
      // }
    };
    getImg();
  }, [file]);

  const handleChange = (e) => {
    setblog({ ...blog, [e.target.name]: e.target.value });
  };

  const imgUrl =
    blog.image.length > 0
      ? blog.image
      : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
  console.log("imgUrl", imgUrl);

  const editPost = async () => {
    console.log(blog, "post data");
    let res = await JsonAPI.editPost({ id: params.id, ...blog });
    if (res.isSuccess === true) {
      navigate(`/post-details/${params.id}`);
      toast.success("Blog Edited Successfully");
      dispatch(getAllPosts());
      setblog(initialPost);
      setFile("");
    }
  };

  return (
    <Container>
      <Img src={API_SERVER + imgUrl} alt="banner" srcset="" />

      <StyledFormedControl>
        <label htmlFor="file_input">
          <Add fontSize="large" color="action" />
        </label>
        <input
          type="file"
          id="file_input"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />

        <InputTextField
          placeholder="title"
          name="title"
          value={blog.title}
          onChange={(e) => handleChange(e)}
        />
        <Button variant="contained" onClick={() => editPost()}>
          Publish
        </Button>
      </StyledFormedControl>

      <TextArea
        minRows={5}
        placeholder="Tell your story"
        name="description"
        value={blog.description}
        onChange={(e) => handleChange(e)}
      />
    </Container>
  );
};

export default UpdatePost;
