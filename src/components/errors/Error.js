import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

function Error() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ width: 1, textAlign: "center", marginTop: 28 }}>
        <Typography variant="h4" component="h3">
          404 | Page not found
        </Typography>
      </Box>
    </Container>
  );
}

export default Error;
