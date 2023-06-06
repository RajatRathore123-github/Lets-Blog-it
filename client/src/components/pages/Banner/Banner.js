import { Box, Typography, styled } from "@mui/material";

const Image = styled(Box)`
      background: url(https://img.freepik.com/premium-photo/flat-lay-home-office-workspace-female-blogger-background-with-white-modern-keyboard-notebook-apple-flowers-copy-space-white-background_121837-8310.jpg?w=2000) center/55% repeat-x;
      width: 100%,
      height: 50vh;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      `;

const Heading = styled(Typography)`
      font-size: 70px;
      color: #FFC0CB;
      line-height: 1;`; 
      
const SubHeading = styled(Typography)`
     font-size: 20px;
     color: #87CEEB; `;    

export default function Banner(){
    return (
        <Image>
            <Heading>BLOG</Heading>
            <SubHeading>Presented by Bloggers</SubHeading>
        </Image>
    )
}