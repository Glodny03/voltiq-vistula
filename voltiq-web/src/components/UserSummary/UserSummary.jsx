import { NavLink } from "react-router-dom";
import { BACKEND_URL } from "../../constants/api";
import {
  Box,
  Avatar,
  Typography,
  Stack,
  Chip,
  Divider,
  Button,
} from "@mui/material";
import { formatPhone } from "../../utils/formatPhone";

export const UserSummary = ({ user, userData, showUserEdit = false }) => {
  const isOwner = userData && userData._id === user._id;
  const listingsCount = user.listings?.length || 0;

  const joinDate = new Date(user.createdAt).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
  });

  return (
    <Box width="100%">
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={3}
        alignItems={{ xs: "flex-start", sm: "center" }}
      >
        <Avatar
          src={`${BACKEND_URL}${user.avatar}`}
          alt="Avatar"
          sx={{
            width: 96,
            height: 96,
            border: "2px solid",
            borderColor: "grey.200",
          }}
        />

        <Box flex={1}>
          <Typography fontWeight={700} fontSize={26}>
            {user.username}
          </Typography>

          <Typography color="text.secondary" mb={1}>
            Użytkownik
          </Typography>

          <Stack direction="row" spacing={1}>
            <Chip
              label={`Liczba ogłoszeń: ${listingsCount}`}
              size="small"
              sx={{
                fontWeight: 600,
                borderRadius: 1.5,
                bgcolor: "primary.light",
                color: "primary.dark",
              }}
            />

            <Chip
              label={`Data rejestracji: ${joinDate}`}
              size="small"
              sx={{
                fontWeight: 600,
                borderRadius: 1.5,
                bgcolor: "grey.200",
                color: "text.primary",
              }}
            />
          </Stack>
        </Box>

        {showUserEdit && isOwner && (
          <Button
            variant="outlined"
            component={NavLink}
            to={`/profile/edit/${user._id}`}
          >
            Edytuj profil
          </Button>
        )}
      </Stack>

      <Divider sx={{ my: 4 }} />

      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
        gap={4}
      >
        {user.email && (
          <Box>
            <Typography variant="caption" color="text.secondary">
              E-mail
            </Typography>

            <Typography fontWeight={500}>{user.email}</Typography>
          </Box>
        )}

        {user.telephone && (
          <Box>
            <Typography variant="caption" color="text.secondary">
              Telefon
            </Typography>

            <Typography fontWeight={500}>
              {formatPhone(user.telephone)}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
