import { useEffect, useState } from "react";
import { fetchWrapper } from "../../services/fetchWrapper";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddIcon from "@mui/icons-material/Add";
import UsersFormDialog from "./UsersFormDialog";
import { Button, Card } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import ConfirmationDialog from "../ConfirmationDialog";
import EditIcon from "@mui/icons-material/Edit";

interface User {
  id: number;
  userName: string;
  password: string;
  isAdmin: boolean;
}

const UsersTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);
  const [selected, setSelected] = useState<User | null>();
  const [dialogTitle, setDialogTitle] = useState<string>("");
  const [dialogAction, setDialogAction] = useState<string>("");

  const getUsers = async () => {
    await fetchWrapper.get("/users").then((data) => setUsers(data));
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDeleteUser = (userId: number) => {
    setUserIdToDelete(userId);
    setDeleteConfirmationOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
    setUserIdToDelete(null);
  };

  const handleEditUser = async (
    user: User
  ) => {
    setSelected(user);
    setDialogAction("Update User");
    setDialogTitle("Edit User");
    setIsOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (userIdToDelete !== null) {
      await fetchWrapper.delete(`/users/${userIdToDelete}`);
      getUsers();
    }
    setDeleteConfirmationOpen(false);
    setUserIdToDelete(null);
  };

  const handleAddUserButtonClick = () => {
    setDialogTitle("Create User");
    setDialogAction("Add User");
    setIsOpen(true);
  };

  const handleDialogClose = () => {
    setIsOpen(false);
    setSelected(null);
    getUsers();
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
                Username
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography
                variant="body1"
                fontWeight="bold"
                fontStyle={"italic"}
              >
                Is Admin
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Button color="secondary" onClick={handleAddUserButtonClick}>
                <AddIcon />
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <>
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.userName}</TableCell>
                <TableCell align="center">
                  {row.isAdmin ? "Yes" : "No"}
                </TableCell>
                <TableCell align="center">
                  <Button
                    onClick={(event) => {
                      event.stopPropagation();
                      handleEditUser(row);
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </Button>
                  <Button
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDeleteUser(row.id);
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
      <UsersFormDialog
        isDialogOpen={isOpen}
        handleDialogClose={handleDialogClose}
        dialogAction={dialogAction}
        dialogTitle={dialogTitle}
        user={selected}
      />
      <ConfirmationDialog
        open={deleteConfirmationOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this user?"
      />
    </Card>
  );
};

export default UsersTable;
