import {
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";

import { categories } from "../../constants/data";

const StyledTable = styled(Table)`
  border: 1px solid rgba(224, 224, 224, 1);
`;

const StyledBtn = styled(Button)`
  margin: 20px;
  width: 85%;
  background: #6495ed;
  color: #fff;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Categories = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  return (
    <>
      <StyledLink
        to={`/create/?category=${category || ""}`}
        style={{ textDecoration: "none" }}
      >
        <StyledBtn variant="contained">Create Post</StyledBtn>
      </StyledLink>

      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>
              <StyledLink to="/home">All categories</StyledLink>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                <StyledLink to={`/home?category=${category.type}`}>
                  {category.type}
                </StyledLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </>
  );
};

export default Categories;
