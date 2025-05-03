// "use client";
import { Box, Grid, Skeleton } from "@mui/material";

const ProfessorSkeleton = () => {
  return (
    <div className="professor-skeleton container">
      <div className="sub-container">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container alignItems="center" spacing={0}>
            <Grid
              item
              xs={6}
              sm={4}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Skeleton variant="circular" width={120} height={120} />
            </Grid>
            <Grid item xs={6} sm={8}>
              <Skeleton variant="text" width="100%" height={50} />
              <Skeleton
                variant="text"
                height={20}
                sx={{
                  width: {
                    xs: "80%",
                    md: "60%",
                  },
                }}
              />
              <hr />
              <Skeleton
                variant="text"
                width="100%"
                sx={{
                  height: {
                    xs: 100,
                    md: 50,
                  },
                }}
              />

              <Skeleton
                variant="text"
                height={20}
                sx={{
                  width: {
                    xs: "60%",
                    md: "40%",
                  },
                }}
              />
              <Skeleton
                variant="text"
                height={20}
                sx={{
                  width: {
                    xs: "60%",
                    md: "40%",
                  },
                }}
              />
            </Grid>
          </Grid>
        </Box>

        <br />
        <hr />
        <Skeleton variant="text" width="100%" height={200} />
      </div>
    </div>
  );
};

export default ProfessorSkeleton;
