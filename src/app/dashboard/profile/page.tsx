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
import { Profile } from '../../interface/profile';
import { ChangeEvent, MouseEvent } from 'react'; 


const ProfilePage: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsedit] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('info');

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const port = process.env.NEXT_PUBLIC_PORT;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${baseUrl}:${port}/profile`, {
          headers: {
            'Content-Type': 'application/json', 
          },
        });
  
        if (!response.ok) {
          const errorText = await response.text(); 
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText || 'No message'}`);
        }
  
        const jsonData = await response.json();
        setProfiles(jsonData);

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

  const handleEdit = (profile: Profile) => {
    setProfile(profile);
    setIsedit(true);
    setOpen(true);
  };

  const handleCreate = () => {
    setProfile(null);
    setIsedit(true);
    setOpen(true);
  };

   const handleView = (profile: Profile) => {
    setIsedit(false);
    setProfile(profile);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${baseUrl}:${port}/profile/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setProfiles(profiles.filter((profile) => profile.id !== id));
      showSnackbar('Successfully deleted profile', 'success');
    } catch (error: any) {
      console.error('Error when deleting profile: ', error);
      showSnackbar('Error deleting user', 'error');
    }
  };

  const handleSave = async (profile: Profile) => {
    try {
      const method = profile.id ? 'PUT' : 'POST';
      const url = profile.id ? `${baseUrl}:${port}/profile/${profile.id}` : `${baseUrl}:${port}/profile`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedProfile = await response.json();
      
      if (method === 'POST') {
        setProfiles([...profiles, updatedProfile]);
        showSnackbar('Profile created successfully', 'success');
      } else {
        setProfiles(profiles.map((p) => (p.id === updatedProfile.id ? updatedProfile : p)));
        showSnackbar('Profile successfully updated', 'success');
      }

      setOpen(false);
      setProfile(null);
    } catch (error: any) {
      console.error('Error saving Profile: ', error);
      showSnackbar('Error saving Profile ', 'error');
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

  const filteredProfiles = profiles.filter((profile) => {
    const lowerCaseSearch = searchQuery.toLowerCase();
    const nameMatch = profile.name.toLowerCase().includes(lowerCaseSearch);
   
    return nameMatch; 
  });

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" component="h2">
         Profiles
        </Typography>
        <Button variant="contained" onClick={() => handleCreate()}>
         Add New Profile
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
        profiles={filteredProfiles}
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

      <ProfileForm open={open} isEdit={isEdit} onClose={() => setOpen(false)} profile={profile} onSave={handleSave} />

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: 'auto', minWidth: 300, fontSize: '1.2rem', padding: '1rem' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfilePage;