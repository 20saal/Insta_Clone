import {
  Avatar,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { sendSignUpRequest, sendProfileUserData } from "../../api/api";
import { LoadingButton } from "@mui/lab";
import { convertTo64 } from "../../helper/helpers";
const useLoadingStyles = makeStyles({
  root: {
    "& .MuiLoadingButton-loadingIndicator": {
      color: "white",
    },
  },
});

const SignUpUser = () => {
  const [avtBlob, setAvtBlob] = useState(null);
  const [selectedAvt, setSelecAvt] = useState(null);
  const [avtUrl, setAvtUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const loadingClasses = useLoadingStyles();
  const navigate = useNavigate();
  //using react-form-hook
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const avtTo64 = useMemo(() => {
    return convertTo64;
  }, []);
  const handleProfileChange = async () => {
    const avt64 = await avtTo64(watch("avatar")[0]);
    setSelecAvt(watch("avatar")[0]);
    setAvtUrl(avt64);
  };
  useEffect(() => {
    if (selectedAvt) {
      //selected image preview
      const avtBlobUrl = URL.createObjectURL(selectedAvt);
      setAvtBlob(avtBlobUrl);
      //convert to base64
    }
  }, [selectedAvt]);

  const onSubmitSignUpForm = async (data) => {
    localStorage.setItem("username", data.userName);
    const userData = {
      userName: data.userName,
      fullName: data.fullName,
      avt: avtUrl,
    };

    setIsLoading(true);
    try {
      await sendSignUpRequest({
        email: data.email,
        password: data.password,
        returnSecureToken: true,
      });
      sendProfileUserData(userData);
      navigate("/auth");
    } catch (error) {
      setFormError({ ...error });
    }
    setIsLoading(false);
    //remove from memory
    URL.revokeObjectURL(selectedAvt);
  };

  return (
    <Container maxWidth="xs">
      <Paper>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "15rem",
            marginX: "auto",
            py: 3,
            textAlign: "center",
          }}
        >
          <form onSubmit={handleSubmit(onSubmitSignUpForm)}>
            <Box
              sx={{
                textAlign: "center",
                border: 0,
                borderRadius: 10,
                p: 1,
                mb: 2,
              }}
            >
              <IconButton component="label" onChange={handleProfileChange}>
                <input
                  {...register("avatar", {
                    required: "Profile is required,Please select one",
                  })}
                  hidden
                  accept="image/*"
                  type="file"
                />
                <Avatar
                  src={`${!selectedAvt ? "/broken-image.jpg" : avtBlob}`}
                  sx={{ height: 50, width: 50 }}
                />
              </IconButton>
              <Typography
                variant="body2"
                sx={{ color: "#cc2d35", position: "relative" }}
              >
                {errors.avatar?.message}
              </Typography>
            </Box>
            <Stack spacing={2} marginBottom={3}>
              <TextField
                error={!!errors.fullName}
                {...register("fullName", {
                  required: "Field should not be empty",
                  minLength: {
                    value: 2,
                    message: "Fullname must contain atleast 2 characters",
                  },
                })}
                helperText={errors.fullName?.message}
                label="Full Name"
                size="small"
                autoFocus={true}
              />

              <TextField
                error={!!errors.userName}
                {...register("userName", {
                  required: "Field should not be empty",
                  minLength: {
                    value: 2,
                    message: "Username must contain atleast 2 characters",
                  },
                })}
                helperText={errors.userName?.message}
                label="Username"
                size="small"
              />

              <TextField
                error={!!errors.email}
                {...register("email", {
                  required: "Field should not be empty",
                })}
                helperText={errors.email?.message}
                label="Email"
                size="small"
                type="email"
              />

              <TextField
                error={!!errors.password}
                {...register("password", {
                  required: "Field should not be empty",
                  minLength: {
                    value: 6,
                    message: "atleast 6 character password",
                  },
                })}
                helperText={errors.password?.message}
                label="Password"
                size="small"
                type="password"
              />

              <LoadingButton
                loading={isLoading}
                loadingPosition="center"
                variant="contained"
                fullWidth={true}
                sx={{
                  background: "linear-gradient(45deg,#214096 40%,#2a84b8 80%)",
                }}
                type="submit"
                className={loadingClasses.root}
              >
                Sign Up
              </LoadingButton>
              {formError && (
                <Typography color="#b54336" variant="subtitle2" component="p">
                  {formError.message}
                </Typography>
              )}
              <Divider variant="middle">OR</Divider>
            </Stack>
          </form>
          <Box>
            <Typography variant="caption text" component={"p"}>
              Already have an account?
              <Link to="/auth/?status=login">Log In</Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignUpUser;
