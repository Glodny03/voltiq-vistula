import { Box } from "@mui/material";
import { CityTile } from "../CityTile/CityTile";

export const FeaturedCities = () => {
  const cities = [
    { city: "Warszawa", voivodeship: "Mazowieckie" },
    { city: "Poznań", voivodeship: "Wielkopolskie" },
    { city: "Łódź", voivodeship: "Łódzkie" },
    { city: "Kraków", voivodeship: "Małopolskie" },
  ];
  return (
    <Box
      sx={{
        display: "grid",
        gap: 3,
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        },
      }}
    >
      {cities.map(({ city, voivodeship }) => (
        <CityTile key={city} cityName={city} voivodeship={voivodeship} />
      ))}
    </Box>
  );
};
