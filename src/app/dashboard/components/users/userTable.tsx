"use client"
import React, { useEffect, useState} from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  IconButton,
  Button
} from '@mui/material';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { User } from '../../../interface/userData'; 
import { ChangeEvent, MouseEvent } from 'react';
import { Chip } from '@mui/material';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onView: (user: User) => void;
  onDelete: (id: number) => Promise<void>;
  orderBy: string;
  order: 'asc' | 'desc';
  handleSort: (property: string) => void;
  page: number;
  rowsPerPage: number;
  handleChangePage: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void; 
  handleChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement>) => void; 
  searchQuery: string;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onView,
  onEdit,
  onDelete,
  orderBy,
  order,
  handleSort,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
 searchQuery,
}) => {
  const filteredUsers = users.filter((user) => {
    const lowerCaseSearch = searchQuery.toLowerCase();
    return (
      user.username.toLowerCase()?.includes(lowerCaseSearch) ||
      user.email?.toLowerCase().includes(lowerCaseSearch) ||
      (user.fk_profile != null ? user.fk_profile : false) || 
      user.status
    );
  });

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewUser, setViewUser] = useState<User | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
 
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const isAsc = orderBy === a.username && order === 'asc'; // Ordenar por nombre por defecto
    return isAsc ? a.username.localeCompare(b.username) : b.username.localeCompare(a.username);
  });

  const handleDeleteConfirmation = (id: number) => {
    setUserToDelete(id);
    setConfirmDeleteOpen(true);
  };

 const handleDelete = async () => {
    if (userToDelete) {
      try {
        await onDelete(userToDelete);
      } catch (error) {
        // Manejar error si la eliminación falla
        console.error("Error deleting user:", error);
      } finally {
        setUserToDelete(null);
        setConfirmDeleteOpen(false);
      }
    }
  };
  const paginatedUsers = sortedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleCloseDeleteConfirmation = () => {
    setConfirmDeleteOpen(false);
    setUserToDelete(null);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {['Username', 'Email', 'Phone', 'Profile', 'Status', 'Actions'].map((header) => (
              <TableCell key={header}>
                {header === 'actions' ? (
                  'Actions'
                ) : (
                  <TableSortLabel
                    active={orderBy === header}
                    direction={order}
                    onClick={() => handleSort(header)}
                  >
                    {header.charAt(0).toUpperCase() + header.slice(1)}
                  </TableSortLabel>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.username ? user.username : "--"}</TableCell>
              <TableCell>{user.email ? user.email: "--"}</TableCell>
              <TableCell>{user.phone ? user.phone: "--"}</TableCell>
              <TableCell>{user.profile?.name}</TableCell>
              <TableCell>
                {user.status === 1 ? ( 
                  <Chip label="Activo" color="success" />
                ) : ( 
                  <Chip label="Inactivo" color="error" />
                )}
              </TableCell>

              <TableCell>
                <IconButton color="primary" onClick={() => onView(user)}>
                 <FaEye />
                </IconButton>
                <IconButton color="secondary" onClick={() => onEdit(user)}>
                  <FaEdit />
                </IconButton>
                <IconButton color="error" onClick={() => handleDeleteConfirmation(user.id)}> 
                  <FaTrash />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={filteredUsers.length}
        page={page}
        onPageChange={handleChangePage} 
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage} 
        rowsPerPageOptions={[5, 10, 25]}
      />

      <Dialog
        open={confirmDeleteOpen}
        onClose={handleCloseDeleteConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmar eliminación"}</DialogTitle>
        <DialogContent>
          {"¿Estás seguro de que deseas eliminar este usuario?"}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirmation}>Cancelar</Button>
          <Button onClick={handleDelete} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

    </TableContainer>
  );
};

export default UserTable;