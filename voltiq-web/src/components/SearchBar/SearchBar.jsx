import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Autocomplete,
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  BATTERY_TYPE_OPTIONS,
  BODY_TYPE_OPTIONS,
  BRAND_OPTIONS,
  DRIVE_TYPE_OPTIONS,
  SELLER_TYPE_OPTIONS,
  VOIVODESHIP_OPTIONS,
  YEAR_OPTIONS,
} from "../../constants/api";
import cities from "../../data/cities.json";
import { normalizeRange } from "../../utils/formatRange";

export const SearchBar = ({ setPage, homepage = false }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const INITIAL_QUERY = {
    brand: "",
    model: "",
    city: "",
    voivodeship: "",
    minPrice: "",
    maxPrice: "",
    minYear: "",
    maxYear: "",
    minRange: "",
    maxRange: "",
    minPower: "",
    maxPower: "",
    bodyType: "",
    driveType: "",
    sellerType: "",
    batteryType: "",
  };

  const [showAdvanced, setShowAdvanced] = useState(false);

  const [query, setQuery] = useState({
    brand: searchParams.get("brand") || "",
    model: searchParams.get("model") || "",
    city: searchParams.get("city") || "",
    voivodeship: searchParams.get("voivodeship") || "",

    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",

    minYear: searchParams.get("minYear") || "",
    maxYear: searchParams.get("maxYear") || "",

    minRange: searchParams.get("minRange") || "",
    maxRange: searchParams.get("maxRange") || "",

    minPower: searchParams.get("minPower") || "",
    maxPower: searchParams.get("maxPower") || "",

    bodyType: searchParams.get("bodyType") || "",
    driveType: searchParams.get("driveType") || "",
    sellerType: searchParams.get("sellerType") || "",
    batteryType: searchParams.get("batteryType") || "",
  });

  const normalize = (str) => str?.toLowerCase().trim() || "";

  const filteredCities = cities
    .filter((c) => normalize(c.Province) === normalize(query.voivodeship))
    .sort((a, b) => a.Name.localeCompare(b.Name, "pl"));

  const handleChange = (e) => {
    const { name, value } = e.target;

    setQuery((prev) => {
      let updated = {
        ...prev,
        [name]: value,
      };

      const ranges = [
        ["minPrice", "maxPrice"],
        ["minYear", "maxYear"],
        ["minRange", "maxRange"],
        ["minPower", "maxPower"],
      ];

      ranges.forEach(([minKey, maxKey]) => {
        if (name === minKey || name === maxKey) {
          const { min, max } = normalizeRange(updated[minKey], updated[maxKey]);

          updated[minKey] = min;
          updated[maxKey] = max;
        }
      });

      return updated;
    });
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;

    const numeric = value.replace(/\D/g, "");

    setQuery((prev) => ({
      ...prev,
      [name]: numeric,
    }));
  };

  const handleRangeBlur = (minKey, maxKey) => {
    const { min, max } = normalizeRange(query[minKey], query[maxKey]);

    if (min === query[minKey] && max === query[maxKey]) return;

    setQuery((prev) => ({
      ...prev,
      [minKey]: min,
      [maxKey]: max,
    }));
  };

  const handleSearch = () => {
    if (setPage) setPage(1);

    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    params.append("page", 1);

    navigate(`/listings?${params.toString()}`);
  };

  const handleReset = () => {
    setQuery(INITIAL_QUERY);
    navigate("/listings?page=1");
  };

  const handleToggleAdvanced = () => {
    setShowAdvanced((prev) => !prev);
  };

  return (
    <>
      <Box display="flex" flexWrap="wrap" gap={2}>
        <Box sx={{ minWidth: 160, flex: "1 1 160px" }}>
          <TextField
            select
            label="Marka"
            name="brand"
            value={query.brand}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="">Wszystkie</MenuItem>
            {BRAND_OPTIONS.map((b) => (
              <MenuItem key={b} value={b}>
                {b}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box sx={{ minWidth: 180, flex: "1 1 180px" }}>
          <TextField
            label="Model"
            name="model"
            value={query.model}
            onChange={handleChange}
            fullWidth
          />
        </Box>
        <Box sx={{ minWidth: 180, flex: "1 1 180px" }}>
          <TextField
            select
            label="Województwo"
            name="voivodeship"
            value={query.voivodeship}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="">Wszystkie</MenuItem>
            {VOIVODESHIP_OPTIONS.map((v) => (
              <MenuItem key={v} value={v}>
                {v}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box sx={{ minWidth: 260, flex: "2 1 260px" }}>
          <Autocomplete
            disabled={!query.voivodeship}
            options={filteredCities}
            getOptionLabel={(option) => option.Name}
            value={filteredCities.find((c) => c.Name === query.city) || null}
            onChange={(e, newValue) => {
              setQuery((prev) => ({
                ...prev,
                city: newValue ? newValue.Name : "",
              }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={
                  query.voivodeship ? "Miasto" : "Najpierw wybierz województwo"
                }
                InputLabelProps={{ shrink: true }}
                placeholder="Wybierz miasto"
              />
            )}
            fullWidth
          />
        </Box>
      </Box>

      <Box display="flex" flexWrap="wrap" gap={2} mt={2} alignItems="flex-end">
        <Box sx={{ minWidth: 260, flex: "1 1 260px" }}>
          <Typography variant="caption" mb={1} display="block">
            Cena
          </Typography>

          <Box display="flex" gap={1}>
            <TextField
              placeholder="Od"
              name="minPrice"
              value={query.minPrice}
              onChange={handleNumberChange}
              onBlur={() => handleRangeBlur("minPrice", "maxPrice")}
              fullWidth
              inputProps={{ inputMode: "numeric", maxLength: 9 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">zł</InputAdornment>
                ),
              }}
            />

            <TextField
              placeholder="Do"
              name="maxPrice"
              value={query.maxPrice}
              onChange={handleNumberChange}
              onBlur={() => handleRangeBlur("minPrice", "maxPrice")}
              fullWidth
              inputProps={{ inputMode: "numeric", maxLength: 9 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">zł</InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        <Box sx={{ minWidth: 260, flex: "1 1 260px" }}>
          <Typography variant="caption" mb={1} display="block">
            Rok produkcji
          </Typography>

          <Box display="flex" gap={1}>
            <TextField
              select
              label="Od"
              name="minYear"
              value={query.minYear}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="">Wszystkie</MenuItem>
              {YEAR_OPTIONS.map((y) => (
                <MenuItem key={y} value={y}>
                  {y}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Do"
              name="maxYear"
              value={query.maxYear}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="">Wszystkie</MenuItem>
              {YEAR_OPTIONS.map((y) => (
                <MenuItem key={y} value={y}>
                  {y}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>

        <Box sx={{ minWidth: 220, flex: "1 1 220px" }}>
          <TextField
            select
            label="Typ nadwozia"
            name="bodyType"
            value={query.bodyType}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="">Wszystkie</MenuItem>
            {BODY_TYPE_OPTIONS.map((b) => (
              <MenuItem key={b} value={b}>
                {b}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>

      <Stack
        direction="row"
        mt={3}
        justifyContent="flex-end"
        spacing={1.5}
        flexWrap="wrap"
      >
        {!homepage && (
          <>
            <Button variant="text" onClick={handleToggleAdvanced}>
              {showAdvanced ? "Ukryj filtry" : "Więcej filtrów"}
            </Button>

            <Button variant="text" onClick={handleReset}>
              Wyczyść
            </Button>
          </>
        )}

        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={handleSearch}
        >
          Szukaj
        </Button>
      </Stack>

      {showAdvanced && !homepage && (
        <Box mt={2}>
          <Box display="flex" flexWrap="wrap" gap={2} alignItems="flex-end">
            <Box sx={{ minWidth: 260, flex: "1 1 260px" }}>
              <Typography variant="caption" mb={1} display="block">
                Zasięg
              </Typography>

              <Box display="flex" gap={1}>
                <TextField
                  placeholder="Od"
                  name="minRange"
                  value={query.minRange}
                  onChange={handleNumberChange}
                  onBlur={() => handleRangeBlur("minRange", "maxRange")}
                  fullWidth
                  inputProps={{ inputMode: "numeric", maxLength: 9 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">km</InputAdornment>
                    ),
                  }}
                />

                <TextField
                  placeholder="Do"
                  name="maxRange"
                  value={query.maxRange}
                  onChange={handleNumberChange}
                  onBlur={() => handleRangeBlur("minRange", "maxRange")}
                  fullWidth
                  inputProps={{ inputMode: "numeric", maxLength: 9 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">km</InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ minWidth: 260, flex: "1 1 260px" }}>
              <Typography variant="caption" mb={1} display="block">
                Moc
              </Typography>

              <Box display="flex" gap={1}>
                <TextField
                  placeholder="Od"
                  name="minPower"
                  value={query.minPower}
                  onChange={handleNumberChange}
                  onBlur={() => handleRangeBlur("minPower", "maxPower")}
                  fullWidth
                  inputProps={{ inputMode: "numeric", maxLength: 9 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">KM</InputAdornment>
                    ),
                  }}
                />

                <TextField
                  placeholder="Do"
                  name="maxPower"
                  value={query.maxPower}
                  onChange={handleNumberChange}
                  onBlur={() => handleRangeBlur("minPower", "maxPower")}
                  fullWidth
                  inputProps={{ inputMode: "numeric", maxLength: 9 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">KM</InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ minWidth: 220, flex: "1 1 220px" }}>
              <TextField
                select
                label="Napęd"
                name="driveType"
                value={query.driveType}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="">Wszystkie</MenuItem>
                {DRIVE_TYPE_OPTIONS.map((d) => (
                  <MenuItem key={d} value={d}>
                    {d}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>

          <Box
            display="flex"
            flexWrap="wrap"
            gap={2}
            mt={2}
            alignItems="flex-end"
          >
            <Box sx={{ minWidth: 220, flex: "1 1 220px" }}>
              <TextField
                select
                label="Typ baterii"
                name="batteryType"
                value={query.batteryType}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="">Wszystkie</MenuItem>
                {BATTERY_TYPE_OPTIONS.map((b) => (
                  <MenuItem key={b} value={b}>
                    {b}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Box sx={{ minWidth: 220, flex: "1 1 220px" }}>
              <TextField
                select
                label="Sprzedawca"
                name="sellerType"
                value={query.sellerType}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="">Wszystkie</MenuItem>
                {SELLER_TYPE_OPTIONS.map((o) => (
                  <MenuItem key={o.value} value={o.value}>
                    {o.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
