import { Box, Typography } from "@mui/material";

export const ContentBox = ({ title, children, isSection = false }) => {
  return (
    <Box
      my={2}
      py={isSection ? undefined : 3}
      {...(isSection && {
        bgcolor: "background.paper",
        p: 2,
        px: 3,
        borderRadius: 2,
      })}
    >
      {title && (
        <Typography variant={isSection ? "h3" : "h2"} fontWeight={700} mb={2}>
          {title}
        </Typography>
      )}

      {children}
    </Box>
  );
};
