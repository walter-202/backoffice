"use client"
import React, { useState, useEffect } from 'react';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const port = process.env.NEXT_PUBLIC_PORT;
function ListRequest() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            try {

                const response = await fetch(`${baseUrl}:${port}/request/AllbyAdmin`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log(response)
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

            <h1>Request List</h1>
            {requests.map((request) => (
                <div key={request.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                    <h3>Request ID: {request.id}</h3>
                    <p>Person ID: {request.person.pkPerson}</p>
                    <p>Person Name: {request.person.firstName} {request.person.middleName} {request.person.lastName}</p>
                    <p>Request Date: {new Date(request.dateRequest).toLocaleDateString()}</p>
                    <p>Status: {request.status}</p>
                    <p>Description: {request.description}</p>
                    <p>Created At: {new Date(request.createdAt).toLocaleString()}</p>
                    <p>Updated At: {new Date(request.updatedAt).toLocaleString()}</p>
                    <p>Priority: {request.priority.name}</p>

                    <h4>Locations:</h4>
                    {request.locations.map((location) => (
                        <div key={location.id} style={{ marginLeft: '20px' }}>
                            <p>Location ID: {location.id}</p>
                            <p>Google Maps URL: <a href={location.urlGoogleMap} target="_blank" rel="noopener noreferrer">{location.urlGoogleMap}</a></p>
                            <p>Latitude: {location.latitude}</p>
                            <p>Longitude: {location.longitude}</p>
                            <p>Location Status: {location.status}</p>
                        </div>
                    ))}

                    <h4>Images:</h4>
                    {request.images.map((image) => (
                        <div key={image.id} style={{ marginLeft: '20px' }}>
                            <p>Image ID: {image.id}</p>
                            <p>Image URL: <a href={image.urlImage} target="_blank" rel="noopener noreferrer">{image.urlImage}</a></p>
                            <p>Image Status: {image.status}</p>
                        </div>
                    ))}
                </div>
            ))}

        </div>
    );
}

export default ListRequest;