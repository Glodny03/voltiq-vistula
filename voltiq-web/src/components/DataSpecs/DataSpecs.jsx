import { Box, Typography, Chip } from "@mui/material";

export const DataSpecs = ({ sections }) => {
  return (
    <Box sx={{ width: "100%" }}>
      {sections.map((section, index) => {
        const Icon = section.icon;

        const half = Math.ceil(section.data.length / 2);
        const left = section.data.slice(0, half);
        const right = section.data.slice(half);

        return (
          <Box key={index} sx={{ mb: 6, width: "100%" }}>
            {/* HEADER */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mb: 2.5,
              }}
            >
              <Icon sx={{ color: "primary.main", fontSize: 22 }} />

              <Typography variant="h6" fontWeight={600}>
                {section.title}
              </Typography>
            </Box>

            {/* GRID */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                columnGap: { md: 10 },
                width: "100%",
              }}
            >
              {/* LEFT COLUMN */}
              <Box>
                {left.map((row, i) => (
                  <SpecRow key={i} row={row} />
                ))}
              </Box>

              {/* RIGHT COLUMN */}
              <Box>
                {right.map((row, i) => (
                  <SpecRow key={i} row={row} />
                ))}
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

const SpecRow = ({ row }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "center",
        borderBottom: "1px solid",
        borderColor: "grey.200",
        py: 1.8,
        columnGap: 2,
      }}
    >
      <Typography color="text.secondary">{row.label}</Typography>

      <Value value={row} />
    </Box>
  );
};

const Value = ({ value }) => {
  if (value.type === "boolean") {
    return (
      <Chip
        label={value.value ? "Tak" : "Nie"}
        size="small"
        sx={{
          fontWeight: 600,
          borderRadius: 1.5,
          px: 0.5,
          bgcolor: value.value ? "primary.light" : "grey.200",
          color: value.value ? "primary.dark" : "text.primary",
        }}
      />
    );
  }

  return <Typography fontWeight={600}>{value.value}</Typography>;
};
