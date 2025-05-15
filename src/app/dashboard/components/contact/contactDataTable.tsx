"use client"
import React, {useEffect, useState} from 'react';
import DataTable from "@interfaces/dataTable";
import {ContactEntityForDataTable, contactHeadDataTableInfo} from "@interfaces/contact";
import ContactForm from "/contactForm"
import { Modal, Box, CircularProgress } from '@mui/material';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const port = process.env.NEXT_PUBLIC_PORT;
const urlEndpoint = `${baseUrl}:${port}/request/forTableList`


const dummyData: ContactEntityForDataTable[] = [

    {
        pkContact: 2,
        firstName: 'Alice',
        lastName: 'Smith 2',
        status: 'Pending2',
        middleName: 'nothing',
        phone: '+1 555 555 55',
        email: '@gmail.com',
    },{
        pkContact: 1,
        firstName: 'John',
        lastName: 'Doe',
        status: 'Pending',
        middleName: 'Mer',
        phone: '+1 555 555 55',
        email: '@gmail.com',
    },{
        pkContact: 1,
        firstName: 'John',
        lastName: 'Doe',
        status: 'Pending',
        middleName: 'Mer',
        phone: '+1 555 555 55',
        email: '@gmail.com',
    },{
        pkContact: 1,
        firstName: 'John',
        lastName: 'Doe',
        status: 'Pending',
        middleName: 'Mer',
        phone: '+1 555 555 55',
        email: '@gmail.com',
    },{
        pkContact: 1,
        firstName: 'John',
        lastName: 'Doe',
        status: 'Pending',
        middleName: 'Mer',
        phone: '+1 555 555 55',
        email: '@gmail.com',
    },{
        pkContact: 1,
        firstName: 'John',
        lastName: 'Doe',
        status: 'Pending',
        middleName: 'Mer',
        phone: '+1 555 555 55',
        email: '@gmail.com',
    },{
        pkContact: 1,
        firstName: 'John',
        lastName: 'Doe',
        status: 'Pending',
        middleName: 'Mer',
        phone: '+1 555 555 55',
        email: '@gmail.com',
    },{
        pkContact: 1,
        firstName: 'John',
        lastName: 'Doe',
        status: 'Pending',
        middleName: 'Mer',
        phone: '+1 555 555 55',
        email: '@gmail.com',
    },{
        pkContact: 1,
        firstName: 'John',
        lastName: 'Doe',
        status: 'Pending',
        middleName: 'Mer',
        phone: '+1 555 555 55',
        email: '@gmail.com',
    },{
        pkContact: 1,
        firstName: 'John',
        lastName: 'Doe',
        status: 'Pending',
        middleName: 'Mer',
        phone: '+1 555 555 55',
        email: '@gmail.com',
    },{
        pkContact: 1,
        firstName: 'John',
        lastName: 'Doe',
        status: 'Pending',
        middleName: 'Mer',
        phone: '+1 555 555 55',
        email: '@gmail.com',
    },{
        pkContact: 1,
        firstName: 'John',
        lastName: 'Doe',
        status: 'Pending',
        middleName: 'Mer',
        phone: '+1 555 555 55',
        email: '@gmail.com',
    },{
        pkContact: 1,
        firstName: 'John',
        lastName: 'Doe',
        status: 'Pending',
        middleName: 'Mer',
        phone: '+1 555 555 55',
        email: '@gmail.com',
    },{
        pkContact: 1,
        firstName: 'John',
        lastName: 'Doe',
        status: 'Pending',
        middleName: 'Mer',
        phone: '+1 555 555 55',
        email: '@gmail.com',
    },{
        pkContact: 1,
        firstName: 'John',
        lastName: 'Doe',
        status: 'Pending',
        middleName: 'Mer',
        phone: '+1 555 555 55',
        email: '@gmail.com',
    },{
        pkContact: 1,
        firstName: 'John',
        lastName: 'Doe',
        status: 'Pending',
        middleName: 'Mer',
        phone: '+1 555 555 55',
        email: '@gmail.com',
    },

];

function ContactDataTable() {

    const [contactsDataTable, setContactsDataTable] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingButton, setLoadingButton] = useState(false);
    const [error , setError] = useState(null);



    useEffect(() => {

       setLoading(true)
        const fetchData = async () => {
            try {

                const response = await fetch(urlEndpoint, {
                    headers: { 'Content-Type': 'application/json',},
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                setContactsDataTable(data);
                setLoading(false);
            } catch (e:any) {
                setError(e);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <Modal
                open={loading}
                aria-labelledby="loading-modal"
                aria-describedby="loading-indicator"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        p: 4,
                        boxShadow: 24,
                        outline: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <CircularProgress size={80} />
                </Box>
            </Modal>
        );
    }

    if (error) {
        return <p>Error fetching requests: {error}</p>;
    }

    return (
        <div>
            <DataTable <ContactEntityForDataTable>
                rows={dummyData}
                head={contactHeadDataTableInfo}
                title="Contacts Table List"

                onViewComponent={ ContactForm }
                onViewComponentProps={(row) => ({
                    openRecivied: true,
                    idContact: 1,
                    onCloseAction: () => { },
                })}
            />

        </div>
    );
}

export default ContactDataTable;