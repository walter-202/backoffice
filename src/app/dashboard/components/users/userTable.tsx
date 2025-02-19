"use client"
import React from 'react';
import {
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
} from '@mui/material';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { User } from '../../../interface/userData'; 
import { ChangeEvent, MouseEvent } from 'react';
import { Chip } from '@mui/material';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
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

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const isAsc = orderBy === a.username && order === 'asc'; // Ordenar por nombre por defecto
    return isAsc ? a.username.localeCompare(b.username) : b.username.localeCompare(a.username);
  });

  const paginatedUsers = sortedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


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
                {user.status === 1 ? ( // Si user.status es 1 (activo)
                  <Chip label="Activo" color="success" />
                ) : ( // Si user.status no es 1 (inactivo)
                  <Chip label="Inactivo" color="error" />
                )}
              </TableCell>

              <TableCell>
                <IconButton color="primary">
                 <FaEye />
                </IconButton>
                <IconButton color="secondary" onClick={() => onEdit(user)}>
                  <FaEdit />
                </IconButton>
                <IconButton color="error" onClick={() => onDelete(user.id)}>
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
        onPageChange={handleChangePage} // Pasa la función con el tipo correcto
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage} // Pasa la función con el tipo correcto
        rowsPerPageOptions={[5, 10, 25]}
      />
    </TableContainer>
  );
};

export default UserTable;