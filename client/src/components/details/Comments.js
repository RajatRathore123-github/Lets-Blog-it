import { Box, TextareaAutosize, Button, styled } from "@mui/material";
import { Person } from "@mui/icons-material";
import { useState, useContext, useEffect } from "react";
import { userContext } from "../../context/userData";
import { API } from "../../service/api";

import DisplayComments from "./displayComment";

const Container = styled(Box)`
  margin-top: 100px;
  display: flex;
`;
const StyledTextArea = styled(TextareaAutosize)`
  height: 100px;
  width: 100%;
  margin: 0px 20px 10px 20px;
`;

const initialPostComments = {
  name: "",
  postId: "",
  comments: "",
  date: new Date(),
};
export default function Comments({ post }) {
  const [comment, setComment] = useState(initialPostComments);
  const [allComments, setAllComments] = useState([]);
  const { userinfo } = useContext(userContext);
  const [toggleState, setToggleState] = useState(false);

  useEffect(() => {
    const getComments = async () => {
      let response = await API.getAllComments(post._id);
      if (response.isSuccess) {
        setAllComments(response.data);
      }
    }
    getComments();
  }, [post, toggleState]);

  const handleComments = (e) => {
    setComment({
      ...comment,
      name: userinfo.username,
      postId: post._id,
      comments: e.target.value,
    });
  };

  const addComment = async (e) => {
    let response = await API.userComment(comment);
    if (response.isSuccess) {
      setComment(initialPostComments);
      console.log("ok");
    }
    setToggleState((prev) => !prev);
  };
  return (
    <Box>
      <Container>
        <Person />
        <StyledTextArea
          minRows={5}
          placeholder="What's on your mind"
          value={comment.comments}
          onChange={(e) => handleComments(e)}
        />
        <Button
          variant="contained"
          size="medium"
          style={{ height: 40 }}
          onClick={(e) => addComment(e)}
        >
          Post
        </Button>
      </Container>
      <Box>
        {allComments &&
          allComments.length > 0 &&
          allComments.map((comment) => {
            return (
              <DisplayComments
                key={comment._id}
                comment={comment}
                setToggleState={setToggleState}
              />
            );
          })}
      </Box>
    </Box>
  );
}
