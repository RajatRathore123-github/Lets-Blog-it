import { Box, Typography,styled } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useContext } from "react";
import { userContext } from "../../context/userData";
import {API} from "../../service/api";

const Component = styled(Box)`
       margin-top: 30px;
       background: #F5F5F5;
       padding: 10px;`;

const Container = styled(Box)`
     display: flex;
     margin-bottom: 5px;`   
     
const Name = styled(Typography)`
       font-weight: 600;
       font-size: 18px;
       margin-right: 20px`  
       
const StyledDate = styled(Typography)`
       color: #878787;
       font-size: 14px;`  
       
const DeleteIcon = styled(Delete)`
      margin-left: auto;
      cursor: pointer;`       

export default function DisplayComments({comment,setToggleState}){

    const {userinfo} = useContext(userContext);

    const deleteComment = async() => {
       let response = await API.removeComment(comment._id);
       if(response.isSuccess){
        setToggleState(prev => !prev);
       }
    }
    return (
        <Component>
            <Container>
                <Name>{comment.name}</Name>
                <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
                {comment.name === userinfo.username && <DeleteIcon onClick={() => deleteComment()}/>}
            </Container>
            <Box>
                <Typography>{comment.comments}</Typography>
            </Box>
        </Component>
    )
}