'use client'; 

import React, { useState, useEffect } from 'react';
import {
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
} from '@mui/material';
import { Service } from '../../interface/serviceData';

interface ServiceFormProps {
    open: boolean;
    isEdit: boolean;
    onClose: () => void;
    service: Service | null;
    onSave: (serviceData: any) => void;
}

interface Category {
    pkCategory: number;
    name: string;
}

interface SubCategory {
    pkSubCategory: number;
    name: string;
    fkCategory: number;
}

interface ClientType {
    pkClientType: number;
    name: string;
}

interface ServiceType {
    pkServiceType: number;
    name: string;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ open, isEdit, onClose, service, onSave }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<number | ''>('');
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [fkSubCategory, setFkSubCategory] = useState<number | ''>('');
    const [clientTypes, setClientTypes] = useState<ClientType[]>([]);
    const [fkClientType, setFkClientType] = useState<number | ''>(null);
    const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
    const [fkServiceType, setFkServiceType] = useState<number | ''>(null);
    const [status, setStatus] = useState(1);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingSubCategories, setLoadingSubCategories] = useState(false);
    const [loadingClientTypes, setLoadingClientTypes] = useState(true);
    const [loadingServiceTypes, setLoadingServiceTypes] = useState(true);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const port = process.env.NEXT_PUBLIC_PORT;

    useEffect(() => {
        const fetchCategories = async () => {
            setLoadingCategories(true);
            try {
                const response = await fetch(`${baseUrl}:${port}/category/findAll`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoadingCategories(false);
            }
        };

        const fetchClientTypes = async () => {
            setLoadingClientTypes(true);
            try {
                const response = await fetch(`${baseUrl}:${port}/clientType/findAll`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setClientTypes(data);
            } catch (error) {
                console.error("Error fetching client types:", error);
            } finally {
                setLoadingClientTypes(false);
            }
        };

        const fetchServiceTypes = async () => {
            setLoadingServiceTypes(true);
            try {
                const response = await fetch(`${baseUrl}:${port}/servicestype/findAll`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setServiceTypes(data);
            } catch (error) {
                console.error("Error fetching service types:", error);
            } finally {
                setLoadingServiceTypes(false);
            }
        };

        fetchCategories();
        fetchClientTypes();
        fetchServiceTypes();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            const fetchSubCategories = async () => {
                setLoadingSubCategories(true);
                try {
                    const response = await fetch(`${baseUrl}:${port}/subcategory/findAll`);
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                    const data = await response.json();
                    setSubCategories(data.filter(sub => sub.fkCategory === selectedCategory));
                    setFkSubCategory(''); 
                } catch (error) {
                    console.error("Error fetching subcategories:", error);
                } finally {
                    setLoadingSubCategories(false);
                }
            };
            fetchSubCategories();
        } else {
            setSubCategories([]);
            setFkSubCategory('');
        }
    }, [selectedCategory, baseUrl, port]);

    useEffect(() => {
        if (service) {
            setName(service.name || '');
            setDescription(service.description || '');
            setSelectedCategory(service.fk_category ? parseInt(service.fk_category, 10) : '');
            setFkSubCategory(service.fkSubCategory ? service.fkSubCategory : '');
            setFkClientType(service.fkClientType !== undefined ? service.fkClientType : null);
            setFkServiceType(service.fkServiceType !== undefined ? service.fkServiceType : null);
            setStatus(service.status !== undefined ? service.status : 1);
        } else {
            setName('');
            setDescription('');
            setSelectedCategory('');
            setFkSubCategory('');
            setFkClientType(null);
            setFkServiceType(null);
            setStatus(1);
        }
    }, [service, open]);

    const handleSave = () => {
        const serviceData = {
            name,
            description,
            fkSubCategory,
            fkClientType,
            fkServiceType,
            status,
            pkService: service?.pkService,
        };
        onSave(serviceData);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{isEdit && service ? 'Edit Service' : 'Create New Service'}</DialogTitle>
            <DialogContent>
                <FormControl fullWidth margin="dense" required>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        labelId="category-label"
                        id="category"
                        value={selectedCategory}
                        label="Category"
                        onChange={(e) => setSelectedCategory(parseInt(e.target.value, 10))}
                    >
                        <MenuItem value="">
                            <em>Select a category</em>
                        </MenuItem>
                        {loadingCategories ? (
                            <MenuItem disabled>
                                <CircularProgress size={20} /> Loading categories...
                            </MenuItem>
                        ) : (
                            categories.map((category) => (
                                <MenuItem key={category.pkCategory} value={category.pkCategory}>
                                    {category.name}
                                </MenuItem>
                            ))
                        )}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="dense" required disabled={!selectedCategory || loadingSubCategories}>
                    <InputLabel id="subcategory-label">Sub-Category</InputLabel>
                    <Select
                        labelId="subcategory-label"
                        id="subcategory"
                        value={fkSubCategory}
                        label="Sub-Category"
                        onChange={(e) => setFkSubCategory(parseInt(e.target.value, 10))}
                    >
                        <MenuItem value="">
                            <em>Select a sub-category</em>
                        </MenuItem>
                        {loadingSubCategories ? (
                            <MenuItem disabled>
                                <CircularProgress size={20} /> Loading sub-categories...
                            </MenuItem>
                        ) : (
                            subCategories.map((subCategory) => (
                                <MenuItem key={subCategory.pkSubCategory} value={subCategory.pkSubCategory}>
                                    {subCategory.name}
                                </MenuItem>
                            ))
                        )}
                    </Select>
                </FormControl>

                <TextField
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <TextField
                    margin="dense"
                    id="description"
                    label="Description"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <FormControl fullWidth margin="dense">
                    <InputLabel id="client-type-label">Client Type</InputLabel>
                    <Select
                        labelId="client-type-label"
                        id="fkClientType"
                        value={fkClientType}
                        label="Client Type"
                        onChange={(e) => setFkClientType(parseInt(e.target.value, 10))}
                    >
                        <MenuItem value={null}>
                            <em>Select client type (optional)</em>
                        </MenuItem>
                        {loadingClientTypes ? (
                            <MenuItem disabled>
                                <CircularProgress size={20} /> Loading client types...
                            </MenuItem>
                        ) : (
                            clientTypes.map((clientType) => (
                                <MenuItem key={clientType.pkClientType} value={clientType.pkClientType}>
                                    {clientType.name}
                                </MenuItem>
                            ))
                        )}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="dense">
                    <InputLabel id="service-type-label">Service Type</InputLabel>
                    <Select
                        labelId="service-type-label"
                        id="fkServiceType"
                        value={fkServiceType}
                        label="Service Type"
                        onChange={(e) => setFkServiceType(parseInt(e.target.value, 10))}
                    >
                        <MenuItem value={null}>
                            <em>Select service type (optional)</em>
                        </MenuItem>
                        {loadingServiceTypes ? (
                            <MenuItem disabled>
                                <CircularProgress size={20} /> Loading service types...
                            </MenuItem>
                        ) : (
                            serviceTypes.map((serviceType) => (
                                <MenuItem key={serviceType.pkServiceType} value={serviceType.pkServiceType}>
                                    {serviceType.name}
                                </MenuItem>
                            ))
                        )}
                    </Select>
                </FormControl>
                
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} color="primary" disabled={!fkSubCategory}>
                    {isEdit && service ? 'Save Changes' : 'Create'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ServiceForm;