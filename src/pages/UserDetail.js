import { Box, CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserDetail } from "../api/api";
import UserDetailPage from "../components/posts/userDetailPage";
import ProfileContext from "../store/profile-context";
import UserContext from "../store/user-context";
const progBoxStyles = {
  textAlign: "center",
  marginTop: 10,
};
function UserDetail() {
  const [userDetail, setUserDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { handleData } = useContext(ProfileContext);
  const { postId } = useParams();
  const { post } = useContext(UserContext);
  useEffect(() => {
    const currUser = localStorage.getItem("username");
    async function sendReq() {
      try {
        const arrangedData = await fetchUserDetail(postId);
        setUserDetail(arrangedData);
        if (currUser === postId) {
          handleData(arrangedData);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    sendReq();
  }, [post, postId]);
  return (
    <React.Fragment>
      {!isLoading ? (
        <UserDetailPage
          avt={userDetail.avt}
          userName={userDetail.userName}
          posts={userDetail.posts}
        />
      ) : (
        <Box sx={{ ...progBoxStyles }}>
          <CircularProgress />
        </Box>
      )}
    </React.Fragment>
  );
}

export default UserDetail;
