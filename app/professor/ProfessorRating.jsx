import React, { useState } from 'react';
import { Box, Button, Typography, Rating, TextField } from '@mui/material';

const ProfessorRating = () => {
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    console.log('Submitted rating:', value);
    console.log('Comment:', comment);
  };

  return (
    <Box>
      <h2>Rate Your Professor</h2>
      <Box>
      <br />
        <Rating
          name="rating-input"
          precision={1}
          value={value}
          sx={{ fontSize: 35 }}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Box>
      <Box mt={2}>
        <TextField
          label="Comment (Optional)"
          variant="outlined"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          fullWidth
           multiline
          maxRows={4}
        />
      </Box>
      <Box mt={2}>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit Rating
        </Button>
      </Box>
    </Box>
  );
};

export default ProfessorRating;
