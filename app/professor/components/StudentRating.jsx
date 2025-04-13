"use client";

import React, { useState } from "react";
import { Box, Typography, Rating, Paper, Button } from "@mui/material";

export default function StudentRating({ feedback }) {
  const [visibleFeedbacks, setVisibleFeedbacks] = useState(4);

  const loadMoreFeedbacks = () => {
    setVisibleFeedbacks((prev) => prev + 4);
  };

  if (!feedback || feedback.length === 0) {
    return (
      <Box sx={{ textAlign: "center", my: 2 }}>
        <Typography variant="body1">No ratings available</Typography>
      </Box>
    );
  }

  const sortedFeedbacks = feedback
    .sort(
      (a, b) =>
        new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
    )
    .slice(0, visibleFeedbacks);

  return (
    <>
      {sortedFeedbacks.map((rating, index) => (
        <Paper
          key={rating._id || index}
          elevation={3}
          sx={{ padding: 2, marginBottom: 3 }}
        >
          <Box>
            <Typography variant="h6">Student</Typography>
            <Rating
              name="read-only"
              precision={0.5}
              value={rating.rating}
              readOnly
            />
          </Box>
          <Typography variant="body1">{rating.comment}</Typography>
          <Box
            sx={{
              display: "block",
              textAlign: "right",
              justifyContent: "space-between",
              marginTop: 1,
            }}
          >
            <Typography variant="body2" color="textSecondary">
              {new Date(rating.createdAt || rating.date).toLocaleDateString(
                "en-IN",
                {
                  month: "short",
                  year: "numeric",
                  timeZone: "Asia/Kolkata",
                }
              )}
            </Typography>
          </Box>
        </Paper>
      ))}
      {feedback.length > visibleFeedbacks && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Button variant="contained" onClick={loadMoreFeedbacks}>
            Load More
          </Button>
        </Box>
      )}
    </>
  );
}
