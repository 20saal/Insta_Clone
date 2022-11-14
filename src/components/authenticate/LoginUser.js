import { makeStyles } from "@mui/styles";
import { Divider, Paper, Stack, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { sendLoginRequest } from "../../api/api";
import AuthContext from "../../store/auth-context";
import React from "react";
const useLoadingStyles = makeStyles({
  root: {
    "& .MuiLoadingButton-loadingIndicator": {
      color: "white",
    },
  },
});
const LoginUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();
  const loadingClasses = useLoadingStyles();

  const { login } = useContext(AuthContext);

  //using react form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitLoginForm = async (data) => {
    setIsLoading(true);
    // console.log(data);
    try {
      const loginData = await sendLoginRequest({
        email: data.email,
        password: data.password,
        returnSecureToken: true,
      });
      login({ token: loginData.idToken });
      navigate("/posts");
    } catch (error) {
      setFormError({ ...error });
      setIsLoading(false);
    }

    setIsLoading(false);
  };
  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ height: 400 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="h4" component="h3" sx={{ my: 2 }}>
              Instagram
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmitLoginForm)}>
            <Stack spacing={3} marginY={3}>
              <TextField
                error={!!errors.email}
                {...register("email", {
                  required: "Field should not be empty",
                })}
                id="outlined-basic"
                label="Email"
                helperText={errors.email?.message}
                size="small"
                autoFocus={true}
              />

              <TextField
                error={!!errors.password}
                {...register("password", {
                  required: `Field can't be empty`,
                  minLength: {
                    value: 6,
                    message: "atleast 6 character password",
                  },
                })}
                type="password"
                label="Password"
                helperText={errors.password?.message}
                id="outlined-password-input"
                size="small"
              />

              <Stack spacing={1} sx={{ textAlign: "center" }}>
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
                  className={loadingClasses.root}
                >
                  Log In
                </LoadingButton>
                {formError && (
                  <Typography variant="subtitle2" component="p" color="#b54336">
                    {formError.message}
                  </Typography>
                )}
              </Stack>
              <Divider variant="middle">OR</Divider>
            </Stack>
          </form>
        </Box>
        <Box sx={{ textAlign: "center", m: 2 }}>
          <Typography variant="caption text" component="p">
            Don't have an account?
            <Link to="/auth/?status=signup">Create one</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginUser;
