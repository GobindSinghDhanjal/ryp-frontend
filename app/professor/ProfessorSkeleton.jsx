import { Box, Grid, Skeleton } from "@mui/material";
import React from "react";

const ProfessorSkeleton = () => {
  return (
    <div className="professor-skeleton container">
      <div className="sub-container">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container alignItems="center" spacing={0}>
            <Grid item xs={4}>
              <Skeleton variant="circular" width={76} height={76} />
            </Grid>
            <Grid item xs={8}>
              <Skeleton variant="text" width="80%" height={40} />
              <Skeleton variant="text" width="60%" height={20} />
              <Skeleton variant="text" width="40%" height={20} />
              <Skeleton variant="text" width="80%" height={20} />
            </Grid>
          </Grid>
        </Box>

        <br />
        <hr />

        <Skeleton variant="text" width="40%" height={20} />
        <Skeleton variant="text" width="60%" height={20} />
        <Skeleton variant="text" width="70%" height={20} />

        {/* Other skeleton components related to professor's details */}
      </div>
    </div>
  );
};

export default ProfessorSkeleton;
