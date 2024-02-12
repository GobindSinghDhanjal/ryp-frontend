import { Container, Typography, Button } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";

const FailedPage = ({ message }) => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 10 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        color="error"
      >
        Failed!
      </Typography>
      <Typography variant="body1" align="center" sx={{ mt: 4, mb: 6 }}>
        {message ||
          "Oops! An error occurred while processing your request to add a professor. Please try again later. Thank you for your patience!"}
      </Typography>
      <div style={{ textAlign: "center" }}>
        <Link href="/" passHref>
          <Button variant="contained" color="primary">
            Go back to home page
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default FailedPage;
