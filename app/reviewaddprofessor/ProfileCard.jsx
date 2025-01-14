import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Image from "next/image";
import BasicAlerts from "./BasicAlert";

const ProfileCard = ({ handleClick, profile }) => {
  const [textFieldValue, setTextFieldValue] = useState("");
  const titleOptions = [
    "Assistant Professor",
    "Associate Professor",
    "Professor",
    "Ph.D. Scholar",
  ];

  const [basicAlert, setBasicAlert] = useState({ display: false, alert: {} });
  const handleTextFieldChange = (event) => {
    event.preventDefault();
    setTextFieldValue(event.target.value);
  };

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleFieldChange = (event, fieldName) => {
    const newValue = event.target.value;
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      [fieldName]: newValue,
    }));
  };

  // const { id, name, title, gender, college, university, image } = profile;
  const { id, name, title, gender, college, university, image } = editedProfile;
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

  const handleRemoveButtonClick = async () => {
    try {
      // Make DELETE request to delete the temporary professor by ID and passcode
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/professors/tempProfessor`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, passcode: textFieldValue }), // Send the ID and passcode in the request body as JSON
        }
      );

      // Check if the request was successful
      if (!response.ok) {
        setBasicAlert({
          display: true,
          alert: {
            severity: "error",
            message:
              "Failed to delete temporary professor: " + response.statusText,
          },
        });
        throw new Error("Failed to delete temporary professor");
      }

      // Add logic here if you want to update state or perform any other actions after successful deletion
      setBasicAlert({
        display: true,
        alert: {
          severity: "success",
          message: "Temporary professor deleted successfully",
        },
      });
    } catch (error) {
      setBasicAlert({
        display: true,
        alert: {
          severity: "error",
          message: "Error deleting temporary professor:" + error.message,
        },
      });
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
        `${process.env.NEXT_PUBLIC_NEXT_BASE_URL}/professors`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        setBasicAlert({
          display: true,
          alert: {
            severity: "error",
            message: "Failed to add professor",
          },
        });
        throw new Error("Failed to add professor");
      }
      setTextFieldValue("");
      setBasicAlert({
        display: true,
        alert: {
          severity: "success",
          message: "Professor added successfully",
        },
      });
      handleClick(data);
    } catch (error) {
      setBasicAlert({
        display: true,
        alert: {
          severity: "error",
          message: "Error adding professor:" + error.message,
        },
      });
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
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => handleFieldChange(e, "name")}
            />
            <FormControl sx={{ mt: 3 }} fullWidth>
              <InputLabel id="title-label">Title</InputLabel>
              <Select
                sx={{ width: "230px" }}
                labelId="title-label"
                value={title}
                onChange={(e) => handleFieldChange(e, "title")}
                label="Title"
                variant="outlined"
                required
              >
                {titleOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ mt: 3 }} fullWidth>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                sx={{ width: "230px" }}
                value={gender}
                onChange={(e) => handleFieldChange(e, "gender")}
                label="Gender"
                variant="outlined"
                required
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>

            <TextField
              id="college"
              sx={{ mt: 3, mr: 2 }}
              label="College"
              variant="outlined"
              value={college}
              onChange={(e) => handleFieldChange(e, "college")}
            />

            <TextField
              id="university"
              sx={{ mt: 3 }}
              label="University"
              variant="outlined"
              value={university}
              onChange={(e) => handleFieldChange(e, "university")}
            />
          </Grid>
        </Grid>
        <Divider style={{ marginTop: "1rem", marginBottom: "1rem" }} />
        {basicAlert.display && <BasicAlerts alert={basicAlert.alert} />}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Grid container spacing={2}>
            {/* Avatar */}
            <Grid item xs={12} md={12} lg={8}>
              <TextField
                id="outlined-basic"
                label="Passcode"
                variant="outlined"
                required
                value={textFieldValue}
                onChange={handleTextFieldChange}
              />
            </Grid>
            <Grid sx={{ textAlign: "center" }} item md={6} lg={2}>
              <Button
                variant="contained"
                sx={{
                  fontSize: "1.1rem",
                  borderRadius: "15px",
                  padding: "11px 25px",
                  marginRight: "10px", // Add some right margin for spacing
                }}
                color="error"
                onClick={handleRemoveButtonClick}
              >
                Remove
              </Button>
            </Grid>
            <Grid sx={{ textAlign: "center" }} item md={6} lg={2}>
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
