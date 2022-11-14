import { Button, InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";
import SentimentVerySatisfiedRoundedIcon from "@mui/icons-material/SentimentVerySatisfiedRounded";
import React from "react";
const AddCommentWrraper = styled("div")(({ theme }) => ({
  position: "relative",
}));
const SmileWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  pointerEvents: "none",
  position: "absolute",
  pointerEvents: "none",
}));
const InputField = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

function ResTextField(props) {
  return (
    <AddCommentWrraper>
      <SmileWrapper>
        <SentimentVerySatisfiedRoundedIcon />
      </SmileWrapper>
      <InputField placeholder="Add comments..." />
    </AddCommentWrraper>
  );
}

export default ResTextField;
