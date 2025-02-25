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
import { Profile } from '../../../interface/profile'; 
import { ChangeEvent, MouseEvent } from 'react';
import { Chip } from '@mui/material';
import Switch from '@mui/material/Switch';

interface ProfileTableProps {
  profiles: Profile[];
  onEdit: (profile: Profile) => void;
  onView: (profile: Profile) => void;
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

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const ProfileTable: React.FC<ProfileTableProps> = ({
  profiles,
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
  const filteredProfiles = profiles.filter((profile) => {
    const lowerCaseSearch = searchQuery.toLowerCase();
    return (
      profile.name ||
      profile.name.toLowerCase()?.includes(lowerCaseSearch) ||
      profile.role
    );
  });

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewProfile, setViewProfile] = useState<Profile | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [profileToDelete, setProfileToDelete] = useState<number | null>(null);
 
  const sortedUsers = [...filteredProfiles].sort((a, b) => {
    const isAsc = orderBy === a.name && order === 'asc'; // Ordenar por nombre por defecto
    return isAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
  });

  const handleDeleteConfirmation = (id: number) => {
    setProfileToDelete(id);
    setConfirmDeleteOpen(true);
  };

 const handleDelete = async () => {
    if (profileToDelete) {
      try {
        await onDelete(profileToDelete);
      } catch (error) {
        // Manejar error si la eliminación falla
        console.error("Error deleting user:", error);
      } finally {
        setProfileToDelete(null);
        setConfirmDeleteOpen(false);
      }
    }
  };
  const paginatedUsers = sortedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleCloseDeleteConfirmation = () => {
    setConfirmDeleteOpen(false);
    setProfileToDelete(null);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {['Id', 'Name', 'Role', 'Actions'].map((header) => (
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
          {paginatedUsers.map((profile) => (
            <TableRow key={profile.id}>
              <TableCell>{profile.id }</TableCell>
              <TableCell>{profile.name }</TableCell>
              <TableCell>{profile.role }</TableCell>

              <TableCell>
                <IconButton color="primary" onClick={() => onView(profile)}>
                 <FaEye />
                </IconButton>
                <IconButton color="secondary" onClick={() => onEdit(profile)}>
                  <FaEdit style={{ color: 'green' }} />
                </IconButton>
                <IconButton color="error" onClick={() => handleDeleteConfirmation(profile.id)}> 
                  <FaTrash />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={filteredProfiles.length}
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
        <DialogTitle id="alert-dialog-title">{"Confirm"}</DialogTitle>
        <DialogContent>
          {"Are you sure you want to delete this profile?"}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirmation}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

    </TableContainer>
  );
};

export default ProfileTable;