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
import { Description } from '@mui/icons-material';

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
  
  const initialValues: Service = {
    id: 0, 
    name: '',
    description: '',
    fk_category: '',
    createdAt: '', 
    updatedAt: '', 
  }
  
  const [formValues, setFormValues] = useState(initialValues);
  
useEffect(() => {
  if (open) {
    formik.resetForm(); 
    formik.setTouched({}); 
    if (service) {
      formik.setValues({ ...initialValues, ...service });
    } else {
      formik.setValues(initialValues); 
    }
  }
}, [open, isEdit, service]);

const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
  setSnackbarMessage(message);
  setSnackbarSeverity(severity);
  setSnackbarOpen(true);
};

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').nullable(),
    Description: Yup.string().required('Description is required').nullable(),
    category: Yup.string().required('Category is required').nullable(),
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
      <DialogTitle>{service?.id ? 'Edit Service' : 'Add New Service'}</DialogTitle>
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
          InputLabelProps={{ shrink: true }} 
        />
         <TextField
          disabled={!isEdit} 
          margin="dense"
          name="description"
          label="Middle Name"
          type="text"
          fullWidth
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
          InputLabelProps={{ shrink: true }} 
        />

          <TextField
          disabled={!isEdit} 
          margin="dense"
          name="category"
          label="Category"
          type="text"
          fullWidth
          value={formik.values.fk_category}
          onChange={formik.handleChange}
          error={formik.touched.fk_category && Boolean(formik.errors.fk_category)}
          helperText={formik.touched.fk_category && formik.errors.fk_category}
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