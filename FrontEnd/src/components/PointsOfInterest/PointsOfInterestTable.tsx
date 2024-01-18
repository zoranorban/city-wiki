import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FC, useEffect, useState } from "react";
import { fetchWrapper } from "../../services/fetchWrapper";
import PointOfInterestFormDialog from "./PointOfInterestFormDialog";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocationOffIcon from "@mui/icons-material/LocationOff";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmationDialog from "../ConfirmationDialog";

interface PointOfInterest {
  id: number;
  name: string;
  description: string;
  googleMapsURL: string;
  image: File;
}

interface PointsOfInterestProps {
  cityId: number;
}

const PointsOfInterestTable: FC<PointsOfInterestProps> = ({ cityId }) => {
  const [pointsOfInterest, setPointsOfInterest] = useState<PointOfInterest[]>(
    []
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<PointOfInterest | null>();
  const [dialogTitle, setDialogTitle] = useState<string>("");
  const [dialogAction, setDialogAction] = useState<string>("");
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [pointOfInterestToDelete, setPointOfInterestToDelete] = useState<
    number | null
  >(null);

  const getPointsOfInterest = async () => {
    await fetchWrapper
      .get(`/cities/${cityId}/pointsofinterest`)
      .then((data) => setPointsOfInterest(data));
  };

  useEffect(() => {
    getPointsOfInterest();
  }, []);

  const handleAddPointOfInterestButton = () => {
    setDialogTitle("Create Point Of Interest");
    setDialogAction("Add Point Of Interest");
    setIsOpen(true);
  };

  const handleDialogClose = () => {
    setIsOpen(false);
    getPointsOfInterest();
    setSelected(null);
  };

  // const handleDeletePointOfInterest = async (pointOfInterestId: number) => {
  //   await fetchWrapper.delete(
  //     `/cities/${cityId}/pointsofinterest/${pointOfInterestId}`
  //   );
  //   getPointsOfInterest();
  // };

  const handleEditPointOfInterest = async (
    pointOfInterest: PointOfInterest
  ) => {
    setSelected(pointOfInterest);
    setDialogAction("Update Point Of Interest");
    setDialogTitle("Edit Point Of Interest");
    setIsOpen(true);
  };

  const handleDeletePointOfInterest = (pointOfInterestId: number) => {
    setPointOfInterestToDelete(pointOfInterestId);
    setDeleteConfirmationOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
    setPointOfInterestToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (pointOfInterestToDelete !== null) {
      await fetchWrapper.delete(
        `/cities/${cityId}/pointsofinterest/${pointOfInterestToDelete}`
      );
      getPointsOfInterest();
    }
    setDeleteConfirmationOpen(false);
    setPointOfInterestToDelete(null);
  };

  return (
    <>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                Location
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Button
                color="secondary"
                onClick={handleAddPointOfInterestButton}
              >
                <AddIcon />
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pointsOfInterest.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.description}</TableCell>

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
                    handleEditPointOfInterest(row);
                  }}
                >
                  <EditIcon fontSize="small" />
                </Button>
                <Button
                  onClick={(event) => {
                    event.stopPropagation();
                    handleDeletePointOfInterest(row.id);
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PointOfInterestFormDialog
        isDialogOpen={isOpen}
        handleDialogClose={handleDialogClose}
        dialogTitle={dialogTitle}
        dialogAction={dialogAction}
        cityId={cityId}
        pointOfInterest={selected}
      />
      <ConfirmationDialog
        open={deleteConfirmationOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this point of interest?"
      />
    </>
  );
};

export default PointsOfInterestTable;
