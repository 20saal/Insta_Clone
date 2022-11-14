import React from "react";
import {
  AppBar,
  Avatar,
  createTheme,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { Box } from "@mui/system";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";
import SearchField from "../../api/SearchField";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AuthContext from "../../store/auth-context";
import NewPost from "../../modal/NewPost";
import UserContext from "../../store/user-context";
import ProfileContext from "../../store/profile-context";
function MainNavigation(props) {
  const { isLoggedIn, logout } = useContext(AuthContext);
  //using query params to render menuitem
  const [searchParams] = useSearchParams();
  const currStatus = searchParams.get("status");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { avt, userName } = useContext(ProfileContext);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const menuItemClickHandler = () => {
    //reverse the functionality if query changes
    localStorage.removeItem("username");
    logout();
    navigate("/auth");
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        sx={{ bgcolor: "white", mb: 5, color: "black" }}
      >
        <Toolbar sx={{ justifyContent: { xs: "space-between" } }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{ fontFamily: `'Satisfy', cursive` }}
          >
            Instagram
          </Typography>
          {isLoggedIn && (
            <Box
              sx={{
                flexGrow: 1,
                textAlign: "center",
                display: { xs: "none", sm: "flex" },
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <SearchField />
            </Box>
          )}

          {isLoggedIn && (
            <Stack direction="row" sx={{ marginRight: { sm: 5, md: 10 } }}>
              <IconButton
                disableRipple={true}
                sx={{}}
                onClick={() => {
                  navigate("/posts");
                }}
              >
                <HomeRoundedIcon sx={{ "&:hover": { fontSize: 25 } }} />
              </IconButton>
              <NewPost />
              <IconButton onClick={handleOpenMenu} disableRipple={true}>
                {isLoggedIn && (
                  <MeetingRoomRoundedIcon
                    sx={{ "&:hover": { fontSize: 25 } }}
                  />
                )}
              </IconButton>
              <Menu
                id="basic-menu"
                open={open}
                onClose={handleMenuClose}
                anchorEl={anchorEl}
              >
                {isLoggedIn && (
                  <MenuItem onClick={menuItemClickHandler}>Logout</MenuItem>
                )}
              </Menu>
            </Stack>
          )}
          {isLoggedIn && (
            <IconButton
              sx={{ p: 0 }}
              onClick={() => navigate(`/detail/${userName}`)}
            >
              <Avatar
                srcSet={avt}
                alt={"userName"}
                sx={{ height: 30, width: 30 }}
              />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <main>{props.children}</main>
    </Box>
  );
}

export default MainNavigation;
