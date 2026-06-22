import { useLoaderData } from "react-router-dom";
import { CenteredContent } from "../../components/CenteredContent/CenteredContent";
import { ContentBox } from "../../components/ContentBox/ContentBox";
import { UserSummary } from "../../components/UserSummary/UserSummary";
import { ListingItem } from "../../components/ListingItem/ListingItem";
import { Box, Typography } from "@mui/material";

export const User = () => {
  const user = useLoaderData();

  return (
    <CenteredContent>
      <ContentBox isSection>
        <UserSummary user={user} />
      </ContentBox>

      <Box mt={4} mb={6}>
        <Typography variant="h5" fontWeight={700}>
          Ogłoszenia
        </Typography>

        {user.listings && user.listings.length > 0 ? (
          <Box display="flex" flexDirection="column" gap={2}>
            {user.listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} user={user} />
            ))}
          </Box>
        ) : (
          <Typography color="text.secondary">
            Ten użytkownik nie posiada jeszcze ogłoszeń.
          </Typography>
        )}
      </Box>
    </CenteredContent>
  );
};
