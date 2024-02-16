import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { randomFacts } from "@/public/data/randomFacts";

const LoadingScreen = () => {
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });

    // Change random fact every 5 seconds
    const interval = setInterval(() => {
      setFactIndex((prevIndex) => (prevIndex + 1) % randomFacts.length);
    }, 5000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div className="loading sub-container">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CircularProgress />
          <h4 className="loading-heading">Do You Know</h4>
          <p className="loading-text">
            {randomFacts[factIndex]}
          </p>
        </Box>
      </div>
    </div>
  );
};

export default LoadingScreen;
