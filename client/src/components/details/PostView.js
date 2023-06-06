import { Box, Typography, styled } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { API } from "../../service/api";
import { Edit, Delete } from "@mui/icons-material";
import { userContext } from "../../context/userData";

import Comments from "./Comments";

const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",
  [theme.breakpoints.down("md")]: {
    margin: 0
  }
}));
  


const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const Heading = styled(Typography)`
  font-size: 34px;
  font-weight: 600;
  text-align: center;
  margin: 30px 0 10px 0;
  word-break: break word;
`;

const Description = styled(Typography)
     `word-break: break word;`

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
  cursor: pointer;
`;

const Author = styled(Box)`
       color: #878787;
       margin: 20px 0;
       display: flex;
       `;

export default function DetailView() {
  const [post, setPost] = useState({});
  const { userinfo } = useContext(userContext);
  const navigate = useNavigate();

  const { id } = useParams();

  const url = post.picture ? post.picture :
    "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  useEffect(() => {
    const fetchPost = async () => {
      let response = await API.getPostById(id);
      if (response.isSuccess) {
        setPost(response.data);
      }
    };
    fetchPost();
  }, [id]);

  const deletePost = async() => {
    let response = await API.deleteBlog(post._id);
    if(response.isSuccess){
      navigate("/");
    }
  }

  return (
    <Container>
      <Image src={url} alt="blog" />
      <Box style={{ float: "right" }}>
        {userinfo.username === post.username && 
        <>
        <Link to={`/update/${post._id}`}>
        <EditIcon color="primary" />
        </Link>
        <DeleteIcon onClick={() => deletePost()} color="error" />
        </>}
        
      </Box>
      <Heading>{post.title}</Heading>
      <Author>
        <Typography style={{"marginRight": "20px"}}>Author: {`${post.username}`}</Typography>
        <Typography>Date: {`${new Date(
          post.createdDate
        ).toDateString()}`}</Typography>
      </Author>
      <Description>{`${post.description}`}</Description>
      <Comments post={post}/>
    </Container>
  );
}
