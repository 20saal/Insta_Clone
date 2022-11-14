import { InputBase } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import React from "react";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 16,
  backgroundColor: alpha("#a6a4a4", 0.25),
  "& :hover": {
    backgroundColor: alpha("#a6a4a4", 0),
  },
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  pointerEvents: "none",
}));

const SearchInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1rem + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.between("sm", "md")]: {
      width: "12ch",
      "&:focus": {
        width: "15ch",
      },
    },
  },
}));
function SearchField() {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchRoundedIcon />
      </SearchIconWrapper>
      <SearchInputBase placeholder="Search..." />
    </Search>
  );
}

export default SearchField;

// styled(component)(styles)=>component
