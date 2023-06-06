import { Button, TableHead, TableRow, TableBody, TableCell, Table, styled } from "@mui/material";
import { categories } from "../../../constants/data";
import {Link, useSearchParams} from "react-router-dom";

const StyledButton = styled(Button)`
        margin: 20px;
        width: 85%;
        background: #87CEEB;
        color: #fff;
        `;
const StyledLink = styled(Link)`
     text-decoration: none;
     color: inherit;`;        

export default function Categories() {

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  return (
    <>
       <Link to={`/create?category=${category || ""}`}>
      <StyledButton variant="contained">Create Blog</StyledButton>
      </Link>
      <Table>
        <TableHead>
          <TableRow>
            <StyledLink to="/">
            <TableCell>All Categories</TableCell>
            </StyledLink>
          </TableRow>
        </TableHead>
        <TableBody>
          
            {
                categories.map(category => {
                    return(
                    <TableRow key={category.id}>
                      <StyledLink to={`/?category=${category.type}`}>
                        <TableCell>{category.type}</TableCell>
                        </StyledLink>
                    </TableRow>
                    )
                })
            }
         
        </TableBody>
      </Table>
    </>
  );
}
