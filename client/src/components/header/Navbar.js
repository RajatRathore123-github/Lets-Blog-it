import { AppBar, Toolbar, styled } from "@mui/material"
import {Link} from "react-router-dom";

const Component = styled(AppBar)`
      background: #fffff;
      `;
const Container = styled(Toolbar)`
       justify-content: center;
       & > a{
        padding: 20px;
        text-decoration: none;
       }`   
       
const LinkStyle = styled(Link)`
       color: black;`       
export default function Navbar(){
    return (
        <Component>
            <Container>
                <LinkStyle to="/">HOME</LinkStyle>
                <LinkStyle to="/about">ABOUT</LinkStyle>
                <LinkStyle to="/contact">CONTACT</LinkStyle>
                <LinkStyle to="/login">LOGOUT</LinkStyle>
            </Container>
        </Component>
    )
}