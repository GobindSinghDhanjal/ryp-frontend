import { Avatar, Box, Grid, Rating, Skeleton } from "@mui/material";
import React from "react";
import ProfRating from "./ProfRating";
// import dynamic from "next/dynamic";

// const ProfRating = dynamic(() => import("./ProfRating"), {
//   ssr: false,
//   loading: () => (
//     <>
//       <Skeleton variant="text" width={120} height={30} />
//       <Skeleton variant="text" width={80} height={20} />
//     </>
//   ),
// });

const ProfessorProfile = ({ professor, averageRating, numberOfRatings }) => {
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
