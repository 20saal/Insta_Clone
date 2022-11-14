import {
  Avatar,
  Box,
  Button,
  CardContent,
  CardHeader,
  IconButton,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MapsUgcRoundedIcon from "@mui/icons-material/MapsUgcRounded";
import React, { useState } from "react";
import ResTextField from "../../api/ResTextField";
const commentPaperStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: 300,
  height: 400,
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
};
function CommentBox(props) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <React.Fragment>
      <IconButton
        aria-label="add comment"
        sx={{ color: "#171716" }}
        onClick={handleOpen}
      >
        <MapsUgcRoundedIcon />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <Paper sx={{ ...commentPaperStyles }}>
          <CardHeader
            avatar={
              <Avatar
                srcSet={props.avt}
                alt={props.userName}
                sx={{ height: 50, width: 50 }}
              />
            }
            title={
              <Typography variant="body1" component="h6">
                {props.userName}
              </Typography>
            }
            sx={{ py: 1, borderBottom: "1px solid rgba(0,0,0,0.5)" }}
          />
          <Box sx={{ flexGrow: 1 }}></Box>

          <Stack
            direction="row"
            my={1}
            sx={{ borderTop: "1px solid rgba(0,0,0,0.5)", textAlign: "center" }}
          >
            <ResTextField placeholder="Add comment..." />
            <Button>Post</Button>
          </Stack>
        </Paper>
      </Modal>
    </React.Fragment>
  );
}

export default CommentBox;
