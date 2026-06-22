import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AuthContext } from "../../../context/AuthContext";

export const AddButton = () => {
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddListing = () => {
    if (!userData) {
      navigate("/login", {
        state: { from: "/listing/add" },
      });
      return;
    }

    navigate("/listing/add");
  };

  return (
    <Button
      variant="contained"
      startIcon={<AddIcon />}
      onClick={handleAddListing}
      sx={{
        height: 40,
        px: 2.5,
        fontWeight: 600,
        borderRadius: 2,
        textTransform: "none",
      }}
    >
      Dodaj ogłoszenie
    </Button>
  );
};
