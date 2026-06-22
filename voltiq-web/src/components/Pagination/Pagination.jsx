import { useEffect } from "react";
import { Box, Button, Stack } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export const Pagination = ({ page, totalPages, onPageChange }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const handlePageClick = (p) => onPageChange(p);

  const renderPages = () => {
    const pages = [];

    const range = 1;
    const start = Math.max(2, page - range);
    const end = Math.min(totalPages - 1, page + range);

    pages.push(renderButton(1));

    if (start > 2) {
      pages.push(renderDots("start"));
    }

    for (let i = start; i <= end; i++) {
      pages.push(renderButton(i));
    }

    if (end < totalPages - 1) {
      pages.push(renderDots("end"));
    }

    if (totalPages > 1) {
      pages.push(renderButton(totalPages));
    }

    return pages;
  };

  const renderButton = (p) => {
    const isActive = p === page;

    return (
      <Button
        key={p}
        onClick={() => handlePageClick(p)}
        variant={isActive ? "contained" : "text"}
        color="primary"
        size="small"
        disabled={isActive}
        sx={{
          minWidth: 40,
          height: 40,
          borderRadius: 2,
          fontWeight: 600,
          transition: "all 0.2s ease",
          "&:hover": {
            bgcolor: isActive ? "primary.main" : "grey.100",
          },
        }}
      >
        {p}
      </Button>
    );
  };

  const renderDots = (key) => (
    <Box key={key} px={1} color="text.secondary">
      ...
    </Box>
  );

  return (
    <Box display="flex" justifyContent="center" mt={4} mb={4}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          size="small"
          sx={{ minWidth: 40, height: 40, borderRadius: 2 }}
        >
          <ChevronLeftIcon />
        </Button>

        {renderPages()}

        <Button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          size="small"
          sx={{ minWidth: 40, height: 40, borderRadius: 2 }}
        >
          <ChevronRightIcon />
        </Button>
      </Stack>
    </Box>
  );
};
