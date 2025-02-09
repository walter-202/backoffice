"use client";

import * as React from 'react';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useState, useMemo } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

interface Row {
    id: number;
    lastName: string | null;
    firstName: string | null;
    age: number | null;
}

const rowsData: Row[] = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const defaultTheme = createTheme();

export default function UsersPage() {
    const [searchText, setSearchText] = useState('');
    const [rows, setRows] = useState(rowsData);

    const columns: GridColDef[] = useMemo(() => [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 90,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (params: { row: Row }) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            getActions: (params) => [
                <GridActionsCellItem icon={<VisibilityIcon />} label="View" onClick={() => { console.log("View clicked for row:", params.id) }} />,
                <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={() => { console.log("Edit clicked for row:", params.id) }} />,
                <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => { console.log("Delete clicked for row:", params.id) }} />,
            ],
        },
    ], []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);

        const filteredRows = rowsData.filter(row => {
            const fullName = `${row.firstName} ${row.lastName}`.toLowerCase();
            return fullName.includes(event.target.value.toLowerCase());
        });
        setRows(filteredRows);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Paper sx={{ height: 400, width: '80%', margin: '20px auto' }}>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchText}
                    onChange={handleSearchChange}
                    sx={{ margin: '16px', width: 'calc(100% - 32px)' }}
                />
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 0, '& .MuiDataGrid-cell': { padding: '8px' } }}
                />
            </Paper>
        </ThemeProvider>
    );
}