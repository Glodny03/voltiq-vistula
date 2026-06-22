import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PeopleIcon from "@mui/icons-material/People";
import { AuthContext } from "../../context/AuthContext";
import { isAdmin } from "../../auth/auth";
import { CenteredContent } from "../../components/CenteredContent/CenteredContent";

export const AdminNavbar = () => {
  const { userData } = useContext(AuthContext);

  if (!userData || !isAdmin(userData)) {
    return null;
  }

  return (
    <AppBar
      component="nav"
      position="static"
      color="secondary"
      elevation={0}
      sx={{
        py: 1,
        px: 0,
        borderRadius: 0,
      }}
    >
      <CenteredContent>
        <Toolbar disableGutters variant="dense">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Stack direction="row" alignItems="center" spacing={1.25}>
              <AdminPanelSettingsIcon fontSize="medium" color="inherit" />

              <Box>
                <Typography
                  fontSize={14}
                  fontWeight={600}
                  color="primary.contrastText"
                  lineHeight={1.1}
                >
                  Panel administratora
                </Typography>
              </Box>
            </Stack>

            <Box>
              <Button
                component={NavLink}
                to="/admin/users"
                size="small"
                variant="text"
                startIcon={<PeopleIcon fontSize="small" />}
                sx={{
                  px: 2,
                  color: "grey.300",
                  borderRadius: 1.5,
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "grey.800",
                    color: "primary.contrastText",
                  },
                  "&.active": {
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                  },
                }}
              >
                Użytkownicy
              </Button>
            </Box>
          </Stack>
        </Toolbar>
      </CenteredContent>
    </AppBar>
  );
};
