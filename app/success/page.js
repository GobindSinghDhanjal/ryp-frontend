import { Container, Typography, Button } from "@mui/material";
import Link from "next/link";

const SuccessPage = () => {
  return (
    <div className="container">
      <div className="sub-container">
        <Container maxWidth="md" sx={{ mt: 15, mb: 20 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            color="primary"
          >
            Thank You!
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
