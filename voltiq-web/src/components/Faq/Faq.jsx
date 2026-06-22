import { Box, Stack, Typography } from "@mui/material";
import { Accordion } from "../Accordion/Accordion";
import { faqData } from "./faqData";
import { BACKEND_URL } from "../../constants/api";

export const Faq = () => {
  const faqImage = `${BACKEND_URL}/img/ui/faq-image.svg`;

  return (
    <Box
      py={{ xs: 1, sm: 2, md: 2 }}
      px={{ xs: 1.5, sm: 2 }}
      display="flex"
      justifyContent="center"
    >
      <Box width="100%" maxWidth={1000}>
        <Typography
          variant="h2"
          fontWeight={700}
          mb={{ xs: 3, sm: 4 }}
          sx={{
            fontSize: {
              xs: "1.5rem",
              sm: "1.75rem",
              md: "2rem",
            },
          }}
        >
          Co warto wiedzieć?
        </Typography>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 3, md: 9 }}
          alignItems="center"
        >
          <Box flex={1}>
            <Accordion items={faqData} />
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "block" },
              maxWidth: 200,
              width: "100%",
            }}
          >
            <Box
              component="img"
              src={faqImage}
              alt="FAQ illustration"
              sx={{
                width: "100%",
                height: "auto",
              }}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
