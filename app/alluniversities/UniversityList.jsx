"use client";
import React from "react";
import { Grid, Avatar, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const UniversityList = ({ universities }) => {

    const router = useRouter();

    function onButtonClick(name) {
        router.push(`/university?search=${encodeURIComponent(name)}`);
    }

  return (
    <Grid container>
      {universities.map((university, index) => (
        <Grid item xs={4} key={index} onClick={()=>{onButtonClick(university.name)}}>
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
