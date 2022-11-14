import { Avatar, Paper, Stack } from "@mui/material";
import { av1, av2, av3 } from "../../extraFiles/images/avatar/avatar";

const dummy_stories = [av1, av2, av3, av1, av2, av3, av1, av2, av3];
function PostStories() {
  return (
    <Paper
      variant="outlined"
      sx={{ mb: 2, overflow: "hidden", pb: 2, height: 50 }}
    >
      <Stack direction="row" spacing={2} p={1.25} sx={{ overflowY: "auto" }}>
        {dummy_stories.map((item) => (
          <Avatar src={item} sx={{ height: 50, width: 50 }} />
        ))}
      </Stack>
    </Paper>
  );
}

export default PostStories;
