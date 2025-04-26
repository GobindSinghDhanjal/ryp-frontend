import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Rating,
  Paper,
  Button,
  Skeleton,
} from "@mui/material";

const StudentRating = ({ professorId }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [visibleFeedbacks, setVisibleFeedbacks] = useState(4);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_NEXT_BASE_URL}/professors/${professorId}`
        );
        const data = await res.json();
        setFeedbacks(data.feedbacks || []);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [professorId]);

  if (loading) {
    return (
      <>
        {[...Array(4)].map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            height={120}
            sx={{ my: 2 }}
          />
        ))}
      </>
    );
  }

  if (!feedbacks.length) {
    return (
      <Box sx={{ textAlign: "center", my: 2 }}>
        <Typography variant="body1">No ratings available</Typography>
      </Box>
    );
  }

  const sortedFeedbacks = feedbacks
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, visibleFeedbacks);

  return (
    <>
      {sortedFeedbacks.map(({ rating, comment, date }, index) => (
        <Paper
          key={index}
          elevation={3}
          sx={{
            padding: 2,
            marginBottom: 3,
            borderRadius: 2,
            boxShadow: "1px 1px 8px rgba(0, 0, 0, 0.14)",
          }}
        >
          <Box>
            <Typography variant="subtitle1" fontWeight="500">
              Student
            </Typography>
            <Rating name="read-only" precision={0.5} value={rating} readOnly />
          </Box>
          <Typography variant="body1">{comment}</Typography>
          <Box sx={{ textAlign: "right", marginTop: 1 }}>
            <Typography variant="body2" color="textSecondary">
              {new Date(date).toLocaleDateString("en-IN", {
                month: "short",
                year: "numeric",
                timeZone: "Asia/Kolkata",
              })}
            </Typography>
          </Box>
        </Paper>
      ))}
      {feedbacks.length > visibleFeedbacks && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Button
            variant="contained"
            onClick={() => setVisibleFeedbacks((prev) => prev + 4)}
          >
            Load More
          </Button>
        </Box>
      )}
    </>
  );
};

export default StudentRating;
