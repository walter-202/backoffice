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
import { Person } from '../../../interface/person'; 
import { ChangeEvent, MouseEvent } from 'react';

interface PersonTableProps {
  persons: Person[];
  onEdit: (profile: Person) => void;
  onView: (profile: Person) => void;
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

const PersonTable: React.FC<PersonTableProps> = ({
  persons,
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
  const filteredPersons = persons.filter((person) => {
    const lowerCaseSearch = searchQuery.toLowerCase();
    return (
      person.first_name.toLowerCase()?.includes(lowerCaseSearch)  ||
      person.last_name.toLowerCase()?.includes(lowerCaseSearch)  ||
      person.email?.toLowerCase()?.includes(lowerCaseSearch)  ||
      person.phone?.toLowerCase()?.includes(lowerCaseSearch)  
    );
  });

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewProfile, setViewProfile] = useState<Person | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [personToDelete, setPersonToDelete] = useState<number | null>(null);
 
  const sortedPersons = [...filteredPersons].sort((a, b) => {
    const isAsc = orderBy === a.last_name && order === 'asc'; // Ordenar por nombre por defecto
    return isAsc ? a.last_name.localeCompare(b.last_name) : b.last_name.localeCompare(a.last_name);
  });

  const handleDeleteConfirmation = (id: number) => {
    setPersonToDelete(id);
    setConfirmDeleteOpen(true);
  };

 const handleDelete = async () => {
    if (personToDelete) {
      try {
        await onDelete(personToDelete);
      } catch (error) {
        // Manejar error si la eliminación falla
        console.error("Error deleting person:", error);
      } finally {
        setPersonToDelete(null);
        setConfirmDeleteOpen(false);
      }
    }
  };
  const paginatedPersons = sortedPersons.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleCloseDeleteConfirmation = () => {
    setConfirmDeleteOpen(false);
    setPersonToDelete(null);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {['Firs Name', 'Last Name', 'Email', 'Phone', 'Actions'].map((header) => (
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
          {paginatedPersons.map((person) => (
            <TableRow key={person.id}>
              <TableCell>{person.first_name }</TableCell>
              <TableCell>{person.last_name }</TableCell>
              <TableCell>{person.email ? person.email: "--"}</TableCell>
              <TableCell>{person.phone ? person.phone: "--"}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => onView(person)}>
                 <FaEye />
                </IconButton>
                <IconButton color="secondary" onClick={() => onEdit(person)}>
                  <FaEdit style={{ color: 'green' }} />
                </IconButton>
                <IconButton color="error" onClick={() => handleDeleteConfirmation(person.id)}> 
                  <FaTrash />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={filteredPersons.length}
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
          {"Are you sure you want to delete this Person?"}
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

export default PersonTable;