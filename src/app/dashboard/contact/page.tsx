"use client";
import React, { useState } from 'react';
import { TextField, Button, Grid, Box, Typography } from '@mui/material';
import { CalendarMonth, LocationOn, Person, Email, Numbers, Home, Edit, Save, Cancel } from 'lucide-react'; 
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

interface FormData {
    listingStatus: string;
    statusChangeDate: Dayjs | null;
    listPrice: number;
    daysOnMarket: number;
    mlsID: string;
    propertyType: string;
    bedrooms: number;
    listOffice: string;
    bathrooms: number;
    squareFootage: number;
    mlsName: string;
    yearBuilt: number;
    listAgent: string;
    subdivision: string;
}

const MojoForm = () => {
    const [formData, setFormData] = useState<FormData>({
        listingStatus: '',
        statusChangeDate: null,
        listPrice: 0,
        daysOnMarket: 0,
        mlsID: '',
        propertyType: '',
        bedrooms: 0,
        listOffice: '',
        bathrooms: 0,
        squareFootage: 0,
        mlsName: '',
        yearBuilt: 0,
        listAgent: '',
        subdivision: '',
    });

    const [isEditing, setIsEditing] = useState(true); 
    const [error, setError] = useState('');

    const handleChange = (field: keyof FormData, value: any) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleSave = () => {
        if (!formData.listingStatus || !formData.mlsID) {
            setError('Por favor, complete todos los campos obligatorios.');
            return;
        }
        setIsEditing(false);
        setError(''); 
        console.log('Form Data:', formData);
      
    };

    const handleCancel = () => {
        setFormData({
            listingStatus: '',
            statusChangeDate: null,
            listPrice: 0,
            daysOnMarket: 0,
            mlsID: '',
            propertyType: '',
            bedrooms: 0,
            listOffice: '',
            bathrooms: 0,
            squareFootage: 0,
            mlsName: '',
            yearBuilt: 0,
            listAgent: '',
            subdivision: '',
        });
        setIsEditing(true); 
        setError('');
    };

    return (
        <Box sx={{ p: 4, bgcolor: '#f9f9f9', borderRadius: 8 }}>
            <Typography variant="h4" gutterBottom sx={{ color: '#1976d2' }}>
                Formulario de Información de Propiedad
            </Typography>

            {error && (
                <Typography color="error" gutterBottom>
                    {error}
                </Typography>
            )}

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid container spacing={3}>
                    {/* Listing Information */}
                    <Grid item xs={12} md={4}>
                        <TextField
                            label="Estado del Listado"
                            value={formData.listingStatus}
                            onChange={(e) => handleChange('listingStatus', e.target.value)}
                            fullWidth
                            disabled={!isEditing}
                            InputProps={{
                                startAdornment: <Edit style={{ marginRight: 8 }} />,
                            }}
                            required 
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <DatePicker
                            label="Fecha de Cambio de Estado"
                            value={formData.statusChangeDate}
                            onChange={(date: Dayjs | null) => handleChange('statusChangeDate', date)}
                            disabled={!isEditing}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    InputProps={{
                                        startAdornment: <CalendarMonth style={{ marginRight: 8 }} />,
                                    }}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            label="Precio de Lista"
                            type="number"
                            value={formData.listPrice}
                            onChange={(e) => handleChange('listPrice', Number(e.target.value))}
                            fullWidth
                            disabled={!isEditing}
                            InputProps={{
                                startAdornment: <Numbers style={{ marginRight: 8 }} />,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            label="Días en el Mercado"
                            type="number"
                            value={formData.daysOnMarket}
                            onChange={(e) => handleChange('daysOnMarket', Number(e.target.value))}
                            fullWidth
                            disabled={!isEditing}
                            InputProps={{
                                startAdornment: <Numbers style={{ marginRight: 8 }} />,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            label="ID de MLS"
                            value={formData.mlsID}
                            onChange={(e) => handleChange('mlsID', e.target.value)}
                            fullWidth
                            disabled={!isEditing}
                            InputProps={{
                                startAdornment: <Numbers style={{ marginRight: 8 }} />,
                            }}
                            required 
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            label="Tipo de Propiedad"
                            value={formData.propertyType}
                            onChange={(e) => handleChange('propertyType', e.target.value)}
                            fullWidth
                            disabled={!isEditing}
                            InputProps={{
                                startAdornment: <Home style={{ marginRight: 8 }} />,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            label="Habitaciones"
                            type="number"
                            value={formData.bedrooms}
                            onChange={(e) => handleChange('bedrooms', Number(e.target.value))}
                            fullWidth
                            disabled={!isEditing}
                            InputProps={{
                                startAdornment: <Home style={{ marginRight: 8 }} />,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            label="Oficina de Listado"
                            value={formData.listOffice}
                            onChange={(e) => handleChange('listOffice', e.target.value)}
                            fullWidth
                            disabled={!isEditing}
                            InputProps={{
                                startAdornment: <LocationOn style={{ marginRight: 8 }} />,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            label="Baños"
                            type="number"
                            value={formData.bathrooms}
                            onChange={(e) => handleChange('bathrooms', Number(e.target.value))}
                            fullWidth
                            disabled={!isEditing}
                            InputProps={{
                                startAdornment: <Home style={{ marginRight: 8 }} />,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            label="Metros Cuadrados"
                            type="number"
                            value={formData.squareFootage}
                            onChange={(e) => handleChange('squareFootage', Number(e.target.value))}
                            fullWidth
                            disabled={!isEditing}
                            InputProps={{
                                startAdornment: <Home style={{ marginRight: 8 }} />,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            label="Nombre de MLS"
                            value={formData.mlsName}
                            onChange={(e) => handleChange('mlsName', e.target.value)}
                            fullWidth
                            disabled={!isEditing}
                            InputProps={{
                                startAdornment: <Numbers style={{ marginRight: 8 }} />,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            label="Año de Construcción"
                            type="number"
                            value={formData.yearBuilt}
                            onChange={(e) => handleChange('yearBuilt', Number(e.target.value))}
                            fullWidth
                            disabled={!isEditing}
                            InputProps={{
                                startAdornment: <CalendarMonth style={{ marginRight: 8 }} />,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            label="Agente de Listado"
                            value={formData.listAgent}
                            onChange={(e) => handleChange('listAgent', e.target.value)}
                            fullWidth
                            disabled={!isEditing}
                            InputProps={{
                                startAdornment: <Person style={{ marginRight: 8 }} />,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            label="Subdivisión"
                            value={formData.subdivision}
                            onChange={(e) => handleChange('subdivision', e.target.value)}
                            fullWidth
                            disabled={!isEditing}
                            InputProps={{
                                startAdornment: <LocationOn style={{ marginRight: 8 }} />,
                            }}
                        />
                    </Grid>

                    {/* Buttons */}
                    <Grid item xs={12}>
                        {isEditing ? (
                            <Box>
                                <Button
                                    variant="contained"
                                    onClick={handleSave}
                                    sx={{ mr: 2, backgroundColor: '#4caf50', color: 'white' }}
                                >
                                    <Save style={{ marginRight: 8 }} /> Guardar
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={handleCancel}
                                    sx={{ color: '#f44336' }} 
                                >
                                     <Cancel style={{ marginRight: 8 }}/> Cancelar
                                </Button>
                            </Box>
                        ) : (
                            <Button
                                variant="contained"
                                onClick={() => setIsEditing(true)}
                                sx={{ backgroundColor: '#1976d2', color: 'white' }}
                            >
                                <Edit style={{ marginRight: 8 }} /> Editar
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </LocalizationProvider>
        </Box>
    );
};

export default MojoForm;
