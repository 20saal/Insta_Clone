import {
  Avatar,
  Box,
  Button,
  Divider,
  ImageList,
  ImageListItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
const paperStyles = {
  height: "100vh",
  width: "100%",
  py: 2,
  display: "flex",
  flexDirection: "column",
};
const imgBoxStyles = {
  display: "flex",
  alignItems: "center",
  px: 3,
};
function UserDetailPage(props) {
  return (
    <Container sx={{ maxWidth: { sm: "sm" } }}>
      <Paper sx={{ ...paperStyles }}>
        <Stack direction="row" alignItems="center">
          <Avatar src={props.avt} sx={{ height: 60, width: 60, m: 4 }} />
          <Stack flexGrow={1} sx={{ justifyContent: "flex-start" }} spacing={1}>
            <Typography variant="h5" component="h5">
              {props.userName}
            </Typography>
          </Stack>
        </Stack>
        <Divider />

        <ImageList
          sx={{
            gridTemplateColumns:
              "repeat(auto-fill,minmax(180px,1fr))!important",
          }}
          rowHeight={164}
        >
          {props.posts?.map((post) => (
            <ImageListItem
              key={post}
              sx={{
                overflow: "hidden",
                objectFit: "cover",
                p: { md: 2 },
                py: { xs: 1, sm: 0 },
              }}
            >
              <img src={`${post}`} srcSet={`${post}`} alt="" loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>
      </Paper>
    </Container>
  );
}
export default UserDetailPage;
