import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  Autocomplete,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import LoadingScreen from "../components/LoadingScreen";
import SuccessPage from "./SuccessPage";
import FailedPage from "./FailedPage";

const AddProfessor = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  const [professorData, setProfessorData] = useState({
    name: "",
    title: "Assistant Professor",
    gender: "Female",
    college: "",
    university: "",
    department: "",
    subjects: "",
    image: null,
  });

  const genderOptions = ["Male", "Female"];
  const titleOptions = [
    "Assistant Professor",
    "Associate Professor",
    "Professor",
    "Ph.D. Scholar",
  ];

  // const handleChange = (event, value) => {
  //   setProfessorData((prevData) => ({
  //     ...prevData,
  //     [event.target.name]: value || event.target.value,
  //   }));
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfessorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProfessorData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    professorData.image = null;
    // Handle form submission

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEXT_BASE_URL}/professors/tempProfessor`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(professorData),
        }
      );

      if (response.ok) {
        setLoading(false);
        setSuccess(true);
      } else {
        setLoading(false);
        setFail(true);
      }
    } catch (error) {
      setLoading(false);
      setFail(true);
      console.error("Error sending professor data:", error);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (success) {
    return <SuccessPage />;
  }

  if (fail) {
    return <FailedPage />;
  }

  return (
    <div className="container">
      <div className="sub-container">
        <Typography variant="h5" gutterBottom>
          Add Professor
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={professorData.name}
            onChange={handleChange}
            required
            margin="normal"
          />
       
          {/* <Autocomplete
            fullWidth
            value={professorData.title}
            onChange={(event, value) => handleChange(event, value)}
            options={titleOptions}
            renderInput={(params) => (
              <TextField {...params} label="Title" name="title" required />
            )}
          /> */}

          <FormControl sx={{marginTop:2}} fullWidth>
            <InputLabel id="title-label">Title</InputLabel>
            <Select
              labelId="title-label"
              value={professorData.title}
              onChange={(event) => handleChange(event)}
              label="Title"
              name="title"
              required
            >
              {titleOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{marginTop:3, marginBottom:1}} fullWidth>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              value={professorData.gender}
              onChange={(event) => handleChange(event)}
              label="Gender"
              name="gender"
              required
            >
              {genderOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="College"
            name="college"
            value={professorData.college}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="University"
            name="university"
            value={professorData.university}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Department"
            name="department"
            value={professorData.department}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Subjects (Comma separated)"
            name="subjects"
            value={professorData.subjects}
            onChange={handleChange}
            margin="normal"
            helperText="Enter multiple subjects separated by commas"
          />
          <input
            accept="image/*"
            id="image-upload"
            multiple={false}
            type="file"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <label htmlFor="image-upload">
            <Button variant="contained" component="span">
              Upload Image
            </Button>
          </label>
          {professorData.image && (
            <img
              src={URL.createObjectURL(professorData.image)}
              alt="Professor"
              style={{ marginTop: "10px", maxWidth: "100%" }}
            />
          )}
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Add Professor
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default AddProfessor;
