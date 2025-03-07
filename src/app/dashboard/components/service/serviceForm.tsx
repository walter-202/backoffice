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
import { Service } from '../../../interface/service';

interface PersonFormProps {
  open: boolean;
  isEdit: boolean;
  onClose: () => void;
  service: Service | null;
  onSave: (service: Service) => void;
}

const PersonForm: React.FC<PersonFormProps> = ({ open, isEdit, onClose, service, onSave }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('info');
  const [isPerson, setIsPerson] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  
  const initialValues: Person = {
    id: 0, 
    first_name: '',
    middle_name: '',
    last_name: '',
    address: '',
    date_of_birth: null,
    email: '', 
    phone: '', 
    createdAt: '', 
    updatedAt: '', 
  }
  
  const [formValues, setFormValues] = useState(initialValues);
  
useEffect(() => {
  if (open) {
    formik.resetForm(); 
    formik.setTouched({}); 
    if (person) {
      formik.setValues({ ...initialValues, ...person });
    } else {
      formik.setValues(initialValues); 
    }
  }
}, [open, isEdit, person]);

const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
  setSnackbarMessage(message);
  setSnackbarSeverity(severity);
  setSnackbarOpen(true);
};

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required').nullable(),
    last_name: Yup.string().required('Last Name is required').nullable(),
    email: Yup.string().required('Email is required').nullable(),
    phone: Yup.string().required('Phone is required').nullable(),
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
      <DialogTitle>{person?.id ? 'Edit Person' : 'Add New Person'}</DialogTitle>
      <DialogContent>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          autoFocus
          disabled={!isEdit} 
          margin="dense"
          name="first_name"
          label="First Name"
          type="text"
          fullWidth
          value={formik.values.first_name}
          onChange={formik.handleChange}
          error={formik.touched.first_name && Boolean(formik.errors.first_name)}
          helperText={formik.touched.first_name && formik.errors.first_name}
          InputLabelProps={{ shrink: true }} 
        />
         <TextField
          disabled={!isEdit} 
          margin="dense"
          name="middle_name"
          label="Middle Name"
          type="text"
          fullWidth
          value={formik.values.middle_name}
          onChange={formik.handleChange}
          InputLabelProps={{ shrink: true }} 
        />

          <TextField
          disabled={!isEdit} 
          margin="dense"
          name="last_name"
          label="Last Name"
          type="text"
          fullWidth
          value={formik.values.last_name}
          onChange={formik.handleChange}
          error={formik.touched.last_name && Boolean(formik.errors.last_name)}
          helperText={formik.touched.last_name && formik.errors.last_name}
          InputLabelProps={{ shrink: true }} 
        />
        
        <TextField
          disabled={!isEdit} 
          margin="dense"
          name="address"
          label="Address"
          type="text"
          fullWidth
          value={formik.values.address}
          onChange={formik.handleChange}
          InputLabelProps={{ shrink: true }} 
        />

        <TextField
          disabled={!isEdit} 
          margin="dense"
          name="date_of_birth"
          label="Date Of Birth"
          type="date"
          fullWidth
          value={formik.values.date_of_birth}
          onChange={formik.handleChange}
          InputLabelProps={{ shrink: true }} 
        />

          <TextField
          disabled={!isEdit} 
          margin="dense"
          name="email"
          label="Email"
          type="text"
          fullWidth
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          InputLabelProps={{ shrink: true }} 
        />

        <TextField
          disabled={!isEdit} 
          margin="dense"
          name="phone"
          label="Phone"
          type="text"
          fullWidth
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
          InputLabelProps={{ shrink: true }} 
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

export default PersonForm;