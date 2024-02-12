import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  Box,
  TextField,
} from "@mui/material";
import Image from "next/image";

const ProfileCard = ({ handleClick, profile }) => {
  const [textFieldValue, setTextFieldValue] = useState("");
  const handleTextFieldChange = (event) => {
    event.preventDefault();
    setTextFieldValue(event.target.value);
  };

  const { id, name, title, gender, college, university, image } = profile;
  const renderAvatar = () => {
    if (image != null) {
      return (
        <Avatar
          src={image}
          sx={{
            width: 70,
            height: 70,
          }}
        />
      );
    } else {
      const randomNumber = Math.floor(Math.random() * 5) + 1;
      const defaultAvatar =
        gender === "Male"
          ? `/images/man/man-${randomNumber}.png`
          : `/images/woman/woman-${randomNumber}.png`;
      return <Image src={defaultAvatar} alt={name} width={70} height={70} />;
    }
  };

  const handleAddButtonClick = async () => {
    try {
      const data = {
        id,
        name,
        title,
        gender,
        collegeName: college,
        universityName: university,
        passcode: textFieldValue,
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/professors`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add professor");
      }
      setTextFieldValue("");
      console.log("Professor added successfully:", data);
      handleClick(data);
    } catch (error) {
      console.error("Error adding professor:", error.message);
    }
  };

  return (
    <Card sx={{ mt: 5 }}>
      <CardContent>
        <Grid container spacing={2}>
          {/* Avatar */}
          <Grid item xs={12} sm={6} md={4}>
            {renderAvatar()}
          </Grid>
          {/* Profile details */}
          <Grid item xs={12} sm={6} md={8}>
            <Typography variant="h6" gutterBottom>
              {name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Title: {title}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Gender: {gender}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              College: {college}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              University: {university}
            </Typography>
          </Grid>
        </Grid>
        <Divider style={{ marginTop: "1rem", marginBottom: "1rem" }} />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Grid container spacing={2}>
            {/* Avatar */}
            <Grid item xs={7} md={10}>
              <TextField
                id="outlined-basic"
                label="Passcode"
                variant="outlined"
                required
                value={textFieldValue}
                onChange={handleTextFieldChange}
              />
            </Grid>
            <Grid sx={{ textAlign: "right" }} item xs={4} md={2}>
              <Button
                variant="contained"
                sx={{
                  fontSize: "1.1rem",
                  borderRadius: "15px",
                  padding: "11px 25px",
                }}
                color="primary"
                onClick={handleAddButtonClick}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
