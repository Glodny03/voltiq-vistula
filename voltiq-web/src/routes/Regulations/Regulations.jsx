import { Box, Grid, Stack, Typography } from "@mui/material";
import { CenteredContent } from "../../components/CenteredContent/CenteredContent";
import { ContentBox } from "../../components/ContentBox/ContentBox";

export const Regulations = () => {
  return (
    <Box py={{ xs: 3, md: 6 }}>
      <CenteredContent>
        <Stack spacing={3}>
          <ContentBox>
            <Typography variant="h1">Regulamin serwisu Voltiq</Typography>

            <Typography mt={1} color="text.secondary">
              Ostatnia aktualizacja: 14.06.2026
            </Typography>

            <Typography mt={2}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque habitant morbi tristique senectus et netus.
            </Typography>
          </ContentBox>

          <Grid container spacing={3}>
            <Grid item xs={12} md={9}>
              <Stack spacing={3}>
                <ContentBox isSection title="1. Postanowienia ogólne">
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec tincidunt sem vitae lorem malesuada.
                  </Typography>
                </ContentBox>

                <ContentBox isSection title="2. Konto użytkownika">
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse potenti. Integer dignissim massa vel tellus
                    volutpat.
                  </Typography>
                </ContentBox>

                <ContentBox isSection title="3. Ogłoszenia">
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Praesent suscipit arcu sed mauris faucibus.
                  </Typography>
                </ContentBox>

                <ContentBox isSection title="4. Płatności">
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Curabitur feugiat velit non magna vulputate.
                  </Typography>
                </ContentBox>

                <ContentBox isSection title="5. Dane osobowe">
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc feugiat erat et tellus interdum.
                  </Typography>
                </ContentBox>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </CenteredContent>
    </Box>
  );
};
