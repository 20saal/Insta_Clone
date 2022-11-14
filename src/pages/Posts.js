import PostList from "../components/posts/PostList";
import React, { useContext, useEffect, useState } from "react";
import { fetchUserData } from "../api/api";
import { Box, CircularProgress } from "@mui/material";
import UserContext from "../store/user-context";
import ProfileContext from "../store/profile-context";
const progBoxStyles = {
  textAlign: "center",
  marginTop: 10,
};
const Posts = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userData, setUserData] = useState([]);
  const { post } = useContext(UserContext);
  const { handleData } = useContext(ProfileContext);
  React.useEffect(() => {
    async function sendReq() {
      try {
        const { arrangedData, currentUserData } = await fetchUserData();
        setUserData([...arrangedData]);
        handleData({ ...currentUserData });
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }

    sendReq();
  }, [post]);
  return (
    <React.Fragment>
      {!isLoading ? (
        <PostList userData={userData} />
      ) : (
        <Box sx={{ ...progBoxStyles }}>
          <CircularProgress />
        </Box>
      )}
    </React.Fragment>
  );
};

export default Posts;
