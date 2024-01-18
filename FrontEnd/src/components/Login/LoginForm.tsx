import { Button, TextField } from "@mui/material";
import { FC, useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../context/UserContext";
import "./Login.scss";
import { useNavigate } from "react-router-dom";

interface LoginFormFields {
  username: string;
  password: string;
}

interface LoginFormProps {
  handleDialogClose: () => void;
}

const LoginForm: FC<LoginFormProps> = ({ handleDialogClose }) => {
  const { logIn } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>();

  const handleLoginSubmit = (data: LoginFormFields) => {
    logIn(data);
    handleDialogClose();
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(handleLoginSubmit)} noValidate>
      <TextField
        autoFocus
        margin="dense"
        id="username"
        label="Username"
        type="text"
        fullWidth
        variant="outlined"
        autoComplete="off"
        {...register("username", { required: "Username is required" })}
        error={!!errors.username}
        helperText={errors.username && errors.username.message}
      />

      <TextField
        margin="dense"
        id="passwortd"
        label="Password"
        type="password"
        fullWidth
        variant="outlined"
        autoComplete="off"
        {...register("password", { required: "Password is required" })}
        error={!!errors.password}
        helperText={errors.password && errors.password.message}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          marginTop: "10px",
        }}
      >
        <Button type="submit">Log me in</Button>
      </div>
    </form>
  );
};

export default LoginForm;
