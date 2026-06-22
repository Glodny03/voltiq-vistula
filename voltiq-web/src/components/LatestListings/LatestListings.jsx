import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { getLatestListings } from "../../api/listingActions";
import ListingCard from "../ListingCard/ListingCard";

export const LatestListings = ({ status = "active", condition }) => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    getLatestListings(4, status, condition)
      .then((data) => {
        setListings(data);
      })
      .catch((err) => console.error(err));
  }, [status, condition]);

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
