'use client'; 

import React, { useEffect, useState}  from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material'; 
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Profile } from '../../../interface/profile';

interface UserFormProps {
  open: boolean;
  isEdit: boolean;
  onClose: () => void;
  profile: Profile | null;
  onSave: (profile: Profile) => void;
}

const ProfileForm: React.FC<UserFormProps> = ({ open, isEdit, onClose, profile, onSave }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('info');
  const [isPerson, setIsPerson] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  
  const initialValues: Profile = {
      id: 0, 
      name: '',
      role: '', 
      createdAt: null, 
      updatedAt: null,    
  };
  
  const [formValues, setFormValues] = useState(initialValues);
  
  useEffect(() => {
            
  const fetchData = async () => {
    setLoading(true);
    try {
    
      const profileResponse = await fetch('http://localhost:3000/profile', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!profileResponse.ok) {
        const errorText = await profileResponse.text();
        throw new Error(`Error HTTP! status: ${profileResponse.status}, mensaje: ${errorText || 'Sin mensaje'}`);
      }

      const profileData = await profileResponse.json();
    //setProfile(profileData); 
      setIsProfile(true);

    } catch (err: any) {
      setError(err.message);
      console.error('Error getting data:', err);
      showSnackbar(`Error getting data: ${err.message}`, 'error'); 
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

useEffect(() => {
  if (open) {
    formik.resetForm(); 
    formik.setTouched({}); 
    if (profile) {
      formik.setValues({ ...initialValues, ...profile });
      console.log("Con datos");

    } else {
      formik.setValues(initialValues); 
      console.log("Vacio");
    }
  }
}, [open, isEdit, profile]);

const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
  setSnackbarMessage(message);
  setSnackbarSeverity(severity);
  setSnackbarOpen(true);
};

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').nullable(),
  });

  
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: (values) => {
      onSave(values);
    },
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{profile?.id ? 'Edit Profile' : 'Add New Profile'}</DialogTitle>
      <DialogContent>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          autoFocus
          disabled={!isEdit} 
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          disabled={!isEdit} 
          margin="dense"
          name="role"
          label="Role"
          type="number"
          fullWidth
          value={formik.values.role}
          onChange={formik.handleChange}
          error={formik.touched.role && Boolean(formik.errors.role)}
          helperText={formik.touched.role && formik.errors.role}
        />
        
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
           {isEdit && (
            <Button type="submit" variant="contained">
            Save 
            </Button>
            )}
        </DialogActions>
      </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileForm;