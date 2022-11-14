import {
  Box,
  CardMedia,
  IconButton,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { makeStyles } from "@mui/styles";
import { Stack } from "@mui/system";
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import DiscardModal from "./DiscardModal";
import { sendUserPostReq } from "../api/api";
import { useNavigate } from "react-router-dom";
import { convertTo64 } from "../helper/helpers";
import UserContext from "../store/user-context";
const useStyles = makeStyles({
  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 320,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    height: "auto",
  },
  root: {
    "& .MuiLoadingButton-loadingIndicator": {
      color: "white",
    },
  },
});

function NewPost() {
  const { triggerPost } = useContext(UserContext);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [selecImgUrl, setImgUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDiscard = () => {
    setSelectedImg(null);
  };

  const { register, handleSubmit, watch } = useForm();

  const handleUploadChange = async () => {
    setSelectedImg(watch("uploadImage")[0]);
    const img64 = await imgTo64(watch("uploadImage")[0]);
    setImageUrl(img64);
  };
  const imgTo64 = useMemo(() => {
    return convertTo64;
  }, []);

  useEffect(() => {
    if (selectedImg) {
      //selected image preview
      const imgBlobUrl = URL.createObjectURL(selectedImg);
      setImgUrl(imgBlobUrl);
      //convert to base64
    }
  }, [selectedImg]);

  //final submit
  const submitPost = async (data) => {
    //send request to firebase
    setIsLoading(true);
    try {
      await sendUserPostReq({
        userName: localStorage.getItem("username"),
        post: imageUrl,
      });
      setOpen(false);
      setIsLoading(false);
      setSelectedImg(null);
      //reload homePage
      triggerPost();
    } catch (error) {
      console.log(error);
    }

    //remove from memory
    URL.revokeObjectURL(selectedImg);
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleOpen} disableRipple={true}>
        <AddBoxOutlinedIcon sx={{ "&:hover": { fontSize: 25 } }} />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <Paper className={classes.paper} sx={{ borderRadius: 6 }}>
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              textAlign: "center",
              borderBottom: "2px solid rgba(0,0,0,0.25)",
              mb: 3,
              py: 1,
            }}
          >
            {selectedImg && <DiscardModal discard={handleDiscard} />}
            <Typography variant="h6" sx={{ flexGrow: 1 }}>{`${
              !selectedImg ? "Create New Post" : "Edit"
            }`}</Typography>
            {selectedImg && <Button variant="text">Next</Button>}
          </Stack>
          <form onSubmit={handleSubmit(submitPost)}>
            <Stack
              sx={{
                marginBottom: 3,
                px: 4,
                height: "auto",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              {!selectedImg ? (
                <IconButton
                  onChange={handleUploadChange}
                  component="label"
                  sx={{ color: "#696865", "&:hover": { color: "#171716" } }}
                >
                  <input
                    {...register("uploadImage")}
                    hidden
                    accept="image/*"
                    type="file"
                  />
                  <AddAPhotoRoundedIcon fontSize="large" />
                </IconButton>
              ) : (
                <CardMedia
                  src={selecImgUrl}
                  component="img"
                  height="240"
                  sx={{ objectFit: "cover", mb: 2 }}
                />
              )}

              {selectedImg && (
                <LoadingButton
                  loading={isLoading}
                  loadingPosition="center"
                  variant="contained"
                  fullWidth={true}
                  sx={{
                    background:
                      "linear-gradient(45deg,#214096 40%,#2a84b8 80%)",
                  }}
                  type="submit"
                  className={classes.root}
                >
                  Post
                </LoadingButton>
              )}
            </Stack>
          </form>
        </Paper>
      </Modal>
    </React.Fragment>
  );
}
export default NewPost;
