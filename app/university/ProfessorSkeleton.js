import { Box, Skeleton } from "@mui/material";

const SingleCardSkeleton = () => {
  return (
    <div className="div">
      <Box p={2}>
        <Skeleton variant="rectangular" width="100%" height={100} />
      </Box>
      <Box p={2}>
        <Skeleton variant="rectangular" width="100%" height={100} />
      </Box>
    </div>
  );
};

export default SingleCardSkeleton;
