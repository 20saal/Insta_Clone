import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box } from "@mui/system";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { Stack } from "@mui/material";
import CommentBox from "../comments/CommentBox";
import { useNavigate } from "react-router-dom";

function PostItem(props) {
  const navigate = useNavigate();
  return (
    <Card
      variant="outlined"
      sx={{ width: "100%", height: "auto", maxHeight: 700 }}
    >
      <Box
        sx={{
          borderBottom: "1px solid rgba(0,0,0,0.5)",
        }}
      >
        <CardHeader
          avatar={
            <IconButton
              sx={{ p: 0 }}
              onClick={() => navigate(`/detail/${props.userName}`)}
            >
              <Avatar
                srcSet={props.avt}
                alt={props.userName}
                sx={{ height: 32, width: 32 }}
              />
            </IconButton>
          }
          title={
            <Typography variant="body1" component="h6">
              {props.userName}
            </Typography>
          }
          action={
            <IconButton>
              <MoreHorizIcon />
            </IconButton>
          }
          sx={{ py: 1 }}
        />
      </Box>

      <CardMedia
        component="img"
        image={props.post}
        sx={{ objectFit: "cover", maxHeight: 320 }}
      />

      <CardActions disableSpacing={true}>
        <Stack direction="row">
          <IconButton
            aria-label="like the post"
            sx={{ color: "#171716", "&:active": { fill: "#e32d20" } }}
          >
            <FavoriteBorderRoundedIcon />
          </IconButton>
          <CommentBox {...props} />
        </Stack>
      </CardActions>
      <CardContent sx={{ pt: 1 }}>
        <Typography variant="body2" component="p">
          Likes()
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PostItem;

// {loading ? (
//   <Skeleton sx={{ height: 140 }} animation="wave" variant="rectangular" />
// ) : (
//   <CardMedia component="img" height="140" image={YOUR_IMAGE_URL} />
// )}
