import { useState, useEffect, useContext } from "react";
import {
  Box,
  FormControl,
  InputBase,
  Button,
  TextareaAutosize,
  styled,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useLocation, useNavigate } from "react-router-dom";
import { userContext } from "../../context/userData";
import { API } from "../../service/api";

const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 20px;
  font-size: 25px;
`;

const TextArea = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 50px;
  font-size: 18px;
  border: none;
  &:focus-visible {
    outline: none;
  }
`;

const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdDate: new Date(),
};
export default function CreatePosts() {
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");
  const { userinfo } = useContext(userContext);
  const location = useLocation();
  const navigate = useNavigate();

  const imgUrl = post.picture
    ? post.picture
    : "https://pressidium.com/wp-content/uploads/2020/11/Custom-Post-Types-Part-2-1.png";

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };


  

  useEffect(() => {
    const getImage = async() => {
      if(file){
        const data = new FormData();
        data.append("name",file.name);
        data.append("file",file);
        console.log(file);

        const response = await API.uploadFile(data);
        post.picture = response.data;
      }
    }
    getImage();
    post.categories = location.search?.split("=")[1] || "All";
    post.username = userinfo.username;
  }, [file]);

  

  const savePost = async () => {
    let response = await API.createPost(post);
    if (response.isSuccess) {
      navigate("/");
    }
  };

  return (
    <Container>
      <Image src={imgUrl} alt="post banner" />
      <StyledFormControl>
        <label htmlFor="fileInput">
          <AddCircleIcon fontSize="large" cursor="pointer" />
        </label>
        <input
          type="file"
          id="fileInput"
          name="file"
          accept=".jpeg, .png, .jpg"
          style={{display: "none"}}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <InputTextField
          placeholder="Title"
          onChange={(e) => handleChange(e)}
          name="title"
        />
        <Button variant="contained" onClick={() => savePost()}>
          Publish
        </Button>
      </StyledFormControl>
      <TextArea
        minRows={5}
        placeholder="Tell your story..."
        onChange={(e) => handleChange(e)}
        name="description"
      />
    </Container>
  );
}
