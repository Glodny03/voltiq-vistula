import { NavLink } from "react-router-dom";
import { Box, Typography, Stack, Chip } from "@mui/material";
import { BACKEND_URL } from "../../constants/api";
import { formatPricePLN } from "../../utils/formatPrice";

const getTimeAgo = (date) => {
  if (!date) return "";

  const now = new Date();
  const created = new Date(date);

  const diff = Math.floor((now - created) / (1000 * 60 * 60 * 24));

  if (diff === 0) return "dzisiaj";
  if (diff === 1) return "wczoraj";

  return `${diff} dni temu`;
};

export const ListingItem = ({ listing, user }) => {
  const isUsed = listing.mileage > 1000;

  const image = listing.imageUrls?.[0]
    ? `${BACKEND_URL}${listing.imageUrls[0]}`
    : "/img/placeholder-car.jpg";

  const userRef = typeof listing.userRef === "object" ? listing.userRef : user;

  return (
    <Box
      component={NavLink}
      to={`/listing/${listing._id}`}
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      border={1}
      borderColor="grey.200"
      borderRadius={2}
      overflow="hidden"
      bgcolor="background.paper"
      textDecoration="none"
      color="text.primary"
      sx={{
        mt: 1.5,
        transition: "transform .2s, border-color .2s",
        "&:hover": {
          transform: "translateY(-2px)",
          borderColor: "grey.300",
        },
        "&:hover .listing-image": {
          transform: "scale(1.05)",
        },
      }}
    >
      <Box
        width={{ xs: "100%", sm: 240 }}
        height={{ xs: 200, sm: "auto" }}
        flexShrink={0}
        overflow="hidden"
        position="relative"
      >
        <Box
          component="img"
          className="listing-image"
          src={image}
          alt={listing.title}
          width="100%"
          height="100%"
          sx={{
            objectFit: "cover",
            transition: "transform .4s ease",
          }}
        />

        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          height="35%"
          sx={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.25), rgba(0,0,0,0))",
          }}
        />

        <Chip
          label={isUsed ? "Używane" : "Nowe"}
          size="small"
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            fontWeight: 600,
            borderRadius: 1.5,
            bgcolor: isUsed ? "grey.200" : "primary.light",
            color: isUsed ? "text.primary" : "primary.dark",
          }}
        />
      </Box>

      <Stack flex={1} p={2} spacing={1.5}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          gap={1}
        >
          <Typography fontWeight={600} sx={{ minWidth: 0 }}>
            {listing.title}
          </Typography>

          <Typography
            fontWeight={800}
            color="primary.dark"
            fontSize={20}
            flexShrink={0}
          >
            {formatPricePLN(listing.price)}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          component={NavLink}
          to={`/listing/location/${listing.city}`}
          style={{ width: "fit-content" }}
        >
          {listing.city}
          {listing.voivodeship && `, ${listing.voivodeship}`}
        </Typography>

        <Box display="flex" flexWrap="wrap" gap={1}>
          <Chip
            label={listing.year}
            size="small"
            sx={{
              fontWeight: 600,
              bgcolor: "year.light",
              color: "year.dark",
            }}
          />

          <Chip
            label={`${listing.mileage?.toLocaleString("pl-PL")} km`}
            size="small"
          />

          {listing.driveType && <Chip label={listing.driveType} size="small" />}

          {listing.rangeKm && (
            <Chip
              label={`${listing.rangeKm} km`}
              size="small"
              sx={{
                bgcolor: "city.light",
                color: "city.dark",
              }}
            />
          )}

          {listing.powerHP && (
            <Chip label={`${listing.powerHP} KM`} size="small" />
          )}
        </Box>

        <Stack direction="row" spacing={1} alignItems="center" pt={0.5}>
          <Typography fontSize={13} color="text.secondary">
            {listing.sellerType === "private"
              ? "Oferta prywatna"
              : userRef?.username || "Oferta firmowa"}
          </Typography>

          <Typography fontSize={12} color="text.disabled">
            • {getTimeAgo(listing.createdAt)}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};
