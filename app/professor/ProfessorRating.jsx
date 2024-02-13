import React, { useState } from "react";
import { Box, Button, Typography, Rating, TextField } from "@mui/material";
import CustomizedSnackbars from "../components/CutomizeSnackBar";
import BasicAlerts from "../reviewaddprofessor/BasicAlert";

const ProfessorRating = ({ id }) => {
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState("");

  const [basicAlert, setBasicAlert] = useState({ display: false, alert: {} });

  const handleSubmit = async () => {
    try {
      if (value === 0) {
        setBasicAlert({
          display: true,
          alert: {
            severity: "error",
            message: "Rating cannot be Null",
          },
        });
        throw new Error("Rating cannot be Null");
      }else{
        setBasicAlert({
          display: false,
          alert: {},
        });
      }
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/professors/${id}/feedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rating: value,
            comment: comment,
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error(
          "Failed to submit rating: " + response.statusText
        );
      }
  
      console.log("Rating submitted successfully");
      setValue(0);
      setComment("");
    } catch (error) {
      console.error("Error submitting rating:", error.message);
    }
  };
  

  return (
    <Box>
      <h2>Rate Your Professor</h2>
      <Box>
        <Rating
          name="rating-input"
          precision={1}
          value={value}
          sx={{ fontSize: 40, mt:1 }}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        {basicAlert.display && <BasicAlerts alert={basicAlert.alert} />}
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
