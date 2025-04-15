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
import { Service } from '../../../interface/serviceData';
import { Category } from '../../../interface/category';
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
  const [category, setCategory] = useState<Category[]>([]);
  const [isCategory, setIsCategory] = useState(false);
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const port = process.env.NEXT_PUBLIC_PORT;
  
  const initialValues: Service = {
    id: 0, 
    name: '',
    description: '',
    fk_category: '',
    createdAt: '', 
    updatedAt: '', 
    category: {
      id: 0,
      name: '',
      createdAt: '',
      updatedAt: '', 
    }
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

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {

      const categoryResponse = await fetch(`${baseUrl}:${port}/category`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!categoryResponse.ok) {
        const errorText = await categoryResponse.text();
        throw new Error(`Error HTTP! status: ${categoryResponse.status}, mensaje: ${errorText || 'Sin mensaje'}`);
      }

      const categoryData = await categoryResponse.json();
      setCategory(categoryData); 
      setIsCategory(true);
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

const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
  setSnackbarMessage(message);
  setSnackbarSeverity(severity);
  setSnackbarOpen(true);
};

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').nullable(),
    fk_category: Yup.string().required('Category is required').nullable(),
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
      <DialogTitle>{service?.id ? 'Edit Sub-Category' : 'Add New Sub-Category'}</DialogTitle>
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
          label="Description"
          type="text"
          fullWidth
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
          InputLabelProps={{ shrink: true }} 
        />

        {isCategory && (
          <FormControl 
          fullWidth 
          margin="dense" 
          error={formik.touched.fk_category && Boolean(formik.errors.fk_category)} 
          >
            <InputLabel id="person-select-label" >Category</InputLabel>
            <Select
              disabled={!isEdit} 
              labelId="category-select-label"
              id="category-select"
              name="fk_category"
              value={formik.values.fk_category}
              label="Category"
              onChange={formik.handleChange}
            >
              {loading ? (
                <MenuItem value="">Loading...</MenuItem>
              ) : error ? (
                <MenuItem value="">Error: {error}</MenuItem>
              ) : category.length === 0 ? (
                <MenuItem value="">No category available</MenuItem>
              ) : (
                category.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {`${p.name}`}
                  </MenuItem>
                ))
              )}
            </Select>
            <FormHelperText>{formik.touched.fk_category && formik.errors.fk_category}</FormHelperText> 
          </FormControl>
        )}
    
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