import { NavLink } from "react-router-dom";
import { Box, Typography, Stack, Divider, Chip } from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import SettingsIcon from "@mui/icons-material/Settings";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import BoltIcon from "@mui/icons-material/Bolt";
import { BACKEND_URL } from "../../constants/api";
import { formatPricePLN } from "../../utils/formatPrice";

const ListingCard = ({ listing }) => {
  const isUsed = listing.mileage > 1000;

  return (
    <Box
      component={NavLink}
      to={`/listing/${listing._id}`}
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
        "&:hover .listing-image": {
          transform: "scale(1.05)",
        },
      }}
    >
      <Box height={180} overflow="hidden">
        <Box
          component="img"
          className="listing-image"
          src={`${BACKEND_URL}${listing.imageUrls?.[0]}`}
          alt={listing.title}
          width="100%"
          height="100%"
          sx={{
            objectFit: "cover",
            transition: "transform 0.4s ease",
          }}
        />
      </Box>

      <Stack spacing={1.75} p={2}>
        <Stack spacing={0.5}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Box minWidth={0} mr={1}>
              <Typography fontSize={17} fontWeight={600} noWrap>
                {listing.brand} {listing.model}
              </Typography>
            </Box>

            <Typography
              fontSize={19}
              color="primary.dark"
              fontWeight={800}
              flexShrink={0}
            >
              {formatPricePLN(listing.price)}
            </Typography>
          </Box>

          <Typography variant="caption" color="text.secondary" noWrap>
            {listing.title}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          <Chip
            label={isUsed ? "Używane" : "Nowe"}
            size="small"
            sx={{
              fontWeight: 600,
              borderRadius: 1.5,
              bgcolor: isUsed ? "grey.200" : "primary.light",
              color: isUsed ? "text.primary" : "primary.dark",
            }}
          />

          <Chip
            label={listing.year}
            size="small"
            sx={{
              fontWeight: 600,
              borderRadius: 1.5,
              bgcolor: "year.light",
              color: "year.dark",
            }}
          />

          <Chip
            label={listing.city}
            size="small"
            sx={{
              fontWeight: 600,
              borderRadius: 1.5,
              bgcolor: "city.light",
              color: "city.dark",
            }}
          />
        </Stack>

        <Divider />

        <Box display="flex" justifyContent="space-between">
          <Stack spacing={1}>
            <Box>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  Przebieg
                </Typography>
                <SpeedIcon fontSize="6px" sx={{ color: "text.secondary" }} />
              </Stack>

              <Typography variant="body2" fontWeight={600}>
                {listing.mileage?.toLocaleString("pl-PL")} km
              </Typography>
            </Box>

            <Box>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  Napęd
                </Typography>
                <SettingsIcon fontSize="6px" sx={{ color: "text.secondary" }} />
              </Stack>

              <Typography variant="body2" fontWeight={600}>
                {listing.driveType}
              </Typography>
            </Box>
          </Stack>

          <Stack spacing={1} textAlign="right">
            <Box>
              <Stack
                direction="row"
                spacing={0.5}
                alignItems="center"
                justifyContent="flex-end"
              >
                <BatteryChargingFullIcon
                  fontSize="6px"
                  sx={{ color: "text.secondary" }}
                />
                <Typography variant="body2" color="text.secondary">
                  Zasięg
                </Typography>
              </Stack>

              <Typography variant="body2" fontWeight={600}>
                {listing.rangeKm} km
              </Typography>
            </Box>

            <Box>
              <Stack
                direction="row"
                spacing={0.5}
                alignItems="center"
                justifyContent="flex-end"
              >
                <BoltIcon fontSize="6px" sx={{ color: "text.secondary" }} />
                <Typography variant="body2" color="text.secondary">
                  Moc
                </Typography>
              </Stack>

              <Typography variant="body2" fontWeight={600}>
                {listing.powerHP} KM
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default ListingCard;
