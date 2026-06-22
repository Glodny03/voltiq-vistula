import { Box, Typography, Chip, Stack, Divider } from "@mui/material";
import { formatPricePLN } from "../../utils/formatPrice";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SpeedIcon from "@mui/icons-material/Speed";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { SellerMiniCard } from "../../components/SellerMiniCard/SellerMiniCard";
import { getSellerLabel } from "../../utils/getSellerLabel";

const chipBase = {
  fontWeight: 600,
  borderRadius: 1.5,
  "& .MuiChip-icon": {
    color: "inherit",
    marginRight: "2px",
  },
};

export const ListingSidebar = ({ listing }) => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: 2,
        width: {
          xs: "100%",
          md: 360,
        },
        p: {
          xs: 2,
          sm: 2.5,
          md: 3,
        },
        height: "fit-content",
      }}
    >
      <Typography
        fontWeight={800}
        color="primary.dark"
        mb={{ xs: 1.5, md: 2 }}
        fontSize={{ xs: 28, sm: 30, md: 34 }}
      >
        {formatPricePLN(listing.price)}
      </Typography>

      <Typography fontWeight={700} mb={1} fontSize={{ xs: 18, sm: 20, md: 22 }}>
        {listing.brand} {listing.model}
      </Typography>

      <Typography color="text.secondary" mb={{ xs: 2, md: 2 }}>
        {listing.city}
        {listing.voivodeship && `, ${listing.voivodeship}`}
      </Typography>

      <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
        rowGap={1}
        mb={{ xs: 2, md: 3 }}
      >
        <Chip
          icon={<CalendarTodayIcon fontSize="small" />}
          label={listing.year}
          size="small"
          sx={{
            ...chipBase,
            bgcolor: "year.light",
            color: "year.dark",
          }}
        />

        <Chip
          icon={<SpeedIcon fontSize="small" />}
          label={`${listing.mileage?.toLocaleString("pl-PL")} km`}
          size="small"
          sx={{
            ...chipBase,
            bgcolor: "grey.200",
            color: "text.primary",
          }}
        />

        <Chip
          icon={<LocationOnIcon fontSize="small" />}
          label={listing.city}
          size="small"
          sx={{
            ...chipBase,
            bgcolor: "city.light",
            color: "city.dark",
          }}
        />
      </Stack>

      <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
        rowGap={1}
        mb={{ xs: 2, md: 3 }}
      >
        <Chip
          label={getSellerLabel(listing.sellerType)}
          size="small"
          sx={{
            ...chipBase,
            bgcolor: "seller.light",
            color: "seller.dark",
          }}
        />

        {listing.vatInvoice && (
          <Chip
            label="Faktura VAT"
            size="small"
            sx={{
              ...chipBase,
              bgcolor: "primary.light",
              color: "primary.dark",
            }}
          />
        )}

        {listing.accidentFree && (
          <Chip
            label="Bezwypadkowy"
            size="small"
            sx={{
              ...chipBase,
              bgcolor: "condition.light",
              color: "condition.dark",
            }}
          />
        )}
      </Stack>

      <Divider
        sx={{
          borderColor: "grey.100",
          mb: { xs: 2, md: 3 },
        }}
      />

      <SellerMiniCard user={listing.userRef} sellerType={listing.sellerType} />
    </Box>
  );
};
