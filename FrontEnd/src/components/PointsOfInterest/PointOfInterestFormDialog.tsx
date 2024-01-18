import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

import { ChangeEvent, FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { fetchWrapper } from "../../services/fetchWrapper";

interface PointOfInterestFormFields {
  id?: number;
  name: string;
  description: string;
  googleMapsURL: string;
  image: File | null;
}

interface PointOfInterestFormDialogProps {
  isDialogOpen: boolean;
  handleDialogClose(): void;
  dialogTitle: string;
  dialogAction: string;
  pointOfInterest?: PointOfInterestFormFields | null;
  cityId: number;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const PointOfInterestFormDialog: FC<PointOfInterestFormDialogProps> = ({
  isDialogOpen,
  handleDialogClose,
  dialogAction,
  dialogTitle,
  pointOfInterest,
  cityId,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PointOfInterestFormFields>();
  const [image, setImage] = useState<File>();

  console.log(image);

  useEffect(() => {
    if (pointOfInterest) {
      setValue("name", pointOfInterest.name);
      setValue("description", pointOfInterest.description);
      setValue("googleMapsURL", pointOfInterest.googleMapsURL);
      if(pointOfInterest.image) {
        setImage(pointOfInterest.image);
      }
    }
  }, [pointOfInterest]);

  const handlepointOfInterestSubmit = async (
    data: PointOfInterestFormFields
  ) => {
    if (pointOfInterest) {
      await fetchWrapper.put(
        `/cities/${cityId}/pointsofinterest/${pointOfInterest.id}`,
        data
      );
    } else {
      await fetchWrapper.post(`/cities/${cityId}/pointsofinterest`, data);
    }

    reset();
    handleDialogClose();
  };

  const handleResetAndClose = () => {
    reset();
    handleDialogClose();
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if(!(event.target)) return;
    if(!(event.target as HTMLInputElement).files) return;
    
    const file = (event.target as HTMLInputElement).files;
    if (!file) return;
    setImage(file[0]);
  }

  return (
    <Dialog open={isDialogOpen} onClose={handleDialogClose} disablePortal>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            autoComplete="off"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 4,
                message: "Name must be at least 4 characters long.",
              },
            })}
            error={!!errors.name}
            helperText={errors.name && errors.name.message}
          />

          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="description"
            fullWidth
            variant="outlined"
            autoComplete="off"
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 4,
                message: "Description must be at least 4 characters long.",
              },
            })}
            error={!!errors.description}
            helperText={errors.description && errors.description.message}
          />

          <TextField
            margin="dense"
            id="googleMapsURL"
            label="Google Maps URL"
            type="url"
            fullWidth
            variant="outlined"
            autoComplete="off"
            {...register("googleMapsURL", {
              pattern: {
                value: /^https?:\/\/\S+/,
                message: "Please enter a valid URL",
              },
            })}
            error={!!errors.googleMapsURL}
            helperText={errors.googleMapsURL && errors.googleMapsURL.message}
          />
        </form>

        {pointOfInterest && (
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload image
            <VisuallyHiddenInput type="file" onChange={(e) => handleImageChange(e)}/>
          </Button>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          type="submit"
          onClick={handleSubmit(handlepointOfInterestSubmit)}
        >
          {dialogAction}
        </Button>
        <Button type="button" onClick={handleResetAndClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PointOfInterestFormDialog;
