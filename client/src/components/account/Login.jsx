import { useState, useContext } from "react";
import { Box, Button, styled, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { JsonAPI } from "../../service/api";
import { DataContext } from "../../context/DataProvider";

const Div = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Img = styled("img")({
  width: 100,
  margin: "auto",
  display: "flex",
  padding: "50px 0 0",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;

const SignUpButton = styled(Button)`
  text-transform: none;
  background: #fff;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/ 0.2);
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-to: 10px;
  font-weight: 600;
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 16px;
`;

const signupInitialValues = {
  name: "",
  username: "",
  pwd: "",
};

const signinInitialValues = {
  username: "",
  pwd: "",
};

const Login = ({ isAuthenticated }) => {
  const imageUrl =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";

  const [account, toggleAccount] = useState("login");
  const [signup, setSignup] = useState(signupInitialValues);
  const [signin, setSignin] = useState(signinInitialValues);
  const [error, setError] = useState("");

  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  const toggleSignUp = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };

  const onInputChange = (e) => {
    console.log(e.target.name, e.target.value);
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const onValueChange = (e) => {
    console.log(e.target.name, e.target.value);
    setSignin({ ...signin, [e.target.name]: e.target.value });
  };

  const signUpUser = async () => {
    let res = await JsonAPI.userSignup(signup);
    console.log(res);

    if (res.isSuccess) {
      setError("");
      setSignup(signupInitialValues);
      toggleAccount("login");
      toast.success("Successful Signup");
    } else {
      setError("Something went wrong.");
    }
  };

  const signInUser = async () => {
    let res = await JsonAPI.userSignin(signin);
    console.log(res);

    if (res.isSuccess) {
      setError("");

      localStorage.setItem("accessToken", `Bearer ${res.data.accessToken}`);
      localStorage.setItem("refreshToken", `Bearer ${res.data.refreshToken}`);
      localStorage.setItem("login", true);

      setAccount({
        username: res.data.data.username,
        name: res.data.data.name,
        user_id: res.data.data.id,
      });

      isAuthenticated(true);

      navigate("/home");
      toast.success("Successful Login");
    } else {
      setError("Something went wrong");
    }
  };

  return (
    <Div>
      <Box>
        {/* <Img src={imageUrl} alt="" srcset="" /> */}
        {account === "login" ? (
          <Wrapper>
            <TextField
              variant="standard"
              name="username"
              id="username"
              value={signin.username}
              onChange={(e) => onValueChange(e)}
              label="Enter username"
            />
            <TextField
              variant="standard"
              name="pwd"
              id="pwd"
              value={signin.pwd}
              onChange={(e) => onValueChange(e)}
              label="Enter password"
            />

            {error && <Error>{error}</Error>}

            <LoginButton variant="contained" onClick={() => signInUser()}>
              Login
            </LoginButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <SignUpButton onClick={() => toggleSignUp()}>
              Create an account
            </SignUpButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              variant="standard"
              label="Enter name"
              name="name"
              id="name"
              onChange={(e) => onInputChange(e)}
            />
            <TextField
              variant="standard"
              label="Enter username"
              name="username"
              id="username"
              onChange={(e) => onInputChange(e)}
            />
            <TextField
              variant="standard"
              label="Enter password"
              name="pwd"
              id="pwd"
              onChange={(e) => onInputChange(e)}
            />

            {error && <Error>{error}</Error>}

            <SignUpButton onClick={() => signUpUser()}>Sign up</SignUpButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <LoginButton onClick={() => toggleSignUp()}>
              Already have an account?
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Div>
  );
};

export default Login;
