import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CenteredContent } from "../CenteredContent/CenteredContent";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Drawer,
  Divider,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { BACKEND_URL } from "../../constants/api";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { AddButton } from "./AddButton/AddButton";
import { AdminNavbar } from "../../admin/components/AdminNavbar";
import { isAdmin } from "../../auth/auth";

const navLinkSx = {
  px: 2,
  py: 1,
  borderRadius: 2,
  color: "text.secondary",
  textDecoration: "none",
  transition: "all .2s",
  "&:hover": {
    bgcolor: "grey.100",
    color: "text.primary",
  },
  "&.active": {
    color: "primary.main",
  },
};

const mobileLinkSx = {
  px: 2,
  py: 1.5,
  borderRadius: 2,
  color: "text.secondary",
  textDecoration: "none",
  transition: "all .2s",
  "&:hover": {
    bgcolor: "grey.100",
    color: "text.primary",
  },
  "&.active": {
    color: "primary.main",
  },
};

export const Navbar = () => {
  const { userData } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoImage = `${BACKEND_URL}/img/ui/logo/logo-white-mode.svg`;

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <Box width="100%" bgcolor="background.paper">
      {userData && isAdmin(userData) && <AdminNavbar />}
      <CenteredContent>
        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr auto", md: "auto 1fr auto" }}
          alignItems="center"
          height={64}
          columnGap={4}
        >
          <Box component={NavLink} to="/" display="flex" alignItems="center">
            <Box
              component="img"
              src={logoImage}
              alt="logo"
              height={{ xs: 36, sm: 42 }}
            />
          </Box>

          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            alignItems="center"
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            <Box component={NavLink} to="/listings" sx={navLinkSx}>
              <Typography fontSize={14} fontWeight={500}>
                Ogłoszenia
              </Typography>
            </Box>

            <Box component={NavLink} to="/about" sx={navLinkSx}>
              <Typography fontSize={14} fontWeight={500}>
                O nas
              </Typography>
            </Box>

            <Box component={NavLink} to="/contact" sx={navLinkSx}>
              <Typography fontSize={14} fontWeight={500}>
                Kontakt
              </Typography>
            </Box>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            spacing={1.5}
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            {!userData && (
              <>
                <Stack
                  component={NavLink}
                  to="/register"
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={navLinkSx}
                >
                  <PersonAddAlt1Icon fontSize="small" />
                  <Typography fontSize={14} fontWeight={500}>
                    Rejestracja
                  </Typography>
                </Stack>

                <Stack
                  component={NavLink}
                  to="/login"
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  px={2}
                  py={1}
                  borderRadius={2}
                  bgcolor="primary.main"
                  color="primary.contrastText"
                  sx={{
                    transition: "all .2s",
                    textDecoration: "none",
                    "&:hover": {
                      bgcolor: "primary.dark",
                    },
                  }}
                >
                  <LoginIcon fontSize="small" />
                  <Typography
                    fontSize={14}
                    fontWeight={600}
                    color="primary.contrastText"
                  >
                    Zaloguj
                  </Typography>
                </Stack>
              </>
            )}

            <AddButton />

            {userData && (
              <>
                <Stack
                  component={NavLink}
                  to={`/profile/${userData._id}`}
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={navLinkSx}
                >
                  <AccountCircleIcon color="action" />
                  <Typography fontSize={14} fontWeight={500}>
                    Moje konto
                  </Typography>
                </Stack>

                <Stack
                  component={NavLink}
                  to="/logout"
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={navLinkSx}
                >
                  <LogoutIcon color="action" />
                  <Typography fontSize={14} fontWeight={500}>
                    Wyloguj
                  </Typography>
                </Stack>
              </>
            )}
          </Stack>

          <IconButton
            onClick={() => setIsMenuOpen(true)}
            sx={{
              display: { xs: "flex", md: "none" },
              justifySelf: "end",
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </CenteredContent>

      <Drawer
        anchor="right"
        open={isMenuOpen}
        onClose={closeMenu}
        PaperProps={{
          sx: {
            width: 300,
            p: 2,
            borderRadius: 0,
          },
        }}
      >
        <Stack spacing={1}>
          <Box mb={1}>
            <Box component="img" src={logoImage} alt="logo" height={38} />
          </Box>

          <Divider />

          <Box
            component={NavLink}
            to="/listings"
            onClick={closeMenu}
            sx={mobileLinkSx}
          >
            <Typography fontSize={15} fontWeight={500}>
              Ogłoszenia
            </Typography>
          </Box>

          <Box
            component={NavLink}
            to="/about"
            onClick={closeMenu}
            sx={mobileLinkSx}
          >
            <Typography fontSize={15} fontWeight={500}>
              O nas
            </Typography>
          </Box>

          <Box
            component={NavLink}
            to="/contact"
            onClick={closeMenu}
            sx={mobileLinkSx}
          >
            <Typography fontSize={15} fontWeight={500}>
              Kontakt
            </Typography>
          </Box>

          <Divider sx={{ my: 1 }} />

          {!userData && (
            <>
              <Stack
                component={NavLink}
                to="/register"
                onClick={closeMenu}
                direction="row"
                alignItems="center"
                spacing={1}
                sx={mobileLinkSx}
              >
                <PersonAddAlt1Icon fontSize="small" />
                <Typography fontSize={15} fontWeight={500}>
                  Rejestracja
                </Typography>
              </Stack>

              <Stack
                component={NavLink}
                to="/login"
                onClick={closeMenu}
                direction="row"
                alignItems="center"
                spacing={1}
                px={2}
                py={1}
                borderRadius={2}
                bgcolor="primary.main"
                color="primary.contrastText"
                sx={{
                  width: "fit-content",
                  alignSelf: "flex-start",
                  textDecoration: "none",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                }}
              >
                <LoginIcon fontSize="small" />
                <Typography
                  fontSize={15}
                  fontWeight={600}
                  color="primary.contrastText"
                >
                  Zaloguj
                </Typography>
              </Stack>
            </>
          )}

          <Box onClick={closeMenu}>
            <AddButton />
          </Box>

          {userData && (
            <>
              <Stack
                component={NavLink}
                to={`/profile/${userData._id}`}
                onClick={closeMenu}
                direction="row"
                alignItems="center"
                spacing={1}
                sx={mobileLinkSx}
              >
                <AccountCircleIcon color="action" />
                <Typography fontSize={15} fontWeight={500}>
                  Moje konto
                </Typography>
              </Stack>

              <Stack
                component={NavLink}
                to="/logout"
                onClick={closeMenu}
                direction="row"
                alignItems="center"
                spacing={1}
                sx={mobileLinkSx}
              >
                <LogoutIcon color="action" />
                <Typography fontSize={15} fontWeight={500}>
                  Wyloguj
                </Typography>
              </Stack>
            </>
          )}
        </Stack>
      </Drawer>
    </Box>
  );
};
