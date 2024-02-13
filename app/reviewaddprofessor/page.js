"use client";
import React, { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';
import { Box, Button, TextField } from '@mui/material';

const Page = () => {
  const [passcode, setPasscode] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [professors, setProfessors] = useState([]);

  const handlePasscodeChange = (e) => {
    setPasscode(e.target.value);
  };

  const handleClick = (data)=>{
    const updatedProfessors = professors.filter(professor => professor.id !== data.id);
    setProfessors(updatedProfessors);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if passcode matches the expected passcode
    if (passcode === process.env.NEXT_PUBLIC_PASSCODE) {
      setAuthenticated(true);
    } else {
      alert('Incorrect passcode. Please try again.');
    }
  };

  useEffect(() => {
    if (authenticated) {
      // Fetch professors data when authenticated
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/professors/tempProfessor/all`)
        .then(response => response.json())
        .then(data => setProfessors(data))
        .catch(error => console.error('Error fetching professors:', error));
    }
  }, [authenticated]);


  if (!authenticated) {
    return (
      <div className="container">
      <div className="sub-container">
        <Box padding={5} mt={10} mb={5} boxShadow={3} borderRadius={8}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Enter Passcode"
              type="password"
              value={passcode}
              onChange={handlePasscodeChange}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </div>
    </div>
    );
  }

  // If authenticated and professors data is fetched, render the content
  return (
    <div className="container">
      <div className="sub-container">
        <h1>Welcome to the secret page!</h1>
        {/* Render each professor using map function */}
        {professors.map((professor, index) => (
          <ProfileCard
            key={index}
            handleClick={handleClick}
            profile={{
              id: professor._id,
              name: professor.name,
              title: professor.title,
              gender: professor.gender,
              college: professor.college,
              university: professor.university,
              image: professor.image // Assuming the imageUrl property exists in the professor object
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
