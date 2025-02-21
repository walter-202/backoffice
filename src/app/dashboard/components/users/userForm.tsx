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
import { User } from '../../../interface/userData'; 
import { Person } from '../../../interface/person';

interface UserFormProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
  onSave: (user: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ open, onClose, user, onSave }) => {

  const [person, setPerson] = useState<Person[]>([]);
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
  
  const initialValues: User = {
    id: 0, 
    username: '',
    email: '',
    validate_email: 0, 
    phone: '', 
    validate_phone: 0,
    password: '',
    fk_profile: 0,
    fk_person: 0, 
    status: 0, 
    createdAt: '', 
    updatedAt: '', 
    person: {
      id: 0, 
      first_name: '',
      middle_name: '',
      last_name: '',
      address: '',
      date_of_birth: null, 
      phone: '', 
      updatedAt: '', 
    },
    profile: {
      id: 0, 
      name: '',
      role: 0, 
      createdAt: null, 
      updatedAt: null, 
    },
  };
  

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
          setPerson(jsonData);
          setIsPerson(true); 
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

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const validationSchema = Yup.object().shape({
    fk_person: Yup.number().required('La persona es requerida').nullable(),
    username: Yup.string().test(
      'alMenosUnoRequerido',
      'Al menos uno de los campos (Nombre, Email o Teléfono) es requerido',
      function (username) {
        const { email, phone } = this.parent;
        return !!username || !!email || !!phone;
      }
    ),
    email: Yup.string()
      .email('Formato de email inválido')
      .test(
        'alMenosUnoRequerido',
        'Al menos uno de los campos (Nombre, Email o Teléfono) es requerido',
        function (email) {
          const { username, phone } = this.parent;
          return !!username || !!email || !!phone;
        }
      ),
    phone: Yup.string().test(
      'alMenosUnoRequerido',
      'Al menos uno de los campos (Nombre, Email o Teléfono) es requerido',
      function (phone) {
        const { username, email } = this.parent;
        return !!username || !!email || !!phone;
      }
    ),
    password: Yup.string()
      .required('La contraseña es requerida')
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial"),
    confirmPassword: Yup.string()
      .required('La confirmación de contraseña es requerida')
      .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir'),
  });

  
  const formik = useFormik({
    initialValues: {
      ...initialValues,
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const { confirmPassword, ...userValues } = values;
      onSave(userValues);
    },
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{user?.id ? 'Edit User' : 'Add New User'}</DialogTitle>
      <DialogContent>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          autoFocus
          margin="dense"
          name="username"
          label="User Name"
          type="text"
          fullWidth
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          fullWidth
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          margin="dense"
          name="phone"
          label="Phone"
          type="text"
          fullWidth
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />

        <TextField
          margin="dense"
          name="password"
          label="Password"
          type="password"
          fullWidth
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <TextField
          margin="dense"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          fullWidth
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        />


        {isPerson && (
          <FormControl 
          fullWidth 
          margin="dense" 
          error={formik.touched.fk_person && Boolean(formik.errors.fk_person)} // Esto es correcto
          >
            <InputLabel id="person-select-label">Person</InputLabel>
            <Select
              labelId="person-select-label"
              id="person-select"
              name="fk_person"
              value={formik.values.fk_person}
              label="Person"
              onChange={formik.handleChange}
            >
              {/* <MenuItem value="">Select a person</MenuItem> <- Se elimina este MenuItem */}
              {loading ? (
                <MenuItem value="">Loading...</MenuItem>
              ) : error ? (
                <MenuItem value="">Error: {error}</MenuItem>
              ) : person.length === 0 ? (
                <MenuItem value="">No persons available</MenuItem>
              ) : (
                person.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {`${p.first_name} ${p.middle_name} ${p.last_name}`}
                  </MenuItem>
                ))
              )}
            </Select>
            <FormHelperText>{formik.touched.fk_person && formik.errors.fk_person}</FormHelperText> {/* Esto también es correcto */}
          </FormControl>
        )}

        
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserForm;