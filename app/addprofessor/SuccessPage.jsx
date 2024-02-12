// pages/success.js

import { Container, Typography, Button } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";

const SuccessPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  return (
    <div className="container">
      <div className="sub-container">
        <Container maxWidth="md" sx={{ mt: 2, mb: 10 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            color="primary"
          >
            Thank You!
          </Typography>
          <Typography variant="body1" align="center" sx={{ mt: 4, mb: 6 }}>
            Your request to add a professor will be processed within 24 hours
          </Typography>
          <div style={{ textAlign: "center" }}>
            <Link href="/" passHref>
              <Button variant="contained" color="primary">
                Go back to home page
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default SuccessPage;
