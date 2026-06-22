import { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  Alert,
  Divider,
} from "@mui/material";
import { login } from "../../auth/auth";
import { CenteredContent } from "../../components/CenteredContent/CenteredContent";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { BACKEND_URL } from "../../constants/api";
import { AuthContext } from "../../context/AuthContext";

export const Login = () => {
  const { updateUserData } = useContext(AuthContext);

  const carIllustration = `${BACKEND_URL}/img/ui/register-car.svg`;

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

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

    try {
      const data = await login(values);

      if (data.error) {
        setErrors({ general: data.error });
        return;
      }

      if (data.errors) {
        setErrors(data.errors);
        return;
      }

      updateUserData(data);

      setValues({
        email: "",
        password: "",
      });

      const redirectPath = location.state?.from || "/";
      navigate(redirectPath);
    } catch (error) {
      console.error("Błąd logowania:", error);
      setErrors({
        general: "Wystąpił błąd podczas logowania. Spróbuj ponownie później.",
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
              maxWidth: 420,
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
                Logowanie
              </Typography>

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Stack spacing={{ xs: 2, sm: 2.5 }}>
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
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  {errors.general && (
                    <Alert
                      severity="error"
                      sx={{
                        boxShadow: "none",
                      }}
                    >
                      {errors.general}
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
                    {isLoading ? "Logowanie..." : "Zaloguj"}
                  </Button>

                  <Divider />

                  <Typography
                    textAlign="center"
                    fontSize={14}
                    color="text.secondary"
                  >
                    Nie masz konta?{" "}
                    <Typography
                      component={NavLink}
                      to="/register"
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
                      Zarejestruj się
                    </Typography>
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Box>

          <Stack
            spacing={3}
            alignItems="flex-end"
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            <Box
              component="img"
              src={carIllustration}
              alt="Electric car"
              sx={{
                maxWidth: 400,
              }}
            />

            <Stack spacing={1.5} alignItems="flex-end" maxWidth={320}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  textAlign: "right",
                }}
              >
                <Box component="span" color="primary.main">
                  Nowoczesny sposób
                </Box>{" "}
                na zakup auta EV
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  textAlign: "right",
                  maxWidth: 400,
                }}
              >
                Zaloguj się i korzystaj z nowoczesnych rozwiązań dla
                elektromobilności.
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </CenteredContent>
  );
};
