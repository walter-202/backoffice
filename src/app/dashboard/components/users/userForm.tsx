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
import { Profile } from '../../../interface/profile';

interface UserFormProps {
  open: boolean;
  isEdit: boolean;
  onClose: () => void;
  user: User | null;
  onSave: (user: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ open, isEdit, onClose, user, onSave }) => {
  const [profile, setProfile] = useState<Profile[]>([]);
  const [person, setPerson] = useState<Person[]>([]);
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
  
  const initialValues: User = {
    id: 0, 
    username: '',
    email: '',
    validate_email: 0, 
    phone: '', 
    validate_phone: 0,
    password: '',
    confirmPassword: '',
    fk_profile: '',
    fk_person: '', 
    status: 1, 
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
  
  const [formValues, setFormValues] = useState(initialValues);
  
  useEffect(() => {
            
  const fetchData = async () => {
    setLoading(true);
    try {
      // Obtener datos de Person
      const personResponse = await fetch('http://localhost:3000/person', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!personResponse.ok) {
        const errorText = await personResponse.text();
        throw new Error(`Error HTTP! status: ${personResponse.status}, mensaje: ${errorText || 'Sin mensaje'}`);
      }

      const personData = await personResponse.json();
      setPerson(personData);
      setIsPerson(true);

      // Obtener datos de Profile (nueva llamada fetch)
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
      setProfile(profileData); 
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
      setFormValues(initialValues); 
      formik.resetForm(); 
      formik.setTouched({}); 
      setFormValues({...initialValues, ...user})
      formik.setValues({
        ...initialValues,
        ...user,
        password: '',
        confirmPassword: '',
      },)
    }
  }, [open, user, isEdit]); 


const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
  setSnackbarMessage(message);
  setSnackbarSeverity(severity);
  setSnackbarOpen(true);
};

  const validationSchema = Yup.object().shape({
    fk_profile: Yup.number().required('Profile is required').nullable(),
    fk_person: Yup.number().required('The person is required').nullable(),
    username: Yup.string().test(
      'alMenosUnoRequerido',
      'At least one of the fields (Name, Email or Telephone) is required',
      function (username) {
        const { email, phone } = this.parent;
        return !!username || !!email || !!phone;
      }
    ),
    email: Yup.string()
      .email('Invalid email format')
      .test(
        'alMenosUnoRequerido',
        'At least one of the fields (Name, Email or Telephone) is required',
        function (email) {
          const { username, phone } = this.parent;
          return !!username || !!email || !!phone;
        }
      ),
    phone: Yup.string().test(
      'alMenosUnoRequerido',
      'At least one of the fields (Name, Email or Telephone) is required',
      function (phone) {
        const { username, email } = this.parent;
        return !!username || !!email || !!phone;
      }
    ),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
     // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, "The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
    confirmPassword: Yup.string()
      .required('Password confirmation is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
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
    enableReinitialize: true, 
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{user?.id ? 'Edit User' : 'Add New User'}</DialogTitle>
      <DialogContent>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          autoFocus
          disabled={!isEdit} 
          margin="dense"
          name="username"
          label="User Name"
          type="text"
          fullWidth
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          InputLabelProps={{ shrink: true }} 
        />
        <TextField
          disabled={!isEdit} 
          margin="dense"
          name="email"
          label="Email"
          type="email"
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

        <TextField
          disabled={!isEdit} 
          margin="dense"
          name="password"
          label="Password"
          type="password"
          fullWidth
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          InputLabelProps={{ shrink: true }} 
        />

        <TextField
          disabled={!isEdit} 
          margin="dense"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          fullWidth
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          InputLabelProps={{ shrink: true }} 
        />

        {isPerson && (
          <FormControl 
          fullWidth 
          margin="dense" 
          error={formik.touched.fk_person && Boolean(formik.errors.fk_person)} 
          >
            <InputLabel id="person-select-label" >Person</InputLabel>
            <Select
              disabled={!isEdit} 
              labelId="person-select-label"
              id="person-select"
              name="fk_person"
              value={formik.values.fk_person}
              label="Person"
              onChange={formik.handleChange}
            >
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
            <FormHelperText>{formik.touched.fk_person && formik.errors.fk_person}</FormHelperText> 
          </FormControl>
        )}

        {isProfile && (
          <FormControl 
          fullWidth 
          margin="dense" 
          error={formik.touched.fk_profile && Boolean(formik.errors.fk_profile)} 
          >
            <InputLabel id="profile-select-label">Profile</InputLabel>
            <Select
              disabled={!isEdit} 
              labelId="profile-select-label"
              id="profile-select"
              name="fk_profile"
              value={formik.values.fk_profile}
              label="Profile"
              onChange={formik.handleChange}
            >
              {loading ? (
                <MenuItem value="">Loading...</MenuItem>
              ) : error ? (
                <MenuItem value="">Error: {error}</MenuItem>
              ) : person.length === 0 ? (
                <MenuItem value="">Not profile available</MenuItem>
              ) : (
                profile.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {`${p.name}`}
                  </MenuItem>
                ))
              )}
            </Select>
            <FormHelperText>{formik.touched.fk_profile && formik.errors.fk_profile}</FormHelperText> 
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

export default UserForm;