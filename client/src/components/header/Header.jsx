import { AppBar, styled, Toolbar, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

import { clearBlogPostsState } from "../../redux/slices/postsSlice";

const HeadComponent = styled(AppBar)`
  background: #ffffff;
  color: #000;
`;

const Container = styled(Toolbar)`
  justify-content: center;
  & > a {
    padding: 20px;
    color: #000;
    text-decoration: none;
  }
`;

const StyledBtn = styled(Button)`
  text-decoration: none;
  color: black;
  font-weight: 14px;
`;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(clearBlogPostsState());

    navigate("/");

    toast.success("Successfully Logged Out");
  };
  return (
    <HeadComponent>
      <Container>
        <Link to="/home">HOME</Link>
        <Link to="/about">ABOUT</Link>
        <Link to="/contact">CONTACT</Link>
        <StyledBtn onClick={handleLogout}>LOGOUT</StyledBtn>
      </Container>
    </HeadComponent>
  );
};

export default Header;
