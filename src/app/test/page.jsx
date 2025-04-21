"use client"
import React, {useEffect, useState} from 'react';
import {RequestDataTable,FormInfo} from "../dashboard/components/request";
import {boolean} from "yup";
import ModalDialog from "@mui/joy/ModalDialog";
import {ModalClose} from "@mui/joy";
import Typography from "@mui/joy/Typography";
import Modal from "@mui/joy/Modal";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const port = process.env.NEXT_PUBLIC_PORT;
//const urlEndpoint = `${baseUrl}:${port}/request/forTableList`
const urlEndpoint = 'http://localhost:12099/request/forTableList'

function Page(props) {

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchRequests = async () => {
            try {

                const response = await fetch(urlEndpoint, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                setRequests(data);

                setLoading(false);
            } catch (e) {
                setError(e);
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    if (loading) {
        return <p>Loading requests...</p>;
    }

    if (error) {
        return <p>Error fetching requests: {error.message}</p>;
    }
    
    return (
        <div>
            <FormInfo />
            <RequestDataTable  rows={requests}/>
        </div>

    );
}




export default Page;