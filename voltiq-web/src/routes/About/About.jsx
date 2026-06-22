import { Box, Typography, Stack, Grid } from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import VerifiedIcon from "@mui/icons-material/Verified";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import SpeedIcon from "@mui/icons-material/Speed";
import { BACKEND_URL } from "../../constants/api";
import { CenteredContent } from "../../components/CenteredContent/CenteredContent";

export const About = () => {
  const heroImgUrl = `${BACKEND_URL}/img/ui/hero/hero2.jpg`;

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
                Platforma EV
              </Typography>

              <Typography variant="h1" mb={2}>
                Znajdź auto elektryczne
              </Typography>

              <Typography variant="h4" color="text.secondary" mb={3}>
                Kupuj sprzedawaj porównuj
              </Typography>

              <Typography variant="body1" color="text.secondary" maxWidth={500}>
                Voltiq to platforma ogłoszeń samochodów elektrycznych.
                Znajdziesz tu nowe i używane auta EV w jednym miejscu.
                Przeglądaj oferty, porównuj parametry i wybierz idealny model
                dla siebie.
              </Typography>
            </Box>

            <Box flex={1} width="100%">
              <Box
                component="img"
                src={heroImgUrl}
                alt="EV platform"
                width="100%"
                height={{ xs: 250, md: 400 }}
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
            Dlaczego warto?
          </Typography>

          <Grid container spacing={{ xs: 6, md: 8 }} justifyContent="center">
            <Grid item xs={12} sm={6} md={2}>
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
                  <BuildIcon sx={{ color: "background.paper", fontSize: 32 }} />
                </Box>

                <Typography variant="h4" fontWeight="600" textAlign="center">
                  Szeroki wybór aut
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                  maxWidth={260}
                >
                  Znajdziesz u nas wiele modeli samochodów elektrycznych - od
                  miejskich po SUV-y, dostępnych od dealerów i osób prywatnych.
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
                  <VerifiedIcon
                    sx={{ color: "background.paper", fontSize: 32 }}
                  />
                </Box>

                <Typography fontWeight="600" variant="h4" textAlign="center">
                  Sprawdzone ogłoszenia
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                  maxWidth={260}
                >
                  Dbamy o jakość ofert, dzięki czemu możesz przeglądać rzetelne
                  ogłoszenia z dokładnymi informacjami o pojazdach.
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
                  <BatteryChargingFullIcon
                    sx={{ color: "background.paper", fontSize: 32 }}
                  />
                </Box>

                <Typography variant="h4" fontWeight="600" textAlign="center">
                  Szczegółowe dane
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                  maxWidth={260}
                >
                  Każde ogłoszenie zawiera kluczowe parametry, takie jak zasięg,
                  bateria czy moc, co ułatwia porównywanie modeli.
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
                  <SpeedIcon sx={{ color: "background.paper", fontSize: 32 }} />
                </Box>

                <Typography variant="h4" fontWeight="600" textAlign="center">
                  Prosty proces
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                  maxWidth={260}
                >
                  Dodawanie i przeglądanie ogłoszeń jest szybkie i intuicyjne,
                  dzięki czemu bez problemu znajdziesz lub sprzedasz auto.
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </CenteredContent>
      </Box>
    </>
  );
};
