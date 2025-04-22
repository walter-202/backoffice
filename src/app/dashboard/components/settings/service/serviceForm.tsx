'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
    FormHelperText,
} from '@mui/material';
import { Service } from '../../interface/serviceData';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required').nullable(),
    description: Yup.string().nullable(),
    fkCategory: Yup.number().required('Category is required').nullable(),
    fkSubCategory: Yup.number().required('Category is required').nullable(),
    fkClientType: Yup.number().required('Category is required').nullable(),
    fkServiceType: Yup.number().required('Category is required').nullable(),
    status: Yup.number().nullable(),
});

const ServiceForm: React.FC<ServiceFormProps> = ({ open, isEdit, onClose, service, onSave }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [clientTypes, setClientTypes] = useState<ClientType[]>([]);
    const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
    const [loadingCategories, setLoadingCategories] = useState(false);
    const [loadingSubCategories, setLoadingSubCategories] = useState(false);
    const [loadingClientTypes, setLoadingClientTypes] = useState(false);
    const [loadingServiceTypes, setLoadingServiceTypes] = useState(false);
    const [categoriesLoaded, setCategoriesLoaded] = useState(false);
    const [clientTypesLoaded, setClientTypesLoaded] = useState(false);
    const [serviceTypesLoaded, setServiceTypesLoaded] = useState(false);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const port = process.env.NEXT_PUBLIC_PORT;

    const initialValues = {
        name: '',
        description: '',
        fkCategory: '',
        fkSubCategory: '',
        fkClientType: '',
        fkServiceType: '',
        status: 1,
    };

    const formik = useFormik({
        initialValues: service ? {
            name: service.name || '',
            description: service.description || '',
            fkCategory: service.fk_category ? service.fk_category : '',
            fkSubCategory: service.fkSubCategory ? service.fkSubCategory : '',
            fkClientType: service.fkClientType !== undefined ? service.fkClientType : '',
            fkServiceType: service.fkServiceType !== undefined ? service.fkServiceType : '',
            status: service.status !== undefined ? service.status : 1,
        } : initialValues,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            const payload = {
                name: values.name,
                description: values.description,
                fkSubCategory: values.fkSubCategory ? parseInt(values.fkSubCategory.toString(), 10) : null,
                fkClientType: values.fkClientType ? parseInt(values.fkClientType.toString(), 10) : null,
                fkServiceType: values.fkServiceType ? parseInt(values.fkServiceType.toString(), 10) : null,
                status: values.status,
                pkService: service?.pkService,
            };
            onSave(payload);
        },
    });

    const fetchCategories = useCallback(async () => {
        if (categoriesLoaded) return;
        setLoadingCategories(true);
        try {
            const response = await fetch(`${baseUrl}:${port}/category/findAll`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setCategories(data);
            setCategoriesLoaded(true);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoadingCategories(false);
        }
    }, [baseUrl, port, categoriesLoaded]);

    const fetchClientTypes = useCallback(async () => {
        if (clientTypesLoaded) return;
        setLoadingClientTypes(true);
        try {
            const response = await fetch(`${baseUrl}:${port}/clientType/findAll`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setClientTypes(data);
            setClientTypesLoaded(true);
        } catch (error) {
            console.error("Error fetching client types:", error);
        } finally {
            setLoadingClientTypes(false);
        }
    }, [baseUrl, port, clientTypesLoaded]);

    const fetchServiceTypes = useCallback(async () => {
        if (serviceTypesLoaded) return;
        setLoadingServiceTypes(true);
        try {
            const response = await fetch(`${baseUrl}:${port}/servicestype/findAll`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setServiceTypes(data);
            setServiceTypesLoaded(true);
        } catch (error) {
            console.error("Error fetching service types:", error);
        } finally {
            setLoadingServiceTypes(false);
        }
    }, [baseUrl, port, serviceTypesLoaded]);

    useEffect(() => {
        if (open) {
            fetchCategories();
            fetchClientTypes();
            fetchServiceTypes();
        } else {
            setCategoriesLoaded(false);
            setClientTypesLoaded(false);
            setServiceTypesLoaded(false);
            formik.resetForm();
            setSubCategories([]);
        }
    }, [open, fetchCategories, fetchClientTypes, fetchServiceTypes, formik.resetForm]);

    useEffect(() => {
        const fetchSubCategories = async () => {
            formik.setFieldValue('fkSubCategory', ''); // Reset subcategory when category changes
            if (!formik.values.fkCategory) {
                setSubCategories([]);
                return;
            }
            setLoadingSubCategories(true);
            try {
                const response = await fetch(`${baseUrl}:${port}/subcategory/findAll`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setSubCategories(data.filter(sub => sub.fkCategory === formik.values.fkCategory));
            } catch (error) {
                console.error("Error fetching subcategories:", error);
            } finally {
                setLoadingSubCategories(false);
            }
        };

        fetchSubCategories();
    }, [formik.values.fkCategory, baseUrl, port, formik.setFieldValue]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{isEdit && service ? 'Edit Service' : 'Create New Service'}</DialogTitle>
            <DialogContent>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        required
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                    />

                    <FormControl fullWidth margin="dense" error={formik.touched.fkCategory && Boolean(formik.errors.fkCategory)}>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            id="fkCategory"
                            name="fkCategory"
                            value={formik.values.fkCategory}
                            label="Category"
                            onChange={formik.handleChange}
                        >
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
                        {formik.touched.fkCategory && formik.errors.fkCategory && (
                            <FormHelperText>{formik.errors.fkCategory}</FormHelperText>
                        )}
                    </FormControl>

                    <FormControl fullWidth margin="dense" error={formik.touched.fkSubCategory && Boolean(formik.errors.fkSubCategory)} disabled={!formik.values.fkCategory || loadingSubCategories}>
                        <InputLabel id="subcategory-label">Sub-Category</InputLabel>
                        <Select
                            labelId="subcategory-label"
                            id="fkSubCategory"
                            name="fkSubCategory"
                            value={formik.values.fkSubCategory}
                            label="Sub-Category"
                            onChange={formik.handleChange}
                        >
                            {loadingSubCategories ? (
                                <MenuItem disabled>
                                    <CircularProgress size={20} /> Loading sub-categories...
                                </MenuItem>
                            ) : subCategories.length > 0 ? (
                                subCategories.map((subCategory) => (
                                    <MenuItem key={subCategory.pkSubCategory} value={subCategory.pkSubCategory}>
                                        {subCategory.name}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem disabled value="">
                                    No sub-categories available for this category
                                </MenuItem>
                            )}
                        </Select>
                        {formik.touched.fkSubCategory && formik.errors.fkSubCategory && (
                            <FormHelperText>{formik.errors.fkSubCategory}</FormHelperText>
                        )}
                    </FormControl>

                    <FormControl fullWidth margin="dense">
                        <InputLabel id="client-type-label">Client Type</InputLabel>
                        <Select
                            labelId="client-type-label"
                            id="fkClientType"
                            name="fkClientType"
                            value={formik.values.fkClientType}
                            label="Client Type"
                            onChange={formik.handleChange}
                        >
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
                            name="fkServiceType"
                            value={formik.values.fkServiceType}
                            label="Service Type"
                            onChange={formik.handleChange}
                        >
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

                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit" onClick={formik.handleSubmit} color="primary" disabled={!formik.isValid || formik.isSubmitting}>
                    {isEdit && service ? 'Save Changes' : 'Create'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ServiceForm;