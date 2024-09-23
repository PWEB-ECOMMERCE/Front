import React, { useState } from 'react';
import { Card, CardContent, Grid2, Typography, IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

export default function CardCart({ name, price, initialQuantity }) {
    const [quantity, setQuantity] = useState(initialQuantity);

    const handleAdd = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleRemove = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    const subtotal = quantity * price;

    return (
        <Card sx={{ maxWidth: 600, margin: '20px auto' }}>
            <CardContent>
                <Grid2 container spacing={2} alignItems="center">
                    {/* Nome */}
                    <Grid2 item xs={3}>
                        <Typography variant="body1" component="div">
                            {name}
                        </Typography>
                    </Grid2>

                    {/* Quantidade */}
                    <Grid2 item xs={3}>
                        <IconButton onClick={handleRemove} size="small" aria-label="remove">
                            <Remove />
                        </IconButton>
                        <Typography variant="body1" component="span" style={{ margin: '0 10px' }}>
                            {quantity}
                        </Typography>
                        <IconButton onClick={handleAdd} size="small" aria-label="add">
                            <Add />
                        </IconButton>
                    </Grid2>

                    {/* Preço */}
                    <Grid2 item xs={3}>
                        <Typography variant="body1" component="div">
                            R$ {price.toFixed(2)}
                        </Typography>
                    </Grid2>

                    {/* Subtotal */}
                    <Grid2 item xs={3}>
                        <Typography variant="body1" component="div">
                            R$ {subtotal.toFixed(2)}
                        </Typography>
                    </Grid2>
                </Grid2>
            </CardContent>
        </Card>
    );
}
