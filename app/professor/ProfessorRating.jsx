import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Rating,
  TextField,
} from "@mui/material";
import BasicAlerts from "../reviewaddprofessor/BasicAlert";
import Filter from "bad-words"; // Import the bad-words library
import { additionalBadWords } from "@/public/data/badwords";

const ProfessorRating = ({ id, setSuccess }) => {
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState("");
  const [basicAlert, setBasicAlert] = useState({ display: false, alert: {} });
  const [commentAlert, setCommentAlert] = useState({
    display: false,
    alert: {},
  });
  const [loading, setLoading] = useState(false); // Loading state

  // Create a new instance of the bad-words filter
  const filter = new Filter();

  const handleSubmit = async () => {
    try {
      setLoading(true); // Set loading to true when submission starts

      // Convert comment and bad words to lowercase
      const lowerCaseComment = comment.toLowerCase();
      const lowerCaseBadWords = additionalBadWords.map((word) =>
        word.toLowerCase()
      );

      if (value === 0 || value === null) {
        setBasicAlert({
          display: true,
          alert: {
            severity: "error",
            message: "Rating cannot be Null",
          },
        });
        throw new Error("Rating cannot be Null");
      } else if (
        filter.isProfane(lowerCaseComment) ||
        lowerCaseBadWords.some((word) => lowerCaseComment.includes(word))
      ) {
        setBasicAlert({
          display: false,
          alert: {},
        });
        setCommentAlert({
          display: true,
          alert: {
            severity: "error",
            message: "Please avoid using offensive language.",
          },
        });
        throw new Error("Comment contains bad words");
      } else {
        setBasicAlert({
          display: false,
          alert: {},
        });
        setCommentAlert({
          display: false,
          alert: {},
        });
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEXT_BASE_URL}/professors/${id}/feedback`,
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
        throw new Error("Failed to submit rating: " + response.statusText);
      }

      console.log("Rating submitted successfully : ");
      setValue(0);
      setComment("");
      setSuccess(true);
    } catch (error) {
      console.error("Error submitting rating:", error.message);
    } finally {
      setLoading(false); // Set loading to false when submission completes or encounters an error
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
          sx={{ fontSize: 40, mt: 1 }}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        {basicAlert.display && <BasicAlerts alert={basicAlert.alert} />}
      </Box>
      <Box mt={2}>
        <TextField
          label="Feedback (Optional)"
          variant="outlined"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          fullWidth
          multiline
          maxRows={4}
        />
      </Box>
      <Box mt={2}>
        {commentAlert.display && <BasicAlerts alert={commentAlert.alert} />}
      </Box>
      <Box mt={2}>
        {loading ? ( // Show loading icon if loading is true
          <Button
            variant="contained"
            color="primary"
            disabled
            sx={{ width: "100px" }}
          >
            <CircularProgress color="inherit" size={24} />
          </Button>
        ) : (
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit Rating
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ProfessorRating;
