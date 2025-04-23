"use client";

import React, { useState, useEffect } from 'react';
import {
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    FormHelperText,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Typography,
    Paper,
    Box,
} from '@mui/material';

import { ServiceAddOn } from "../../interface/serviceType";
import { Delete as DeleteIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface Service {
    pkService: number;
    name: string;
}

interface ServiceAddon {
    pkServiceAddon: number;
    isRetail: number;
    name: string;
    description: string;
    contentWeb: string;
    price: number;
    fkService: number;
}

interface ServiceFormProps {
    open: boolean;
    onClose: () => void;
    service: Service | null;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ open, onClose, service }) => {
    const [editingAddon, setEditingAddon] = useState<ServiceAddon | null>(null);
    const [addons, setAddons] = useState<ServiceAddon[]>([]); 
    const [loadingAddons, setLoadingAddons] = useState(false);
    const [errorLoadingAddons, setErrorLoadingAddons] = useState<string | null>(null);

    const onAddonSave = async (addonData: Omit<ServiceAddon, 'pkServiceAddon' | 'fkService'>) => {
        console.log('Guardando addon:', { ...addonData, fkService: service?.pkService });
        return { pkServiceAddon: Math.random(), ...addonData };
    };

    const onAddonUpdate = async (addonData: ServiceAddon) => {
        console.log('Actualizando addon:', addonData);
        return addonData;
    };

    const onAddonDelete = async (addonId: number) => {
        console.log('Eliminando addon con ID:', addonId);
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required').nullable(),
        description: Yup.string().nullable(),
        contentWeb: Yup.string().nullable(),
        price: Yup.number().required('Price is required').min(0, 'Price cannot be negative').nullable(),
        isRetail: Yup.number().oneOf([0, 1]).required('Retail selection is required').nullable(),
    });

    const initialValues = {
        isRetail: 0,
        name: '',
        description: '',
        contentWeb: '',
        price: 0,
    };

    const formik = useFormik({
        initialValues: editingAddon || initialValues,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            if (!service?.pkService) {
                console.error('No se puede guardar el addon porque no hay un servicio asociado.');
                return;
            }
            const addonDataToSend = { ...values, fkService: service.pkService };
            try {
                if (editingAddon) {
                    await onAddonUpdate({ ...editingAddon, ...addonDataToSend });
                    setAddons(addons.map(addon =>
                        addon.pkServiceAddon === editingAddon.pkServiceAddon ?
                            { ...editingAddon, ...addonDataToSend } : addon
                    ));
                    setEditingAddon(null);
                } else {
                    const newAddon = await onAddonSave(addonDataToSend);
                    if (newAddon && newAddon.pkServiceAddon) {
                        setAddons([...addons, newAddon]);
                    }
                }
                formik.resetForm();
            } catch (error) {
                console.error('Error saving addon:', error);
            }
        },
    });

    useEffect(() => {
        const fetchServiceAddons = async () => {
            if (service?.pkService) {
                setLoadingAddons(true);
                try {
                    const response = await new Promise(resolve => setTimeout(() => {
                        const mockAddons = [
                            { pkServiceAddon: 1, isRetail: 0, name: 'Addon 1', description: 'Description 1', contentWeb: 'Web Content 1', price: 10, fkService: service.pkService },
                            { pkServiceAddon: 2, isRetail: 1, name: 'Addon 2', description: 'Description 2', contentWeb: 'Web Content 2', price: 20, fkService: service.pkService },
                        ];
                        resolve(mockAddons);
                    }, 1000));

                    setAddons(response as ServiceAddon[]);
                    setErrorLoadingAddons(null);
                } catch (error: any) {
                    console.error('Error loading addons:', error);
                    setErrorLoadingAddons(error.message || 'Error loading addons');
                } finally {
                    setLoadingAddons(false);
                }
            } else {
                setAddons([]);
            }
        };

        fetchServiceAddons();
    }, [service?.pkService]);

    useEffect(() => {
        if (editingAddon) {
            formik.setValues({
                isRetail: editingAddon.isRetail,
                name: editingAddon.name,
                description: editingAddon.description || '',
                contentWeb: editingAddon.contentWeb || '',
                price: editingAddon.price,
            });
        } else {
            formik.resetForm();
        }
    }, [editingAddon, formik.setValues, formik.resetForm]);

    const handleEditAddon = (addon: ServiceAddon) => {
        setEditingAddon(addon);
    };

    const handleDeleteAddon = async (addonId: number) => {
        try {
            await onAddonDelete(addonId);
            setAddons(addons.filter((addon) => addon.pkServiceAddon !== addonId));
            setEditingAddon(null);
        } catch (error) {
            console.error('Error deleting addon:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>
                {service ? `Manage Addons for ${service.name}` : 'Manage Addons'}
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} style={{ padding: 16 }}>
                            <form onSubmit={formik.handleSubmit}>
                                
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    id="name"
                                    name="name"
                                    label="Name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    id="description"
                                    name="description"
                                    label="Description"
                                    multiline
                                    rows={2}
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                />
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    id="contentWeb"
                                    name="contentWeb"
                                    label="Content Web"
                                    multiline
                                    rows={2}
                                    value={formik.values.contentWeb}
                                    onChange={formik.handleChange}
                                />
                                
                                <FormControl fullWidth margin="dense">
                                    <InputLabel id="isRetail-label">Is Retail</InputLabel>
                                    <Select
                                        labelId="isRetail-label"
                                        id="isRetail"
                                        name="isRetail"
                                        value={formik.values.isRetail}
                                        label="Is Retail"
                                        onChange={formik.handleChange}
                                        error={formik.touched.isRetail && Boolean(formik.errors.isRetail)}
                                    >
                                        <MenuItem value={0}>No</MenuItem>
                                        <MenuItem value={1}>Yes</MenuItem>
                                    </Select>
                                    {formik.touched.isRetail && formik.errors.isRetail && (
                                        <FormHelperText error>{formik.errors.isRetail}</FormHelperText>
                                    )}
                                </FormControl>
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    id="price"
                                    name="price"
                                    label="Price"
                                    type="number"
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                    error={formik.touched.price && Boolean(formik.errors.price)}
                                    helperText={formik.touched.price && formik.errors.price}
                                />
                                <Box mt={2}>
                                    <Button type="submit" variant="contained" color="primary">
                                        {editingAddon ? 'Save Changes' : 'Add Addon'}
                                    </Button>
                                    <Button onClick={() => setEditingAddon(null)} disabled={!editingAddon} style={{ marginLeft: 8 }}>
                                        Cancel Edit
                                    </Button>
                                </Box>
                            </form>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} style={{ padding: 16 }}>
                            <Typography variant="h6" gutterBottom>
                                Addons for {service?.name}
                            </Typography>
                            {loadingAddons ? (
                                <Box display="flex" justifyContent="center">
                                    <CircularProgress />
                                </Box>
                            ) : errorLoadingAddons ? (
                                <Typography color="error">{errorLoadingAddons}</Typography>
                            ) : (
                                <List>
                                    {addons.map((addon) => (
                                        <ListItem key={addon.pkServiceAddon} divider>
                                            <ListItemText
                                                primary={addon.name}
                                                secondary={`Price: ${addon.price}`}
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="view" onClick={() => handleEditAddon(addon)}>
                                                    <VisibilityIcon />
                                                </IconButton>
                                                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteAddon(addon.pkServiceAddon)}>
                                                    <DeleteIcon color="error" />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))}
                                    {addons.length === 0 && (
                                        <ListItem>
                                            <ListItemText primary={`No addons available for ${service?.name}.`} />
                                        </ListItem>
                                    )}
                                </List>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cerrar</Button>
                {service && (
                    <Typography style={{ marginLeft: 'auto' }}>
                        Service PK: {service.pkService}
                    </Typography>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default ServiceForm;