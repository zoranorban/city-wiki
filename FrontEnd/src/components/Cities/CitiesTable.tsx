import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWrapper } from "../../services/fetchWrapper";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddIcon from "@mui/icons-material/Add";
import CitiesFormDialog from "./CitiesFormDialog";
import { Button, Card } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocationOffIcon from "@mui/icons-material/LocationOff";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import ConfirmationDialog from "../ConfirmationDialog";

interface City {
  id: number;
  name: string;
  description: string;
  population: number;
  googleMapsURL: string;
}

const CitiesTable = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [cityIdToDelete, setCityIdToDelete] = useState<number | null>(null);
  const navigate = useNavigate();

  const getCities = async () => {
    await fetchWrapper.get("/cities").then((data) => setCities(data));
  };

  useEffect(() => {
    getCities();
  }, []);

  const handleDeleteCity = (cityId: number) => {
    setCityIdToDelete(cityId);
    setDeleteConfirmationOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
    setCityIdToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (cityIdToDelete !== null) {
      await fetchWrapper.delete(`/cities/${cityIdToDelete}`);
      getCities();
    }
    setDeleteConfirmationOpen(false);
    setCityIdToDelete(null);
  };

  const handleAddCityButtonClick = () => {
    setIsOpen(true);
  };

  const handleDialogClose = () => {
    setIsOpen(false);
    getCities();
  };

  const handleRowOnClick = (cityId: number) => {
    navigate(`/cities/${cityId}`);
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
      <Table sx={{ minWidth: 650 }} aria-label="simple table" align="center">
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Typography
                variant="body1"
                fontWeight="bold"
                fontStyle={"italic"}
              >
                Name
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography
                variant="body1"
                fontWeight="bold"
                fontStyle={"italic"}
              >
                Description
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography
                variant="body1"
                fontWeight="bold"
                fontStyle={"italic"}
              >
                Population
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography
                variant="body1"
                fontWeight="bold"
                fontStyle={"italic"}
              >
                GoogleMaps
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Button color="secondary" onClick={handleAddCityButtonClick}>
                <AddIcon />
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cities.map((row) => (
            <>
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => handleRowOnClick(row.id)}
              >
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.population}</TableCell>
                <TableCell align="center">
                  {row.googleMapsURL ? (
                    <a
                      href={row.googleMapsURL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LocationOnIcon />
                    </a>
                  ) : (
                    <LocationOffIcon />
                  )}
                </TableCell>
                <TableCell align="center">
                  <Button
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDeleteCity(row.id);
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </Button>
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
      <CitiesFormDialog
        isDialogOpen={isOpen}
        handleDialogClose={handleDialogClose}
        dialogAction="Add City"
        dialogTitle="Add New City"
      />
      <ConfirmationDialog
        open={deleteConfirmationOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this city?"
      />
    </Card>
  );
};

export default CitiesTable;
