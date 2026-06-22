import { useState } from "react";
import { Box, Avatar, Typography, Stack, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { BACKEND_URL } from "../../constants/api";
import PhoneIcon from "@mui/icons-material/Phone";
import { getSellerLabel } from "../../utils/getSellerLabel";
import { formatPhone } from "../../utils/formatPhone";

export const SellerMiniCard = ({ user, sellerType }) => {
  const [showPhone, setShowPhone] = useState(false);

  if (!user) return null;

  const handlePhoneClick = () => {
    if (!showPhone) {
      setShowPhone(true);
    } else {
      window.location.href = `tel:${user.telephone}`;
    }
  };

  return (
    <Box>
      <Typography fontWeight={700} mb={2}>
        Sprzedawca
      </Typography>

      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          component={NavLink}
          to={`/profile/${user._id}`}
          src={user?.avatar ? `${BACKEND_URL}${user.avatar}` : undefined}
          sx={{
            width: 48,
            height: 48,
            border: "2px solid",
            borderColor: "grey.200",
            transition: "transform .2s",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        />

        <Box>
          <Typography
            component={NavLink}
            to={`/profile/${user._id}`}
            sx={{
              fontWeight: 600,
              textDecoration: "none",
              color: "text.primary",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            {user?.companyName || user?.username}
          </Typography>

          <Typography fontSize={13} color="text.secondary">
            {getSellerLabel(sellerType)}
          </Typography>
        </Box>
      </Stack>

      {user?.telephone && (
        <Button
          fullWidth
          variant="contained"
          startIcon={<PhoneIcon />}
          onClick={handlePhoneClick}
          sx={{
            letterSpacing: 1,
            mt: 3,
            height: 48,
            fontWeight: 600,
            transition: "all .25s ease",
            "&:hover": {
              bgcolor: "primary.dark",
            },
            "&:active": {
              transform: "scale(0.98)",
            },
          }}
        >
          {showPhone ? formatPhone(user.telephone) : "Zadzwoń"}
        </Button>
      )}

      {!showPhone && user?.telephone && (
        <Typography
          fontSize={12}
          color="text.secondary"
          textAlign="center"
          mt={1}
        >
          Kliknij aby zobaczyć numer
        </Typography>
      )}

      <Typography
        component={NavLink}
        to={`/profile/${user._id}`}
        sx={{
          display: "block",
          mt: 2,
          fontSize: 13,
          color: "primary.main",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
        }}
      >
        Zobacz wszystkie ogłoszenia sprzedawcy
      </Typography>
    </Box>
  );
};
