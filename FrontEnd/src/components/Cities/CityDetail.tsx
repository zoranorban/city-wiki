import { FC, useEffect, useState } from "react";
import { fetchWrapper } from "../../services/fetchWrapper";
import { Card, CardContent, Typography, Button } from "@mui/material";
import PointsOfInterestTable from "../PointsOfInterest/PointsOfInterestTable";
import EditIcon from "@mui/icons-material/Edit";
import CitiesFormDialog from "./CitiesFormDialog";

interface CityDetailProps {
  cityId: number;
}

interface PointOfInterest {
  id: number;
  name: string;
  description: string;
  googleMapsURL: string;
}

interface City {
  id: number;
  name: string;
  description: string;
  population: number;
  googleMapsURL: string;
  pointsOfInterest: PointOfInterest[];
}

const CityDetail: FC<CityDetailProps> = ({ cityId }) => {
  const [city, setCity] = useState<City>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const getCity = async () => {
    await fetchWrapper.get(`/cities/${cityId}`).then((data) => setCity(data));
  };

  useEffect(() => {
    getCity();
  }, []);

  const handleDialogClose = () => {
    setIsOpen(false);
    getCity();
  };

  const handleDialogOpen = () => {
    setIsOpen(true);
  };

  return (
    <Card
      sx={{
        backgroundColor: "#F5FBEF",
        position: "absolute",
        top: "60px",
        left: 0,
        right: 0,
        bottom: 0,
        height: "calc(100vh - 60px)",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        zIndex: 0,
        overflowY: "auto",
      }}
    >
      <CardContent>
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "Times New Roman, serif",
            fontWeight: "bold",
            color: "#3f51b5", // Your desired color
          }}
        >
          {city && city.name}
          <div style={{ marginLeft: "auto" }}>
            <Button sx={{ color: "#84C318" }} onClick={handleDialogOpen}>
              <EditIcon />
            </Button>
          </div>
        </Typography>

        {city && (
          <Typography variant="body1" color="textPrimary" gutterBottom>
            {city.description}
          </Typography>
        )}
        {city && (
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Population: {city.population}
          </Typography>
        )}
        {city && (
          <Typography variant="body2" color="textSecondary">
            {city.googleMapsURL ? (
              <a
                href={city.googleMapsURL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1976d2" }} // Your link color
              >
                open in Maps
              </a>
            ) : (
              <span>No Google Maps URL available</span>
            )}
          </Typography>
        )}
        {city && (
          <div>
            <PointsOfInterestTable cityId={cityId} />
          </div>
        )}
      </CardContent>
      <CitiesFormDialog
        isDialogOpen={isOpen}
        handleDialogClose={handleDialogClose}
        dialogAction="Update City"
        dialogTitle="Edit City"
        city={city}
      />
    </Card>
  );
};

export default CityDetail;
