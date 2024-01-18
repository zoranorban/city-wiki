import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { fetchWrapper } from "../../services/fetchWrapper";

interface CitiesFormFields {
  id?: number;
  name: string;
  description: string;
  population: number;
  googleMapsURL: string;
}

interface CitiesFormDialogProps {
  isDialogOpen: boolean;
  handleDialogClose(): void;
  dialogTitle: string;
  dialogAction: string;
  city?: CitiesFormFields;
}

const CitiesFormDialog: FC<CitiesFormDialogProps> = ({
  isDialogOpen,
  handleDialogClose,
  dialogAction,
  dialogTitle,
  city,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CitiesFormFields>();

  console.log(city);

  useEffect(() => {
    if (city) {
      setValue("name", city.name);
      setValue("description", city.description);
      setValue("population", city.population);
      setValue("googleMapsURL", city.googleMapsURL);
    } else {
      setValue("population", 0);
    }
  }, [city]);

  const handleCitySubmit = async (data: CitiesFormFields) => {
    if (city) {
      await fetchWrapper
        .put(`/cities/${city.id}`, data)
    } else {
      await fetchWrapper
        .post("/cities", data)
    }

    reset();
    handleDialogClose();
  };

  const handleResetAndClose = () => {
    reset();
    handleDialogClose();
  };

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
            {...register("name", { required: "Name is required" })}
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
            })}
            error={!!errors.description}
            helperText={errors.description && errors.description.message}
          />

          <TextField
            margin="dense"
            id="population"
            label="Population"
            placeholder="Type a number…"
            type="number"
            fullWidth
            variant="outlined"
            autoComplete="off"
            inputProps={{ min: 0 }}
            {...register("population", { min: 0, valueAsNumber: true })}
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
      </DialogContent>
      <DialogActions>
        <Button type="submit" onClick={handleSubmit(handleCitySubmit)}>
          {dialogAction}
        </Button>
        <Button type="button" onClick={handleResetAndClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CitiesFormDialog;
