import { Avatar, Box, Grid, Rating, Skeleton } from "@mui/material";
import React from "react";
import ProfRating from "./ProfRating";

const ProfessorProfile = ({ professor }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container alignItems="center" spacing={0}>
        <Grid item xs={4} sx={{ display: "flex", justifyContent: "center" }}>
          <Avatar
            className="professor-detail-avatar"
            alt={professor.name}
            src={professor.image}
          />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid sx={{ cursor: "pointer" }} item xs={7}>
          <h2>{professor.name}</h2>
          <p>{professor.title}</p>
          <hr />
          <h4>
            {professor.college.name}, {professor.college.university.name}
          </h4>

          <ProfRating id={professor._id} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfessorProfile;
