import { Box, Typography, Link, Stack, Grid, Divider } from "@mui/material";
import { NavLink } from "react-router-dom";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { CenteredContent } from "../CenteredContent/CenteredContent";
import { BACKEND_URL } from "../../constants/api";

export const Footer = () => {
  const logoImage = `${BACKEND_URL}/img/ui/logo/logo-dark-mode.svg`;

  const linkStyle = {
    position: "relative",
    width: "fit-content",
    color: "grey.400",
    textDecoration: "none",
    transition: "color 0.2s ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      bottom: -3,
      width: 0,
      height: "1px",
      backgroundColor: "primary.main",
      transition: "width 0.2s ease",
    },

    "&:hover": {
      textDecoration: "none",
      color: "common.white",
    },

    "&:hover::after": {
      width: "100%",
    },
  };

  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(180deg, #0F172A 0%, #0B1220 100%)",
        pt: { xs: 6, md: 8 },
        pb: { xs: 5, md: 6 },
      }}
    >
      <CenteredContent>
        <Grid container spacing={{ xs: 6, md: 10 }}>
          <Grid item xs={12} md="auto">
            <Box
              component="img"
              src={logoImage}
              alt="Voltiq"
              sx={{
                width: { xs: 120, md: 140 },
                height: "auto",
                mb: { xs: 2.5, md: 3 },
                display: "block",
              }}
            />

            <Typography
              variant="body2"
              color="grey.300"
              sx={{
                maxWidth: 360,
                lineHeight: 1.9,
                mb: { xs: 2, md: 0 },
              }}
            >
              Platforma ogłoszeniowa dedykowana samochodom elektrycznym. Kupuj,
              sprzedawaj i porównuj oferty w jednym miejscu.
            </Typography>

            <Stack direction="row" spacing={2.5} mt={{ xs: 3, md: 5 }}>
              {[LinkedInIcon, InstagramIcon, FacebookIcon].map(
                (Icon, index) => (
                  <Link
                    key={index}
                    href="#"
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      backgroundColor: "rgba(255,255,255,0.04)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "grey.400",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.08)",
                        color: "primary.main",
                      },
                    }}
                  >
                    <Icon fontSize="small" />
                  </Link>
                ),
              )}
            </Stack>
          </Grid>

          <Grid item xs={12} md sx={{ ml: { md: "auto" } }}>
            <Grid container spacing={{ xs: 5, md: 8 }}>
              {[
                {
                  title: "Nawigacja",
                  links: [
                    { label: "Strona główna", to: "/" },
                    { label: "Ogłoszenia", to: "/listings" },
                    { label: "Dodaj ogłoszenie", to: "/listing/add" },
                    { label: "O nas", to: "/about" },
                  ],
                },
                {
                  title: "Popularne miasta",
                  links: [
                    {
                      label: "Warszawa",
                      to: "/listings?city=Warszawa&voivodeship=Mazowieckie",
                    },
                    {
                      label: "Poznań",
                      to: "/listings?city=Poznań&voivodeship=Wielkopolskie",
                    },
                    {
                      label: "Łódź",
                      to: "/listings?city=Łódź&voivodeship=Łódzkie",
                    },
                    {
                      label: "Kraków",
                      to: "/listings?city=Kraków&voivodeship=Małopolskie",
                    },
                  ],
                },
                {
                  title: "Pomoc",
                  links: [
                    { label: "Kontakt", to: "/contact" },
                    { label: "Regulamin", to: "/regulations" },
                  ],
                },
              ].map((section, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Typography
                    variant="subtitle2"
                    fontWeight={700}
                    letterSpacing={0.6}
                    textTransform="uppercase"
                    color="common.white"
                    fontSize="0.75rem"
                    mb={{ xs: 2, md: 3 }}
                  >
                    {section.title}
                  </Typography>

                  <Stack spacing={{ xs: 2, md: 2.5 }}>
                    {section.links.map((link, i) => (
                      <Link
                        key={i}
                        component={NavLink}
                        to={link.to}
                        sx={linkStyle}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Divider
          sx={{
            borderColor: "grey.800",
            opacity: 0.3,
            my: { xs: 5, md: 8 },
          }}
        />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={{ xs: 2, md: 3 }}
        >
          <Typography sx={{ fontSize: "0.75rem" }} color="grey.500">
            © {new Date().getFullYear()} Voltiq. Wszelkie prawa zastrzeżone.
          </Typography>

          <Stack direction="row" spacing={{ xs: 3, md: 4 }}>
            <Link component={NavLink} to="/privacy" sx={linkStyle}>
              Polityka prywatności
            </Link>
            <Link component={NavLink} to="/cookies" sx={linkStyle}>
              Cookies
            </Link>
          </Stack>
        </Box>
      </CenteredContent>
    </Box>
  );
};
