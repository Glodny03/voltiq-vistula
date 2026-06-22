import { Box } from "@mui/material";

export const CenteredContent = ({ children }) => {
  return (
    <Box mx="auto" width="100%" maxWidth={1300} px={{ xs: 2, sm: 3, md: 4 }}>
      {children}
    </Box>
  );
};
