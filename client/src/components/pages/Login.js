import { useState, useContext } from "react";
import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { userContext } from "../../context/userData";
import { API } from "../../service/api";
import { useNavigate } from "react-router-dom";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.5);
`;

const Image = styled(`img`)({
  width: 400,
  margin: "auto",
  display: "flex",
});

const Wrapper = styled(Box)`
  padding: 25px 25px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const Error = styled(Typography)`
  font-sixe: 10px;
  color: ff6161;
  margin-top: 10px;
  font-weight: 500;
`;

const signupInitialValues = {
  name: "",
  username: "",
  password: "",
};

const loginInitialValues = {
  username: "",
  password: "",
};

export default function Login({ setAuthenticated }) {
  const [account, setAccount] = useState("login");
  const [signup, setSignup] = useState(signupInitialValues);
  const [login, setLogin] = useState(loginInitialValues);
  const [error, setError] = useState("");

  const { setUserinfo } = useContext(userContext);
  const navigate = useNavigate();

  const handleSignUp = () => {
    account === "signup" ? setAccount("login") : setAccount("signup");
  };

  const handleInput = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    let response = await API.userSignup(signup);
    if (response.isSuccess) {
      setSignup(signupInitialValues);
      handleSignUp("login");
      setError("");
    } else {
      setError("Something went wrong , Please try again later");
    }
  };

  const handleLoginValue = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    let response = await API.userLogin(login);
    if (response.isSuccess) {
      setError("");
      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );
      setUserinfo({
        username: response.data.username,
        name: response.data.name,
      });
      setAuthenticated(true);
      navigate("/");
    } else {
      setError("Something went wrong!, Please try again later");
    }
  };
  return (
    <div>
      <Component>
        <Box>
          <Image
            src="https://img.freepik.com/free-photo/online-message-blog-chat-communication-envelop-graphic-icon-concept_53876-139717.jpg"
            alt=""
          />
          {account === "login" ? (
            <Wrapper>
              <TextField
                id="standard-basic"
                label="Username"
                variant="standard"
                onChange={(e) => handleLoginValue(e)}
                name="username"
              />
              <TextField
                id="standard-basic"
                label="Password"
                variant="standard"
                onChange={(e) => handleLoginValue(e)}
                name="password"
              />

              {error && <Error>{error}</Error>}
              <Button onClick={() => handleLogin()} variant="contained">
                Login
              </Button>
              <Typography style={{ textAlign: "center" }}>OR</Typography>
              <Button onClick={handleSignUp} variant="outlined">
                Create your account
              </Button>
            </Wrapper>
          ) : (
            <Wrapper>
              <TextField
                onChange={(e) => handleInput(e)}
                id="standard-basic"
                label="Name"
                variant="standard"
                name="name"
              />
              <TextField
                onChange={(e) => handleInput(e)}
                id="standard-basic"
                label="Username"
                variant="standard"
                name="username"
              />
              <TextField
                onChange={(e) => handleInput(e)}
                id="standard-basic"
                label="Password"
                variant="standard"
                name="password"
              />

              {error && <Error>{error}</Error>}
              <Button onClick={() => signupUser()} variant="contained">
                SignUp
              </Button>
              <Typography style={{ textAlign: "center" }}>OR</Typography>
              <Button onClick={handleSignUp} variant="outlined">
                Already have an account
              </Button>
            </Wrapper>
          )}
        </Box>
      </Component>
    </div>
  );
}
