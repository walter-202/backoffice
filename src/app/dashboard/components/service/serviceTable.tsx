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
import { Service } from '../../../interface/serviceData'; 
import { ChangeEvent, MouseEvent } from 'react';

interface ServiceTableProps {
  services: Service[];
  onEdit: (service: Service) => void;
  onView: (service: Service) => void;
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

const ServicesTable: React.FC<ServiceTableProps> = ({
  services,
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
  const filteredServices = services.filter((service) => {
    const lowerCaseSearch = searchQuery.toLowerCase();
    return (
      service.name.toLowerCase()?.includes(lowerCaseSearch)  
    );
  });

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<number | null>(null);
 
  const sortedService = [...filteredServices].sort((a, b) => {
    const isAsc = orderBy === a.name && order === 'asc'; // Ordenar por nombre por defecto
    return isAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
  });

  const handleDeleteConfirmation = (id: number) => {
    setServiceToDelete(id);
    setConfirmDeleteOpen(true);
  };

 const handleDelete = async () => {
    if (serviceToDelete) {
      try {
        await onDelete(serviceToDelete);
      } catch (error) {
        // Manejar error si la eliminación falla
        console.error("Error deleting person:", error);
      } finally {
        setServiceToDelete(null);
        setConfirmDeleteOpen(false);
      }
    }
  };
  const paginatedService = sortedService.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleCloseDeleteConfirmation = () => {
    setConfirmDeleteOpen(false);
    setServiceToDelete(null);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {['ID', 'Name', 'Category','Actions'].map((header) => (
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
          {paginatedService.map((service) => (
            <TableRow key={service.id}>
              <TableCell>{service.id }</TableCell>
              <TableCell>{service.name }</TableCell>
              <TableCell>{service.category.name }</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => onView(service)}>
                 <FaEye />
                </IconButton>
                <IconButton color="secondary" onClick={() => onEdit(service)}>
                  <FaEdit style={{ color: 'green' }} />
                </IconButton>
                <IconButton color="error" onClick={() => handleDeleteConfirmation(service.id)}> 
                  <FaTrash />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={filteredServices.length}
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
          {"Are you sure you want to delete this Service?"}
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

export default ServicesTable;