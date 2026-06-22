import { BACKEND_URL } from "../../constants/api";
import { NavLink } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { slugifyPL } from "../../utils/slugify";

export const CityTile = ({ cityName, voivodeship }) => {
  const cityImage = `${BACKEND_URL}/img/cities/${slugifyPL(cityName)}.jpg`;

  return (
    <Box
      component={NavLink}
      to={`/listings?city=${encodeURIComponent(
        cityName,
      )}&voivodeship=${encodeURIComponent(voivodeship)}`}
      display="flex"
      flexDirection="column"
      height="100%"
      border={1}
      borderColor="grey.200"
      borderRadius={2}
      overflow="hidden"
      bgcolor="background.paper"
      textDecoration="none"
      color="text.primary"
      sx={{
        transition: "transform 0.2s ease, border-color 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          borderColor: "grey.300",
        },
      }}
    >
      <Box
        component="img"
        src={cityImage}
        alt={cityName}
        width="100%"
        height={160}
        display="block"
        sx={{ objectFit: "cover" }}
      />

      <Box textAlign="center" py={1.5}>
        <Typography fontWeight={600}>{cityName}</Typography>
      </Box>
    </Box>
  );
};
