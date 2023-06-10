import { CircularProgress } from "@mui/material";
import React from "react";
import "../assets/styles/loading.scss";

export default function Loading() {
  return (
    <div className="load__main">
      <CircularProgress />
    </div>
  );
}
