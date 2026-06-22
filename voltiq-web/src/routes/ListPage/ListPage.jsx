import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BACKEND_URL } from "../../constants/api";
import { ListingItem } from "../../components/ListingItem/ListingItem";
import { CenteredContent } from "../../components/CenteredContent/CenteredContent";
import { Box, Pagination, Stack, Typography } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { ContentBox } from "../../components/ContentBox/ContentBox";

export const ListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [values, setValues] = useState({
    listings: [],
    page: parseInt(searchParams.get("page")) || 1,
    limit: 20,
    totalCount: 0,
  });

  const setPage = (pageNumber) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      page: pageNumber,
    });

    setValues({ ...values, page: pageNumber });
  };

  useEffect(() => {
    const fetchListings = async () => {
      const response = await fetch(
        `${BACKEND_URL}/api/v1/listings/search?${searchParams.toString()}&limit=${values.limit}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch listings");
      }

      const data = await response.json();

      setValues((prev) => ({
        ...prev,
        listings: data.listings,
        totalCount: data.totalCount,
      }));
    };

    fetchListings();
  }, [searchParams, values.limit]);

  const isEmpty = values.listings.length === 0;

  return (
    <>
      <CenteredContent>
        <ContentBox isSection>
          <SearchBar key={searchParams.toString()} setPage={setPage} />
        </ContentBox>
        <Box width="100%" py={6}>
          {isEmpty ? (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              py={10}
              px={2}
            >
              <SearchOffIcon sx={{ fontSize: 64, color: "grey.300" }} />

              <Typography fontSize={22} fontWeight={600} mt={2}>
                Nic nie znaleziono
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                maxWidth={480}
                mt={1.5}
              >
                Zmień filtry lub spróbuj innego wyszukiwania.
              </Typography>
            </Box>
          ) : (
            <>
              <Typography variant="h3" fontWeight={700} mb={2}>
                Ogłoszenia ({values.totalCount})
              </Typography>

              <Stack spacing={2}>
                {values.listings.map((listing) => (
                  <ListingItem key={listing._id} listing={listing} />
                ))}
              </Stack>

              <Box
                mt={4}
                display="flex"
                justifyContent={{ xs: "center", md: "flex-end" }}
              >
                <Pagination
                  page={values.page}
                  totalPages={Math.ceil(values.totalCount / values.limit)}
                  onPageChange={setPage}
                />
              </Box>
            </>
          )}
        </Box>
      </CenteredContent>
    </>
  );
};
