import { NavLink } from "react-router-dom";
import {
  Box,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export const DataTable = ({ columns, data, emptyText = "Brak danych" }) => {
  if (!data.length) {
    return (
      <Box
        border={1}
        borderColor="grey.200"
        borderRadius={2}
        bgcolor="background.paper"
        py={5}
        textAlign="center"
      >
        <Typography color="text.secondary">{emptyText}</Typography>
      </Box>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        p: 0,
        overflow: "hidden",
        border: 1,
        borderColor: "grey.200",
        borderRadius: 2,
        boxShadow: "none",
      }}
    >
      <Table size="medium">
        <TableHead>
          <TableRow
            sx={{
              bgcolor: "grey.100",
            }}
          >
            {columns.map((col) => (
              <TableCell
                key={col.field}
                align={col.align || "left"}
                sx={{
                  fontWeight: 700,
                  color: "text.primary",
                  whiteSpace: "nowrap",
                  borderColor: "grey.200",
                }}
              >
                {col.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow
              key={row.id?.text || rowIndex}
              sx={{
                transition: "background-color 0.2s ease",
                "&:hover": {
                  bgcolor: "background.default",
                },
                "&:last-child td": {
                  borderBottom: 0,
                },
              }}
            >
              {columns.map((col) => {
                const cellData = row[col.field];

                return (
                  <TableCell
                    key={col.field}
                    align={col.align || "left"}
                    sx={{
                      borderColor: "grey.200",
                      color: "text.primary",
                    }}
                  >
                    {col.isLink && cellData ? (
                      <Link
                        component={NavLink}
                        to={cellData.link}
                        underline="none"
                        sx={{
                          color: "primary.dark",
                          fontWeight: 600,
                          "&:hover": {
                            color: "primary.main",
                            textDecoration: "underline",
                          },
                        }}
                      >
                        {cellData.text}
                      </Link>
                    ) : col.bold ? (
                      <Typography component="span" fontWeight={700}>
                        {cellData}
                      </Typography>
                    ) : (
                      cellData
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
