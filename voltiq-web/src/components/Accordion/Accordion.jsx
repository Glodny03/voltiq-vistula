import {
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const Accordion = ({ items }) => {
  return (
    <Box display="flex" flexDirection="column" gap={{ xs: 1.5, sm: 2 }}>
      {items.map((item, index) => (
        <MuiAccordion
          key={index}
          disableGutters
          elevation={0}
          sx={{
            bgcolor: "background.paper",
            borderRadius: 2,
            border: 1,
            borderColor: "grey.200",
            overflow: "hidden",
            boxShadow: "none",
            transition: "transform 0.2s ease, border-color 0.2s ease",

            "&:hover": {
              borderColor: "grey.300",
              transform: "translateY(-2px)",
            },

            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              px: { xs: 1.5, sm: 2 },
              py: { xs: 0.5, sm: 0.75, md: 0.5 },
              minHeight: { xs: 44, md: 40 },

              "& .MuiAccordionSummary-content": {
                margin: { xs: "8px 0", md: "4px 0" },
              },

              "& .MuiAccordionSummary-expandIconWrapper": {
                color: "grey.300",
                transition: "color 0.2s ease",
              },

              "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                color: "primary.main",
              },
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{
                fontSize: { xs: "0.95rem", sm: "1rem" },
              }}
            >
              {item.title}
            </Typography>
          </AccordionSummary>

          <AccordionDetails
            sx={{
              px: { xs: 1.5, sm: 2 },
              pb: { xs: 1.5, sm: 2 },
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: { xs: "0.875rem", sm: "0.9rem" },
              }}
            >
              {item.content}
            </Typography>
          </AccordionDetails>
        </MuiAccordion>
      ))}
    </Box>
  );
};
