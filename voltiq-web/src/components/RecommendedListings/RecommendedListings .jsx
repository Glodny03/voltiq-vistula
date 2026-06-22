import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { getRandomListings } from "../../api/listingActions";
import ListingCard from "../ListingCard/ListingCard";

export const RecommendedListings = ({ excludeId }) => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    getRandomListings(4, "active", excludeId)
      .then((data) => {
        setListings(data);
      })
      .catch((err) => console.error(err));
  }, [excludeId]);

  if (!listings.length) {
    return null;
  }

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
      {listings.map((listing) => (
        <ListingCard key={listing._id} listing={listing} />
      ))}
    </Box>
  );
};
