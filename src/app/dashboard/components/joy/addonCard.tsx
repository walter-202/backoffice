'use client'

import * as React from 'react';
import { Card, CardContent, Typography, IconButton, Chip } from '@mui/joy';
import DeleteIcon from '@mui/icons-material/Delete';

interface AddonCardProps {
    nombre: string;
    price: string;
    amount: string;
    total: string;
    onDelete: () => void;
}

export const AddonCard: React.FC<AddonCardProps> = ({ nombre, price, amount, total, onDelete }) => {
    return (
        <Card
            orientation="horizontal"
            size="sm"
            sx={{
                width: '100%',
                maxWidth: 320,
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'background.level1',
                padding: 1.5,
                borderRadius: 'md',
            }}
        >
            <CardContent sx={{ flex: '1 1 auto' }}>


                <Chip color="success" size="md" variant="outlined" sx={{ borderRadius: 'md', alignSelf:'center', textAlign:'center',marginBottom:'4px'  }}>
                    {nombre.length>19 ? nombre.slice(0,20).concat(" ...") : nombre}
                </Chip>

               {/* <Typography level="title-md" className="text-center">{nombre}</Typography>*/}

                <Typography level="body-sm">
                    Price: {price} - Amount: {amount}
                </Typography>
                <Typography level="body-xs" color="neutral">
                    Total: {total}
                </Typography>

                <IconButton size="sm" color="danger" onClick={onDelete} sx={{ width:'20px', alignSelf:'center'}} >
                    <DeleteIcon />
                </IconButton>
            </CardContent>

            {/*<Chip color="warning" size="sm" variant="soft" sx={{ borderRadius: 'md', writingMode: 'vertical-rl' }}>
                Addon
            </Chip>*/}



        </Card>
    );
};
