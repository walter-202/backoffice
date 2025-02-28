"use client"

import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import { FaSearch } from 'react-icons/fa';
import { UserTable, UserForm } from '../components/users';
import { User } from '../../interface/userData';
import { ChangeEvent, MouseEvent } from 'react'; 


const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsedit] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('info');
  const [profiles, setProfiles] = useState([]);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const port = process.env.NEXT_PUBLIC_PORT;
  
  useEffect(() => {

    console.log("NEXT_PUBLIC_BASE_URL:", process.env.NEXT_PUBLIC_BASE_URL);
    console.log("NEXT_PUBLIC_PORT:", process.env.NEXT_PUBLIC_PORT);
    
    
    if (!baseUrl || !port) {
      console.error("Variables de entorno no definidas.");
      setError("Variables de entorno no definidas.");
      setLoading(false);
      return;
  
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${baseUrl}:${port}/users/all/data`, {
          headers: {
            'Content-Type': 'application/json', 
          },
        });
  
        if (!response.ok) {
          const errorText = await response.text(); 
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText || 'No message'}`);
        }
  
        const jsonData = await response.json();
        setUsers(jsonData);

        const fetchProfiles = async () => {
          const response = await fetch(`${baseUrl}:${port}/profile`); 
          const profileData = await response.json();
          setProfiles(profileData);
        };
  
      fetchProfiles();

      } catch (err: any) {
        setError(err.message); 
        console.error('Error fetching data:', err);
        showSnackbar(`Error al cargar los usuarios: ${err.message}`, 'error'); 
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const handleEdit = (user: User) => {
    setUser(user);
    setIsedit(true);
    setOpen(true);
  };

  const handleCreate = () => {
    setIsedit(true);
    setOpen(true);
  };

   const handleView = (user: User) => {
    setIsedit(false);
    setUser(user);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${baseUrl}:${port}/users/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setUsers(users.filter((user) => user.id !== id));
      showSnackbar('Successfully deleted user', 'success');
    } catch (error: any) {
      console.error('Error when deleting user: ', error);
      showSnackbar('Error deleting user', 'error');
    }
  };

  const handleSave = async (user: User) => {
    try {
      const method = user.id ? 'PUT' : 'POST';
      const url = user.id ? `${baseUrl}:${port}/users/${user.id}` : `${baseUrl}:${port}/users`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedUser = await response.json();
      console.log(updatedUser)

      if (method === 'POST') {
        setUsers([...users, updatedUser]);
        showSnackbar('User created successfully', 'success');
      } else {
        setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
        showSnackbar('User successfully updated', 'success');
      }

      setOpen(false);
      setUser(null);
    } catch (error: any) {
      console.error('Error saving user: ', error);
      showSnackbar('Error saving user ', 'error');
    }
  };

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => { // Tipo CORRECTO
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => { // Tipo CORRECTO
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const filteredUsers = users.filter((user) => {
    const lowerCaseSearch = searchQuery.toLowerCase();
    const usernameMatch = user.username.toLowerCase().includes(lowerCaseSearch);
    const emailMatch = user.email ? user.email.toLowerCase().includes(lowerCaseSearch) : false;
    const phoneMatch = user.phone ? String(user.phone).toLowerCase().includes(lowerCaseSearch) : false; 

    return usernameMatch || emailMatch || phoneMatch; 

  });

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" component="h2">
         Users
        </Typography>
        <Button variant="contained" onClick={() => handleCreate()}>
         Add New User
        </Button>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Buscar..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: <FaSearch style={{ marginRight: 8 }} />,
        }}
        sx={{ mb: 2 }}
      />

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <UserTable
        users={filteredUsers}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
        orderBy={orderBy}
        order={order}
        handleSort={handleSort}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage} 
        handleChangeRowsPerPage={handleChangeRowsPerPage} 
        searchQuery={searchQuery}
      />
      )}

      <UserForm open={open} isEdit={isEdit} onClose={() => setOpen(false)} user={user} onSave={handleSave} />

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: 'auto', minWidth: 300, fontSize: '1.2rem', padding: '1rem' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UsersPage;