import { useContext, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { addListingAction } from "../../api/listingActions";
import { CenteredContent } from "../../components/CenteredContent/CenteredContent";
import { ContentBox } from "../../components/ContentBox/ContentBox";
import { AuthContext } from "../../context/AuthContext";
import {
  BACKEND_URL,
  BATTERY_TYPE_OPTIONS,
  BODY_TYPE_OPTIONS,
  BRAND_OPTIONS,
  DRIVE_TYPE_OPTIONS,
  SELLER_TYPE_OPTIONS,
  VOIVODESHIP_OPTIONS,
  YEAR_OPTIONS,
} from "../../constants/api";
import cities from "../../data/cities.json";

export const AddListing = () => {
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();
  const heroImgUrl = `${BACKEND_URL}/img/ui/hero/hero4.jpg`;

  const [values, setValues] = useState({
    title: "",
    description: "",
    price: "",
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    mileage: "",
    city: "",
    voivodeship: "",
    bodyType: "",
    transmission: "automatic",
    driveType: "",
    powerHP: "",
    batteryCapacityKWh: "",
    batteryType: "",
    rangeKm: "",
    chargingPowerDC: "",
    sellerType: "private",
    status: "active",
    isBatteryOwned: true,
    accidentFree: true,
    serviceHistory: false,
    vatInvoice: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);

  const normalize = (str) => str?.toLowerCase().trim() || "";

  const filteredCities = cities
    .filter((c) => normalize(c.Province) === normalize(values.voivodeship))
    .sort((a, b) => a.Name.localeCompare(b.Name, "pl"));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "voivodeship" ? { city: "" } : {}),
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      ...(name === "voivodeship" ? { city: "" } : {}),
    }));
  };

  const handleDescriptionChange = (value) => {
    setValues((prev) => ({
      ...prev,
      description: value,
    }));

    setErrors((prev) => ({
      ...prev,
      description: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setErrors({});

    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      formData.set(key, values[key]);
    });

    formData.set("userRef", userData._id);

    Array.from(images).forEach((image) => {
      formData.append("images", image);
    });

    try {
      const data = await addListingAction(formData);

      if (data.errors) {
        setErrors(data.errors);
      } else {
        navigate(`/listing/${data._id}`);
      }
    } catch (error) {
      console.error("Błąd podczas dodawania oferty:", error);

      setErrors({
        general:
          "Wystąpił błąd podczas dodawania oferty. Spróbuj ponownie później.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CenteredContent>
      <Box py={{ xs: 6, md: 7 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 4, md: 8 }}
          alignItems="center"
        >
          <Box flex={0.8}>
            <Typography variant="h4" color="primary.main" gutterBottom>
              Sprzedaj auto z Voltiq
            </Typography>

            <Typography variant="h1" mb={2}>
              Dodaj ogłoszenie EV
            </Typography>

            <Typography variant="h4" color="text.secondary" mb={3}>
              Szybko prosto wygodnie
            </Typography>

            <Typography variant="body1" color="text.secondary" maxWidth={500}>
              Wystaw swój samochód elektryczny i pokaż kupującym wszystkie
              najważniejsze informacje: zasięg, baterię, moc, historię oraz
              zdjęcia pojazdu.
            </Typography>
          </Box>

          <Box flex={1.2} width="100%">
            <Box
              component="img"
              src={heroImgUrl}
              alt="Sell electric car"
              width="100%"
              height={{ xs: 250, md: 400 }}
              border={1}
              borderColor="grey.200"
              borderRadius={2}
              sx={{ objectFit: "cover" }}
            />
          </Box>
        </Stack>
      </Box>

      <Divider
        sx={{
          borderColor: "grey.300",
          opacity: 0.7,
        }}
      />

      <ContentBox>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={4}>
            <Box>
              <Typography fontWeight={700} fontSize={20} mb={2}>
                Podstawowe informacje
              </Typography>

              <Stack spacing={2.5}>
                <TextField
                  label="Tytuł"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  error={!!errors.title}
                  helperText={errors.title}
                  fullWidth
                />

                <Box>
                  <Typography variant="caption" mb={1} display="block">
                    Opis
                  </Typography>

                  <ReactQuill
                    value={values.description}
                    onChange={handleDescriptionChange}
                  />

                  {errors.description && (
                    <Typography color="error" fontSize={12} mt={1}>
                      {errors.description}
                    </Typography>
                  )}
                </Box>

                <TextField
                  label="Cena"
                  name="price"
                  type="number"
                  value={values.price}
                  onChange={handleChange}
                  error={!!errors.price}
                  helperText={errors.price}
                  fullWidth
                />
              </Stack>
            </Box>

            <Box>
              <Typography fontWeight={700} fontSize={20} mb={2}>
                Samochód
              </Typography>

              <Box display="flex" flexWrap="wrap" gap={2}>
                <Box sx={{ minWidth: 220, flex: "1 1 220px" }}>
                  <TextField
                    select
                    label="Marka"
                    name="brand"
                    value={values.brand}
                    onChange={handleChange}
                    error={!!errors.brand}
                    helperText={errors.brand}
                    fullWidth
                  >
                    <MenuItem value="">Wybierz markę</MenuItem>
                    {BRAND_OPTIONS.map((brand) => (
                      <MenuItem key={brand} value={brand}>
                        {brand}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>

                <Box sx={{ minWidth: 220, flex: "1 1 220px" }}>
                  <TextField
                    label="Model"
                    name="model"
                    value={values.model}
                    onChange={handleChange}
                    error={!!errors.model}
                    helperText={errors.model}
                    fullWidth
                  />
                </Box>

                <Box sx={{ minWidth: 180, flex: "1 1 180px" }}>
                  <TextField
                    select
                    label="Rok produkcji"
                    name="year"
                    value={values.year}
                    onChange={handleChange}
                    error={!!errors.year}
                    helperText={errors.year}
                    fullWidth
                  >
                    {YEAR_OPTIONS.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>

                <Box sx={{ minWidth: 220, flex: "1 1 220px" }}>
                  <TextField
                    label="Przebieg"
                    name="mileage"
                    type="number"
                    value={values.mileage}
                    onChange={handleChange}
                    error={!!errors.mileage}
                    helperText={errors.mileage}
                    fullWidth
                  />
                </Box>

                <Box sx={{ minWidth: 220, flex: "1 1 220px" }}>
                  <TextField
                    select
                    label="Typ nadwozia"
                    name="bodyType"
                    value={values.bodyType}
                    onChange={handleChange}
                    error={!!errors.bodyType}
                    helperText={errors.bodyType}
                    fullWidth
                  >
                    <MenuItem value="">Wybierz typ nadwozia</MenuItem>
                    {BODY_TYPE_OPTIONS.map((bodyType) => (
                      <MenuItem key={bodyType} value={bodyType}>
                        {bodyType}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>

                <Box sx={{ minWidth: 220, flex: "1 1 220px" }}>
                  <TextField
                    select
                    label="Skrzynia biegów"
                    name="transmission"
                    value={values.transmission}
                    onChange={handleChange}
                    error={!!errors.transmission}
                    helperText={errors.transmission}
                    fullWidth
                  >
                    <MenuItem value="automatic">Automatyczna</MenuItem>
                  </TextField>
                </Box>

                <Box sx={{ minWidth: 220, flex: "1 1 220px" }}>
                  <TextField
                    select
                    label="Napęd"
                    name="driveType"
                    value={values.driveType}
                    onChange={handleChange}
                    error={!!errors.driveType}
                    helperText={errors.driveType}
                    fullWidth
                  >
                    <MenuItem value="">Wybierz napęd</MenuItem>
                    {DRIVE_TYPE_OPTIONS.map((driveType) => (
                      <MenuItem key={driveType} value={driveType}>
                        {driveType}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Box>
            </Box>

            <Box>
              <Typography fontWeight={700} fontSize={20} mb={2}>
                Parametry elektryczne
              </Typography>

              <Box display="flex" flexWrap="wrap" gap={2}>
                <Box sx={{ minWidth: 220, flex: "1 1 220px" }}>
                  <TextField
                    label="Moc KM"
                    name="powerHP"
                    type="number"
                    value={values.powerHP}
                    onChange={handleChange}
                    error={!!errors.powerHP}
                    helperText={errors.powerHP}
                    fullWidth
                  />
                </Box>

                <Box sx={{ minWidth: 220, flex: "1 1 220px" }}>
                  <TextField
                    label="Pojemność baterii kWh"
                    name="batteryCapacityKWh"
                    type="number"
                    value={values.batteryCapacityKWh}
                    onChange={handleChange}
                    error={!!errors.batteryCapacityKWh}
                    helperText={errors.batteryCapacityKWh}
                    fullWidth
                  />
                </Box>

                <Box sx={{ minWidth: 220, flex: "1 1 220px" }}>
                  <TextField
                    select
                    label="Typ baterii"
                    name="batteryType"
                    value={values.batteryType}
                    onChange={handleChange}
                    error={!!errors.batteryType}
                    helperText={errors.batteryType}
                    fullWidth
                  >
                    <MenuItem value="">Wybierz typ baterii</MenuItem>
                    {BATTERY_TYPE_OPTIONS.map((batteryType) => (
                      <MenuItem key={batteryType} value={batteryType}>
                        {batteryType}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>

                <Box sx={{ minWidth: 220, flex: "1 1 220px" }}>
                  <TextField
                    label="Zasięg km"
                    name="rangeKm"
                    type="number"
                    value={values.rangeKm}
                    onChange={handleChange}
                    error={!!errors.rangeKm}
                    helperText={errors.rangeKm}
                    fullWidth
                  />
                </Box>

                <Box sx={{ minWidth: 220, flex: "1 1 220px" }}>
                  <TextField
                    label="Maks. ładowanie DC kW"
                    name="chargingPowerDC"
                    type="number"
                    value={values.chargingPowerDC}
                    onChange={handleChange}
                    error={!!errors.chargingPowerDC}
                    helperText={errors.chargingPowerDC}
                    fullWidth
                  />
                </Box>
              </Box>
            </Box>

            <Box>
              <Typography fontWeight={700} fontSize={20} mb={2}>
                Lokalizacja
              </Typography>

              <Box display="flex" flexWrap="wrap" gap={2}>
                <Box sx={{ minWidth: 220, flex: "1 1 220px" }}>
                  <TextField
                    select
                    label="Województwo"
                    name="voivodeship"
                    value={values.voivodeship}
                    onChange={handleChange}
                    error={!!errors.voivodeship}
                    helperText={errors.voivodeship}
                    fullWidth
                  >
                    <MenuItem value="">Wybierz województwo</MenuItem>
                    {VOIVODESHIP_OPTIONS.map((voivodeship) => (
                      <MenuItem key={voivodeship} value={voivodeship}>
                        {voivodeship}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>

                <Box sx={{ minWidth: 260, flex: "2 1 260px" }}>
                  <Autocomplete
                    disabled={!values.voivodeship}
                    options={filteredCities}
                    getOptionLabel={(option) => option.Name}
                    value={
                      filteredCities.find((c) => c.Name === values.city) || null
                    }
                    onChange={(e, newValue) => {
                      setValues((prev) => ({
                        ...prev,
                        city: newValue ? newValue.Name : "",
                      }));

                      setErrors((prev) => ({
                        ...prev,
                        city: "",
                      }));
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={
                          values.voivodeship
                            ? "Miasto"
                            : "Najpierw wybierz województwo"
                        }
                        InputLabelProps={{ shrink: true }}
                        placeholder="Wybierz miasto"
                        error={!!errors.city}
                        helperText={errors.city}
                      />
                    )}
                    fullWidth
                  />
                </Box>
              </Box>
            </Box>

            <Box>
              <Typography fontWeight={700} fontSize={20} mb={2}>
                Informacje handlowe
              </Typography>

              <Box display="flex" flexWrap="wrap" gap={2}>
                <Box sx={{ minWidth: 220, flex: "1 1 220px" }}>
                  <TextField
                    select
                    label="Typ sprzedawcy"
                    name="sellerType"
                    value={values.sellerType}
                    onChange={handleChange}
                    error={!!errors.sellerType}
                    helperText={errors.sellerType}
                    fullWidth
                  >
                    {SELLER_TYPE_OPTIONS.map((sellerType) => (
                      <MenuItem key={sellerType.value} value={sellerType.value}>
                        {sellerType.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Box>

              <Stack direction="row" flexWrap="wrap" gap={2} mt={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="isBatteryOwned"
                      checked={values.isBatteryOwned}
                      onChange={handleChange}
                    />
                  }
                  label="Bateria na własność"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      name="accidentFree"
                      checked={values.accidentFree}
                      onChange={handleChange}
                    />
                  }
                  label="Bezwypadkowy"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      name="serviceHistory"
                      checked={values.serviceHistory}
                      onChange={handleChange}
                    />
                  }
                  label="Historia serwisowa"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      name="vatInvoice"
                      checked={values.vatInvoice}
                      onChange={handleChange}
                    />
                  }
                  label="Faktura VAT"
                />
              </Stack>
            </Box>

            <Box>
              <Typography fontWeight={700} fontSize={20} mb={2}>
                Zdjęcia
              </Typography>

              <Button variant="outlined" component="label">
                Wybierz zdjęcia
                <input
                  type="file"
                  name="images"
                  accept=".jpg,.jpeg,.png"
                  multiple
                  hidden
                  onChange={(e) => setImages(e.target.files)}
                />
              </Button>

              {images.length > 0 && (
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Wybrano zdjęć: {images.length}
                </Typography>
              )}

              {errors.images && (
                <Typography color="error" fontSize={12} mt={1}>
                  {errors.images}
                </Typography>
              )}
            </Box>

            {errors.general && (
              <Alert severity="error" sx={{ boxShadow: "none" }}>
                {errors.general}
              </Alert>
            )}

            <Box display="flex" justifyContent="flex-end">
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isLoading}
                sx={{
                  py: 1.4,
                  px: 4,
                  fontWeight: 600,
                }}
              >
                {isLoading ? "Dodawanie..." : "Dodaj ogłoszenie"}
              </Button>
            </Box>
          </Stack>
        </Box>
      </ContentBox>
    </CenteredContent>
  );
};
