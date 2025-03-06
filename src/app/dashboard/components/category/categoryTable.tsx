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
import { Category } from '../../../interface/category'; 
import { ChangeEvent, MouseEvent } from 'react';

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onView: (category: Category) => void;
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

const CategoryTable: React.FC<CategoryTableProps> = ({
  categories,
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
  const filteredCategory = categories.filter((category) => {
    const lowerCaseSearch = searchQuery.toLowerCase();
    return (
      category.name.toLowerCase()?.includes(lowerCaseSearch)  
    );
  });

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewCategory, setViewCategory] = useState<Category | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);
 
  const sortedCategory = [...filteredCategory].sort((a, b) => {
    const isAsc = orderBy === a.name && order === 'asc'; // Ordenar por nombre por defecto
    return isAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
  });

  const handleDeleteConfirmation = (id: number) => {
    setCategoryToDelete(id);
    setConfirmDeleteOpen(true);
  };

 const handleDelete = async () => {
    if (categoryToDelete) {
      try {
        await onDelete(categoryToDelete);
      } catch (error) {
        // Manejar error si la eliminación falla
        console.error("Error deleting Category:", error);
      } finally {
        setCategoryToDelete(null);
        setConfirmDeleteOpen(false);
      }
    }
  };
  const paginatedCategory = sortedCategory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleCloseDeleteConfirmation = () => {
    setConfirmDeleteOpen(false);
    setCategoryToDelete(null);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {['ID', 'Name', 'Actions'].map((header) => (
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
          {paginatedCategory.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id }</TableCell>
              <TableCell>{category.name }</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => onView(category)}>
                 <FaEye />
                </IconButton>
                <IconButton color="secondary" onClick={() => onEdit(category)}>
                  <FaEdit style={{ color: 'green' }} />
                </IconButton>
                <IconButton color="error" onClick={() => handleDeleteConfirmation(category.id)}> 
                  <FaTrash />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={filteredCategory.length}
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
          {"Are you sure you want to delete this Category?"}
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

export default CategoryTable;