import { TypographyVariantsOptions } from "@mui/material/styles";

const typography: TypographyVariantsOptions = {
  fontFamily: '"Montserrat", sans-serif',
  h1: {
    fontWeight: 700,
    fontSize: "2.5rem",
    lineHeight: 1.2,
    "@media (min-width:600px)": {
      fontSize: "3rem",
    },
    "@media (min-width:900px)": {
      fontSize: "3.5rem",
    },
  },
  h2: {
    fontWeight: 600,
    fontSize: "2rem",
    lineHeight: 1.3,
    "@media (min-width:600px)": {
      fontSize: "2.25rem",
    },
    "@media (min-width:900px)": {
      fontSize: "2.5rem",
    },
  },
  h3: {
    fontWeight: 500,
    fontSize: "1.5rem",
    lineHeight: 1.4,
    "@media (min-width:600px)": {
      fontSize: "1.75rem",
    },
    "@media (min-width:900px)": {
      fontSize: "2rem",
    },
  },
  h4: {
    fontWeight: 500,
    fontSize: "1.25rem",
    lineHeight: 1.5,
  },
  body1: {
    fontWeight: 400,
    fontSize: "1rem",
    lineHeight: 1.6,
  },
  body2: {
    fontWeight: 400,
    fontSize: "0.875rem",
    lineHeight: 1.5,
  },
  button: {
    fontWeight: 600,
    fontSize: "0.875rem",
    textTransform: "none",
  },
  subtitle1: {
    fontSize: "1rem",
    fontWeight: 500,
  },
  subtitle2: {
    fontSize: "0.875rem",
    fontWeight: 500,
  },
  caption: {
    fontSize: "0.75rem",
    color: "#888",
  },
};

export default typography;
