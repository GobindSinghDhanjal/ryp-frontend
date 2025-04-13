"use client";

import { Avatar, Box, Grid, Rating } from "@mui/material";

export default function ProfessorProfile({
  professor,
  averageRating,
  numberOfRatings,
}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container alignItems="center" spacing={0}>
        <Grid item xs={4} sx={{ display: "flex", justifyContent: "center" }}>
          <Avatar
            className="professor-detail-avatar"
            alt={professor.name}
            src={professor.image}
            sx={{ width: 120, height: 120 }}
          />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={7}>
          <h2>{professor.name}</h2>
          <p>{professor.title}</p>
          <hr />
          <h4>
            {professor.college.name}, {professor.college.university.name}
          </h4>
          <Rating
            name="read-only"
            value={averageRating || 0}
            precision={0.5}
            sx={{ display: "flex", fontSize: 16 }}
            readOnly
          />
          <small>
            ({numberOfRatings} {numberOfRatings === 1 ? "Rating" : "Ratings"})
          </small>
        </Grid>
      </Grid>
    </Box>
  );
}
