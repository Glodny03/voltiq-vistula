import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { BACKEND_URL } from "../constants/api";
import { Typography } from "@mui/material";
import { CenteredContent } from "../components/CenteredContent/CenteredContent";

export const Logout = () => {
  const navigate = useNavigate();
  const { updateUserData } = useContext(AuthContext);

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/v1/auth/logout`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          updateUserData(null);
          navigate("/");
        } else {
          console.error("Błąd podczas wylogowania", response.statusText);
        }
      } catch (error) {
        console.error("Błąd podczas wylogowania:", error);
      }
    };

    handleLogout();
  }, [navigate, updateUserData]);

  return (
    <CenteredContent>
      <Typography
        fontSize={19}
        fontWeight={600}
        flexShrink={0}
        textAlign="center"
        my={10}
      >
        Wylogowywanie...
      </Typography>
    </CenteredContent>
  );
};
