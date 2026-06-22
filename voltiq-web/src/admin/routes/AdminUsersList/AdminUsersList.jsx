import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Alert,
  Box,
  CircularProgress,
  Pagination,
  Stack,
  TextField,
} from "@mui/material";
import { BACKEND_URL } from "../../../constants/api";
import { CenteredContent } from "../../../components/CenteredContent/CenteredContent";
import { ContentBox } from "../../../components/ContentBox/ContentBox";
import { DataTable } from "../../../components/DataTable/DataTable";

export const AdminUsersList = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    username: searchParams.get("username") || "",
    email: searchParams.get("email") || "",
    page: Number(searchParams.get("page")) || 1,
  });

  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  const updateUrlParams = (nextFilters) => {
    const params = Object.fromEntries(
      Object.entries(nextFilters).filter(([, value]) => value !== ""),
    );

    setSearchParams(params);
  };

  const fetchUsers = async (nextFilters) => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const query = new URLSearchParams(nextFilters).toString();

      const response = await fetch(`${BACKEND_URL}/api/v1/users/all?${query}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();

      setUsers(data.users);
      setPagination({
        currentPage: data.currentPage,
        totalPages: data.totalPages,
      });
    } catch (error) {
      console.error("Error fetching users: ", error);
      setErrorMessage("Nie udało się pobrać listy użytkowników.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [filters.username, filters.email]);

  useEffect(() => {
    fetchUsers(debouncedFilters);
    updateUrlParams(debouncedFilters);
  }, [debouncedFilters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
      page: 1,
    }));
  };

  const handlePageChange = (_, newPage) => {
    const nextFilters = {
      ...filters,
      page: newPage,
    };

    setFilters(nextFilters);
    setDebouncedFilters(nextFilters);
  };

  const columns = [
    { header: "ID", field: "id", isLink: true },
    { header: "Nazwa użytkownika", field: "username" },
    { header: "Email", field: "email" },
    { header: "Rola", field: "role", bold: true },
  ];

  const data = users.map((user) => ({
    id: { text: user._id, link: `/profile/${user._id}` },
    username: user.username,
    email: user.email,
    role: user.role,
  }));

  return (
    <CenteredContent>
      <ContentBox title="Lista użytkowników">
        <Stack spacing={3}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", md: "center" }}
          >
            <TextField
              fullWidth
              label="Nazwa użytkownika"
              name="username"
              value={filters.username}
              onChange={handleFilterChange}
              size="small"
            />

            <TextField
              fullWidth
              label="E-mail"
              name="email"
              value={filters.email}
              onChange={handleFilterChange}
              size="small"
            />
          </Stack>

          {errorMessage && (
            <Alert severity="error" variant="outlined">
              {errorMessage}
            </Alert>
          )}

          {isLoading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              py={6}
            >
              <CircularProgress size={32} />
            </Box>
          ) : (
            <DataTable
              columns={columns}
              data={data}
              emptyText="Nie znaleziono użytkowników."
            />
          )}

          {pagination.totalPages > 1 && (
            <Box display="flex" justifyContent="center" pt={1}>
              <Pagination
                page={pagination.currentPage}
                count={pagination.totalPages}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
              />
            </Box>
          )}
        </Stack>
      </ContentBox>
    </CenteredContent>
  );
};
