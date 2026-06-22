import { Box, Grid, Stack, Typography } from "@mui/material";
import { CenteredContent } from "../../components/CenteredContent/CenteredContent";
import { ContentBox } from "../../components/ContentBox/ContentBox";

export const Cookies = () => {
  return (
    <Box py={{ xs: 3, md: 6 }}>
      <CenteredContent>
        <Stack spacing={3}>
          <ContentBox>
            <Typography variant="h1">Polityka plików cookies Voltiq</Typography>

            <Typography mt={1} color="text.secondary">
              Ostatnia aktualizacja: 14.06.2026
            </Typography>

            <Typography mt={2}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas. Suspendisse potenti. Integer
              tincidunt magna non lectus pharetra, nec dignissim lectus
              facilisis.
            </Typography>
          </ContentBox>

          <Grid container spacing={3}>
            <Grid item xs={12} md={9}>
              <Stack spacing={3}>
                <ContentBox isSection title="1. Czym są pliki cookies">
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vestibulum tincidunt, velit vitae suscipit cursus, eros
                    lacus facilisis augue, nec fermentum purus arcu vitae lorem.
                    Integer posuere purus eget neque pellentesque, vitae luctus
                    lorem ultrices.
                  </Typography>
                </ContentBox>

                <ContentBox isSection title="2. W jakim celu używamy cookies">
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec euismod, magna sit amet efficitur pretium, risus neque
                    aliquet nunc, sed suscipit massa lacus et justo. Suspendisse
                    potenti. Sed ac tellus vel odio faucibus tincidunt.
                  </Typography>
                </ContentBox>

                <ContentBox
                  isSection
                  title="3. Rodzaje wykorzystywanych cookies"
                >
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Praesent interdum, velit ac convallis posuere, turpis odio
                    ultrices augue, non tempor lacus nisl sit amet velit.
                    Curabitur tincidunt sem non magna posuere malesuada.
                  </Typography>
                </ContentBox>

                <ContentBox
                  isSection
                  title="4. Cookies niezbędne do działania serwisu"
                >
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque habitant morbi tristique senectus et netus et
                    malesuada fames ac turpis egestas. Nulla facilisi. Donec at
                    tortor ut nunc fermentum ultricies.
                  </Typography>
                </ContentBox>

                <ContentBox
                  isSection
                  title="5. Cookies analityczne i statystyczne"
                >
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer feugiat, mauris nec pharetra varius, ipsum turpis
                    cursus lorem, vitae dictum erat lectus eget sapien. Sed
                    consectetur orci vel nunc hendrerit, vel vulputate libero
                    faucibus.
                  </Typography>
                </ContentBox>

                <ContentBox isSection title="6. Zarządzanie plikami cookies">
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Morbi vulputate nisi at erat dictum, a tincidunt elit
                    dignissim. Fusce hendrerit, nunc eget consequat bibendum,
                    augue risus volutpat purus, sed vulputate lorem velit eget
                    augue.
                  </Typography>
                </ContentBox>

                <ContentBox
                  isSection
                  title="7. Ograniczenie stosowania cookies"
                >
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                    tempor lectus vitae risus bibendum, at tincidunt turpis
                    gravida. Aenean malesuada metus eget lorem cursus, non
                    gravida mauris tempus.
                  </Typography>
                </ContentBox>

                <ContentBox isSection title="8. Zmiany polityki cookies">
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla facilisi. Suspendisse potenti. Vivamus finibus, orci
                    sit amet gravida ultrices, justo ipsum feugiat elit, quis
                    posuere erat sapien non justo.
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
