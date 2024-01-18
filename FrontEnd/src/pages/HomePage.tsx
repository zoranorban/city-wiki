import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";

const HomePage = () => {
  const backgroundStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/city-background.jpg)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const contentStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    color: "#191970",
    fontFamily: "Times New Roman",
  };

  return (
    <div style={backgroundStyle}>
      <Container maxWidth="md">
        <Box sx={contentStyle}>
          <Box sx={{ textAlign: "center", my: 4 }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: "Times New Roman",
                fontWeight: "bold",
                color: "#3f51b5",
              }}
              gutterBottom
            >
              Welcome to CityWiki
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Times New Roman",
                fontWeight: "normal",
                color: "#191970",
              }}
              paragraph
            >
              Explore the Wonders of Cities Worldwide
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "Times New Roman",
              color: "#191970",
              textAlign: "center",
            }}
            paragraph
          >
            CityWiki is your ultimate guide to discovering fascinating cities
            around the globe. From renowned landmarks to hidden gems, dive into
            detailed information about various cities, their culture, history,
            points of interest, and much more.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "Times New Roman",
              color: "#191970",
              textAlign: "center",
            }}
            paragraph
          >
            Whether you are planning your next adventure or simply curious about
            different places, CityWiki offers a comprehensive collection of
            articles, photos, and insights to quench your wanderlust.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "Times New Roman",
              color: "#191970",
              textAlign: "center",
            }}
            paragraph
          >
            Join our community today and start exploring cities like never
            before!
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/cities"
            >
              Explore Cities
            </Button>
          </Box>
        </Box>

        <Typography
          variant="body1"
          sx={{
            fontFamily: "Times New Roman",
            color: "#F7F9F9",
            textAlign: "center",
            marginTop: 4,
          }}
        >
          Thank you for the team, it was amazing!{" "}
          <a
            href="https://styxa.ro/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#60E1E0", textDecoration: "underline" }}
          >
            (Visit styxa.ro)
          </a>
          
        </Typography>
        <img src={`${process.env.PUBLIC_URL}/styxa-Logo-WHT.png`} alt="Styxa Logo" style={{ width: "5%" }} />
      </Container>
    </div>
  );
};

export default HomePage;
