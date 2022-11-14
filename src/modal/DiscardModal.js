import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import { makeStyles } from "@mui/styles";
const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 200,
  bgcolor: "background.paper",
  boxShadow: 24,
  height: "auto",
  p: 2.4,
};
function DiscardModal(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleReset = () => {
    props.discard();
  };

  return (
    <React.Fragment>
      <IconButton color="primary" onClick={handleOpen}>
        <KeyboardBackspaceRoundedIcon />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <Paper sx={{ ...styles, borderRadius: 12 }}>
          <Box
            sx={{
              textAlign: "center",
              my: 2,
            }}
          >
            <Typography variant="h6" component="h6">
              Discard Post?
            </Typography>
            <Typography variant="body2" component="p">
              If you discard then selected post will be dumped
            </Typography>
          </Box>
          <Stack spacing={1} sx={{ my: 1 }}>
            <Button
              variant="text"
              sx={{ color: "#eb4034" }}
              onClick={handleReset}
            >
              Discard
            </Button>
            <Divider variant="middle" />
            <Button variant="text" onClick={handleClose}>
              Cancel
            </Button>
          </Stack>
        </Paper>
      </Modal>
    </React.Fragment>
  );
}

export default DiscardModal;
