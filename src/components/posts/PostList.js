import { Grid } from "@mui/material";
import PostItem from "./PostItem";
import { Stack } from "@mui/system";
import PostStories from "./PostStories";
import { v1 } from "uuid";

const PostList = (props) => {
  return (
    <Grid container sx={{ justifyContent: "space-around" }}>
      <Grid item xs={11.9} sm={9} md={4.95} lg={5} xl={2}>
        {/* <PostStories /> */}
        <Stack spacing={2}>
          {props.userData.map((item) =>
            item.posts?.map((post) => {
              return (
                <PostItem
                  key={item.userName + v1()}
                  post={post}
                  avt={item.avt}
                  userName={item.userName}
                />
              );
            })
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default PostList;
