import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { randomFacts } from "@/public/data/randomFacts";

const LoadingScreen = () => {

  return (
    <div className="container">
      <div className="loading sub-container">
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <CircularProgress />
          <p sx={{fontSize:"small"}}>{randomFacts[Math.floor(Math.random() * randomFacts.length)]}</p>
        </Box>
      </div>
    </div>
  );
};

export default LoadingScreen;
