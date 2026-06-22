import { Box, Typography, Stack, Grid } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { BACKEND_URL } from "../../constants/api";
import { CenteredContent } from "../../components/CenteredContent/CenteredContent";

export const Contact = () => {
  const heroImgUrl = `${BACKEND_URL}/img/ui/hero/hero5.jpg`;

  return (
    <>
      <Box py={{ xs: 6, md: 10 }}>
        <CenteredContent>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 4, md: 8 }}
            alignItems="center"
          >
            <Box flex={1}>
              <Typography variant="h4" color="primary.main" gutterBottom>
                Kontakt
              </Typography>

              <Typography variant="h1" mb={2}>
                Skontaktuj się z nami
              </Typography>

              <Typography variant="h4" color="text.secondary" mb={3}>
                Masz pytania dotyczące platformy Voltiq?
              </Typography>
            </Box>

            <Box flex={1.3} width="100%">
              <Box
                component="img"
                src={heroImgUrl}
                alt="Kontakt Voltiq"
                width="100%"
                height={{ xs: 250, md: 420 }}
                border={1}
                borderColor="grey.200"
                borderRadius={2}
                sx={{ objectFit: "cover" }}
              />
            </Box>
          </Stack>
        </CenteredContent>
      </Box>

      <Box py={{ xs: 6, md: 10 }} bgcolor="background.paper">
        <CenteredContent>
          <Typography variant="h2" textAlign="center" mb={{ xs: 4, md: 8 }}>
            Dane kontaktowe
          </Typography>

          <Grid container spacing={{ xs: 6, md: 8 }} justifyContent="center">
            <Grid item xs={12} sm={6} md={3}>
              <Stack alignItems="center" spacing={2}>
                <Box
                  width={72}
                  height={72}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bgcolor="primary.main"
                  borderRadius={2}
                >
                  <EmailIcon
                    sx={{
                      color: "background.paper",
                      fontSize: 32,
                    }}
                  />
                </Box>

                <Typography variant="h4" fontWeight={600}>
                  E-mail
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  kontakt@voltiq.pl
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Stack alignItems="center" spacing={2}>
                <Box
                  width={72}
                  height={72}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bgcolor="primary.main"
                  borderRadius={2}
                >
                  <PhoneIcon
                    sx={{
                      color: "background.paper",
                      fontSize: 32,
                    }}
                  />
                </Box>

                <Typography variant="h4" fontWeight={600}>
                  Telefon
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  +48 500 123 456
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Stack alignItems="center" spacing={2}>
                <Box
                  width={72}
                  height={72}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bgcolor="primary.main"
                  borderRadius={2}
                >
                  <LocationOnIcon
                    sx={{
                      color: "background.paper",
                      fontSize: 32,
                    }}
                  />
                </Box>

                <Typography variant="h4" fontWeight={600}>
                  Adres
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  ul. Elektromobilna 12
                  <br />
                  00-001 Warszawa
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Stack alignItems="center" spacing={2}>
                <Box
                  width={72}
                  height={72}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bgcolor="primary.main"
                  borderRadius={2}
                >
                  <AccessTimeIcon
                    sx={{
                      color: "background.paper",
                      fontSize: 32,
                    }}
                  />
                </Box>

                <Typography variant="h4" fontWeight={600}>
                  Czas pracy
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  Poniedziałek – Piątek
                  <br />
                  08:00 – 16:00
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </CenteredContent>
      </Box>
    </>
  );
};
