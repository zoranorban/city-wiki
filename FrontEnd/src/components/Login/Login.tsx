import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useState } from "react";
import LoginForm from "./LoginForm";

const Login = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleLoginButtonClick = () => {
    setIsOpen(true);
  };

  const handleDialogClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="inherit"
        onClick={handleLoginButtonClick}
      >
        Log In
        <LoginIcon />
      </Button>
      <Dialog open={isOpen} onClose={handleDialogClose}>
        <DialogTitle>Log In</DialogTitle>
        <DialogContent>
          <Typography mb={1}>
            Please fill in your credentials to log in
          </Typography>
          <LoginForm handleDialogClose={handleDialogClose} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Login;
