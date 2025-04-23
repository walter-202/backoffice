// components/SummaryCard.tsx
import { Card, CardContent, Typography, Divider, Box } from '@mui/joy';

type Addon = {
    id: number;
    nombre: string;
    price: string;
    amount: string;
    total: string;
};

interface Props {
    serviceName: string;
    addons: Addon[];
}

export default function SummaryCard({ serviceName, addons }: Props) {
    const total = addons.reduce((sum, addon) => sum + Number(addon.total), 0);

    return (
        <Card variant="outlined" sx={{ mb: 2,  display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography sx={{ marginLeft: '20px' }}>{serviceName}</Typography>
                <Divider sx={{ my: 1 }} />


                <Box
                    sx={{
                        overflowY: 'auto',
                        maxHeight: 300, // ajusta a lo que necesites
                        pr: 1,
                        padding:'20px'
                    }}
                >
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: 1,
                        }}
                    >
                        {addons.map((addon) => (
                            <Box
                                key={addon.id}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    p: 1,
                                }}
                            >
                                <Typography fontWeight="bold">{addon.nombre}</Typography>
                                <Typography fontSize="sm">
                                    {addon.amount} × ${addon.price} = ${addon.total}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>

                <Divider sx={{ my: 1 }} />
                <Typography level="body-md" textAlign="right">
                    <strong>Total: ${total.toFixed(2)}</strong>
                </Typography>
            </CardContent>
        </Card>
    );
}
