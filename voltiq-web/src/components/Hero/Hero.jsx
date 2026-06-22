import { Box } from "@mui/material";
import { BACKEND_URL } from "../../constants/api";
import { SearchBar } from "../SearchBar/SearchBar";
import { CenteredContent } from "../CenteredContent/CenteredContent";

export const Hero = () => {
  const heroImgUrl = `${BACKEND_URL}/img/ui/hero/hero3.png`;
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      minHeight={400}
      sx={{
        backgroundImage: `url(${heroImgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <CenteredContent>
        <Box my={2} p={4} py={5} bgcolor="background.paper" borderRadius={2}>
          <SearchBar homepage={true} />
        </Box>
      </CenteredContent>
    </Box>
  );
};
