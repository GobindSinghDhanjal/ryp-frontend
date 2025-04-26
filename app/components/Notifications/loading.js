import { Skeleton, Box } from "@mui/material";

export default function Loading() {
  return (
    <div style={{marginTop: 24}}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {[...Array(2)].map((_, index) => (
          <Skeleton
            key={index}
            sx={{ borderRadius: 2 }}
            variant="rectangular"
            width="100%"
            height={160}
          />
        ))}
      </Box>
    </div>
  );
}
