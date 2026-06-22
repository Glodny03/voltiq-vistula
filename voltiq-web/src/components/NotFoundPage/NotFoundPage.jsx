import { Box, Typography } from "@mui/material";

export const NotFoundPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      py={8}
      px={2}
    >
      <Typography
        fontSize={72}
        fontWeight={800}
        color="grey.300"
        lineHeight={1}
      >
        404
      </Typography>

      <Typography fontSize={22} fontWeight={600} mt={2}>
        Strona nie została znaleziona
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        maxWidth={520}
        mt={1.5}
      >
        Wygląda na to, że tej strony nie można znaleźć. Prawdopodobnie została
        usunięta albo zmieniła adres. Jeśli potrzebujesz więcej informacji,
        zajrzyj do działu pomocy.
      </Typography>
    </Box>
  );
};
