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

interface UsersFormFields {
  id?: number;
  userName: string;
  password: string;
  isAdmin: boolean;
}

interface UsersFormDialogProps {
  isDialogOpen: boolean;
  handleDialogClose(): void;
  dialogTitle: string;
  dialogAction: string;
  user?: UsersFormFields | null;
}

const UsersFormDialog: FC<UsersFormDialogProps> = ({
  isDialogOpen,
  handleDialogClose,
  dialogAction,
  dialogTitle,
  user,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UsersFormFields>();

  console.log(user);

  useEffect(() => {
    if (user) {
      setValue("userName", user.userName);
      setValue("password", user.password);
      setValue("isAdmin", user.isAdmin);
    }
  }, [user]);

  const handleUserSubmit = async (data: UsersFormFields) => {
    if (user) {
      await fetchWrapper.put(`/users/${user.id}`, data);
    } else {
      await fetchWrapper.post("/users", data);
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
            id="userName"
            label="Username"
            type="text"
            fullWidth
            variant="outlined"
            autoComplete="off"
            {...register("userName", { required: "userName is required" })}
            error={!!errors.userName}
            helperText={errors.userName && errors.userName.message}
          />
          {!user && (
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              autoComplete="off"
              {...register("password", { required: "password is required" })}
              error={!!errors.password}
              helperText={errors.password && errors.password.message}
            />
          )}
        </form>
      </DialogContent>
      <DialogActions>
        <Button type="submit" onClick={handleSubmit(handleUserSubmit)}>
          {dialogAction}
        </Button>
        <Button type="button" onClick={handleResetAndClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UsersFormDialog;
