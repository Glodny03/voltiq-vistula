import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  Alert,
  Divider,
} from "@mui/material";
import { register } from "../../auth/auth";
import { CenteredContent } from "../../components/CenteredContent/CenteredContent";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

export const Register = () => {
  const [values, setValues] = useState({
    username: "",
    firstName: "",
    lastName: "",
    telephone: "",
    password: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setErrors({});
    setSuccess(false);

    try {
      const data = await register(values);

      if (data.errors) {
        setErrors(data.errors);
      } else {
        setSuccess(true);

        setValues({
          username: "",
          firstName: "",
          lastName: "",
          telephone: "",
          password: "",
          email: "",
        });

        navigate("/login");
      }
    } catch (error) {
      console.error("Błąd rejestracji:", error);
      setErrors({
        general: "Wystąpił błąd podczas rejestracji. Spróbuj ponownie później.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CenteredContent>
      <Box
        sx={{
          py: { xs: 4, sm: 6, md: 10 },
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 4, md: 12 }}
          alignItems="center"
          justifyContent="center"
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: 760,
              bgcolor: "background.paper",
              borderRadius: 2,
              px: { xs: 2.5, sm: 3.5 },
              py: { xs: 3, sm: 4 },
            }}
          >
            <Stack spacing={3}>
              <Typography
                variant="h3"
                textAlign="center"
                fontWeight={700}
                sx={{
                  fontSize: {
                    xs: "1.75rem",
                    sm: "1.8rem",
                    md: "2rem",
                  },
                }}
              >
                Rejestracja
              </Typography>

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Stack spacing={{ xs: 2, sm: 2.5 }}>
                  <Box display="flex" flexWrap="wrap" gap={2}>
                    <Box sx={{ minWidth: 240, flex: "1 1 240px" }}>
                      <TextField
                        label="Nazwa użytkownika"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        error={!!errors.username}
                        helperText={errors.username}
                        fullWidth
                      />
                    </Box>

                    <Box sx={{ minWidth: 240, flex: "1 1 240px" }}>
                      <TextField
                        label="Adres e-mail"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        fullWidth
                      />
                    </Box>
                  </Box>

                  <Box display="flex" flexWrap="wrap" gap={2}>
                    <Box sx={{ minWidth: 240, flex: "1 1 240px" }}>
                      <TextField
                        label="Imię"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                        fullWidth
                      />
                    </Box>

                    <Box sx={{ minWidth: 240, flex: "1 1 240px" }}>
                      <TextField
                        label="Nazwisko"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                        fullWidth
                      />
                    </Box>
                  </Box>

                  <Box display="flex" flexWrap="wrap" gap={2}>
                    <Box sx={{ minWidth: 240, flex: "1 1 240px" }}>
                      <TextField
                        label="Telefon"
                        name="telephone"
                        value={values.telephone}
                        onChange={handleChange}
                        error={!!errors.telephone}
                        helperText={errors.telephone}
                        fullWidth
                      />
                    </Box>

                    <Box sx={{ minWidth: 240, flex: "1 1 240px" }}>
                      <TextField
                        label="Hasło"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={values.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword((prev) => !prev)}
                                edge="end"
                                sx={{ color: "text.secondary" }}
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                  </Box>

                  {errors.general && (
                    <Alert
                      sx={{
                        boxShadow: "none",
                      }}
                      severity="error"
                    >
                      {errors.general}
                    </Alert>
                  )}

                  {success && (
                    <Alert
                      sx={{
                        boxShadow: "none",
                      }}
                      severity="success"
                    >
                      Rejestracja zakończona sukcesem!
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isLoading}
                    sx={{
                      mt: 1,
                      py: 1.4,
                    }}
                  >
                    {isLoading ? "Rejestrowanie..." : "Zarejestruj"}
                  </Button>

                  <Typography
                    variant="caption"
                    textAlign="center"
                    sx={{
                      mt: 1,
                      px: 1,
                      lineHeight: 1.5,
                      color: "text.secondary",
                    }}
                  >
                    Rejestrując się, zgadzasz się z{" "}
                    <Typography
                      component={NavLink}
                      to="/regulations"
                      sx={{
                        fontSize: "inherit",
                        color: "primary.main",
                        textDecoration: "none",
                        fontWeight: 500,
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      regulaminem Voltiq.pl
                    </Typography>
                    .
                  </Typography>

                  <Divider />

                  <Typography
                    textAlign="center"
                    fontSize={14}
                    color="text.secondary"
                  >
                    Masz już konto?{" "}
                    <Typography
                      component={NavLink}
                      to="/login"
                      sx={{
                        fontSize: "inherit",
                        color: "primary.main",
                        fontWeight: 500,
                        textDecoration: "none",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Zaloguj się
                    </Typography>
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </CenteredContent>
  );
};
