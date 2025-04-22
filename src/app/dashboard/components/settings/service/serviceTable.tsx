import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    TableSortLabel,
    TablePagination,
    Box,
} from '@mui/material';
import { Edit, Visibility, Delete } from '@mui/icons-material';
import { Service } from '../../interface/serviceData';
import { visuallyHidden } from '@mui/utils';

interface ServiceTableProps {
    services: Service[];
    onEdit: (service: Service) => void;
    onView: (service: Service) => void;
    onDelete: (id: number) => void;
    orderBy: string;
    order: 'asc' | 'desc';
    handleSort: (property: string) => void;
    page: number;
    rowsPerPage: number;
    handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    searchQuery: string;
}

const ServiceTable: React.FC<ServiceTableProps> = ({
    services,
    onEdit,
    onView,
    onDelete,
    orderBy,
    order,
    handleSort,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    searchQuery,
}) => {
    const createSortHandler = (property: keyof Service) => (event: React.SyntheticEvent) => {
        handleSort(property);
    };

    const visibleRows = React.useMemo(
        () =>
            services.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [page, rowsPerPage, services],
    );
    console.log("Servicios: "+services);


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="service table">
                <TableHead>
                    <TableRow>
                        <TableCell sortDirection={orderBy === 'name' ? order : false}>
                            <TableSortLabel
                                active={orderBy === 'name'}
                                direction={orderBy === 'name' ? order : 'asc'}
                                onClick={createSortHandler('name')}
                            >
                                Name
                                {orderBy === 'name' ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>Sub-Category</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Client Type</TableCell> 
                        <TableCell>Service Type</TableCell> 
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {visibleRows.map((service) => (
                        <TableRow
                            key={service.pkService}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {service.name}
                            </TableCell>
                            <TableCell>{service.subCategory.name}</TableCell>
                            <TableCell>{service.subCategory.category.name}</TableCell>

                            <TableCell>{service.clientType.pkType !== null ? service.clientType.name : '-'}</TableCell>
                            <TableCell>{service.serviceType.pkType !== null ? service.serviceType.name : '-'}</TableCell>
                            <TableCell align="right">
                                <IconButton aria-label="edit" onClick={() => onEdit(service)}>
                                    <Edit />
                                </IconButton>
                                <IconButton aria-label="view" onClick={() => onView(service)}>
                                    <Visibility />
                                </IconButton>
                                <IconButton aria-label="delete" onClick={() => onDelete(service.pkService)}>
                                    <Delete color="error" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    {services.length === 0 && !searchQuery && (
                        <TableRow>
                            <TableCell colSpan={7} align="center">No services available.</TableCell>
                        </TableRow>
                    )}
                    {services.length > 0 && filteredServices(services, searchQuery).length === 0 && searchQuery && (
                        <TableRow>
                            <TableCell colSpan={7} align="center">No services found matching your search.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={services.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
};

const filteredServices = (services: Service[], query: string) => {
    if (!query) {
        return services;
    }
    const lowerCaseQuery = query.toLowerCase();
    return services.filter(service =>
        service.name.toLowerCase().includes(lowerCaseQuery) ||
        service.description.toLowerCase().includes(lowerCaseQuery)
    );
};

export default ServiceTable;