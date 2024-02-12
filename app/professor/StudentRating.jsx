import React from 'react';
import { Box, Typography, Rating, Paper, Divider } from '@mui/material';

const StudentRating = ({ feedback }) => {
  if (!feedback || feedback.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', my: 2 }}>
        <Typography variant="body1">No ratings available</Typography>
      </Box>
    );
  }

  return (
    <>
      {feedback.map(({ rating, comment }, index) => (
        <Paper key={index} elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <h3 className="student-name">Student</h3>
              
              <Rating name="read-only" precision={0.5} value={rating} readOnly />
            </Box>
          </Box>
    
          <Typography variant="body1">{comment}</Typography>
        </Paper>
      ))}
    </>
  );
};

export default StudentRating;
