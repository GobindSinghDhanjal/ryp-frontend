"use client";
import React from "react";
import { Grid, Avatar, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const UniversityList = ({ universities }) => {
  const router = useRouter();

  function onButtonClick(id) {
    router.push(`/university?search=${encodeURIComponent(id)}`);
  }

  return (
    <Grid container>
      {universities.map((university, index) => (
        <Grid
          item
          xs={4}
          className="university-card"
          sx={{
            transition: "transform 0.25s ease-in-out", // Smooth transition for both states
            "&:hover": {
              transform: "scale(1.1)", // Zoom effect on hover
            },
          }}
          key={index}
          onClick={() => {
            onButtonClick(university._id);
          }}
        >
          <Avatar
            alt={university.name}
            src={university.image}
            sx={{ width: 80, height: 80, margin: "auto", marginTop: 4 }}
          />
          <Typography variant="subtitle2" align="center" gutterBottom>
            {university.name}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default UniversityList;
