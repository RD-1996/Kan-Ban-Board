import React from "react";
import { Box, Button, Typography } from "@mui/material";
import "../assets/styles/notFound.scss";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };
  return (
    <Box className="not__found--container">
      <Typography variant="h1" style={{ color: "white" }}>
        404
      </Typography>
      <Typography variant="h6" style={{ color: "white" }}>
        The page you’re looking for doesn’t exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={goToHome}
      >
        Back Home
      </Button>
    </Box>
  );
}
