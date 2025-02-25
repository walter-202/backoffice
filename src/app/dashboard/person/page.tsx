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
import { ProfileTable, ProfileForm } from '../components/profile';
import { Person } from '../../interface/person';
import { ChangeEvent, MouseEvent } from 'react'; 


const ProfilePage: React.FC = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsedit] = useState(true);
  const [person, setPerson] = useState<Person | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('info');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3000/person', {
          headers: {
            'Content-Type': 'application/json', 
          },
        });
  
        if (!response.ok) {
          const errorText = await response.text(); 
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText || 'No message'}`);
        }
  
        const jsonData = await response.json();
        setPersons(jsonData);

      } catch (err: any) {
        setError(err.message); 
        console.error('Error fetching data:', err);
        showSnackbar(`Error loading Profiles: ${err.message}`, 'error'); 
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const handleEdit = (person: Person) => {
    setPerson(person);
    setIsedit(true);
    setOpen(true);
  };

  const handleCreate = () => {
    setPerson(null);
    setIsedit(true);
    setOpen(true);
  };

   const handleView = (person: Person) => {
    setIsedit(false);
    setPerson(person);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/person/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setPersons(persons.filter((person) => person.id !== id));
      showSnackbar('Successfully deleted person', 'success');
    } catch (error: any) {
      console.error('Error when deleting person: ', error);
      showSnackbar('Error deleting person', 'error');
    }
  };

  const handleSave = async (person: Person) => {
    try {
      const method = person.id ? 'PUT' : 'POST';
      const url = person.id ? `http://localhost:3000/person/${person.id}` : 'http://localhost:3000/person';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(person),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedPerson = await response.json();
      
      if (method === 'POST') {
        setPersons([...persons, updatedPerson]);
        showSnackbar('Profile created successfully', 'success');
      } else {
        setPersons(persons.map((p) => (p.id === updatedPerson.id ? updatedPerson : p)));
        showSnackbar('Profile successfully updated', 'success');
      }

      setOpen(false);
      setPerson(null);
    } catch (error: any) {
      console.error('Error saving Person: ', error);
      showSnackbar('Error saving Person ', 'error');
    }
  };

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => { 
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => { 
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

  const filteredPersons = persons.filter((person) => {
    const lowerCaseSearch = searchQuery.toLowerCase();
    const first_nameMatch = person.first_name.toLowerCase().includes(lowerCaseSearch);
    const last_nameMatch = person.last_name.toLowerCase().includes(lowerCaseSearch);
    const email_nameMatch = person.email?.toLowerCase().includes(lowerCaseSearch);
    const phone_nameMatch = person.phone?.toLowerCase().includes(lowerCaseSearch);
    return first_nameMatch || last_nameMatch || email_nameMatch || phone_nameMatch; 
  });

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" component="h2">
         Person
        </Typography>
        <Button variant="contained" onClick={() => handleCreate()}>
         Add New Person
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
        <ProfileTable
        profiles={filteredPersons}
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

      <ProfileForm open={open} isEdit={isEdit} onClose={() => setOpen(false)} person={person} onSave={handleSave} />

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: 'auto', minWidth: 300, fontSize: '1.2rem', padding: '1rem' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfilePage;