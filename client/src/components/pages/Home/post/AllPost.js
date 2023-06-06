import { Box,Typography,styled } from "@mui/material";
import { addElipsis } from "../../../../utils/common-utils";

const Container = styled(Box)`
           border: 1px solid rgb(50, 115, 220);
           border-radius: 10px;
           margin: 10px;
           height: 350px;
           display: flex;
           flex-direction: column;
           align-items: center;`

const Text = styled(Typography)`
           color: #878787;
           font-size: 12px;`;
           
const Heading = styled(Typography)`
          font-size: 18px;
          font-weight: 600;
          word-break: break-word`
          
const Image = styled("img")({
    width: "100%",
    borderRadius: "10px 10px 0 0",
    objectFit: "cover",
})          

export default function AllPost({post}) {
    return (
        <Container>
            <Image src={post.picture} alt="blog"/>
            <Text>{post.categories}</Text>
            <Heading>{addElipsis(post.title,20)}</Heading>
            <Text>{post.username}</Text>
            <Typography>{addElipsis(post.description,80)}</Typography>
        </Container>
    )
}