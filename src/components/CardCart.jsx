import React, { useState } from 'react';
import { Card, CardContent, Grid, Typography, IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

export default function CardCart({ id, name, price, quant, stock, onUpdateQuantity }) {
    const [quantity, setQuantity] = useState(quant);

    const handleAdd = () => {
        if (quantity < stock) {
            const newQuantity = quantity + 1;
            setQuantity(newQuantity);
            onUpdateQuantity(id, newQuantity); 
        }
    };

    const handleRemove = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            onUpdateQuantity(id, newQuantity); 
        }
    };

    const subtotal = quantity * price;

    return (
        <Card sx={{ maxWidth: 600, margin: '20px auto' }}>
            <CardContent>
                <Grid container spacing={2} alignItems="center">
                    {/* Nome */}
                    <Grid item xs={3}>
                        <Typography variant="body1" component="div">
                            {name}
                        </Typography>
                    </Grid>

                    {/* Quantidade */}
                    <Grid item xs={3}>
                        <IconButton onClick={handleRemove} size="small" aria-label="remove">
                            <Remove />
                        </IconButton>
                        <Typography variant="body1" component="span" style={{ margin: '0 10px' }}>
                            {quantity}
                        </Typography>
                        <IconButton onClick={handleAdd} size="small" aria-label="add">
                            <Add />
                        </IconButton>
                    </Grid>

                    {/* Preço */}
                    <Grid item xs={3}>
                        <Typography variant="body1" component="div">
                            R$ {price.toFixed(2)}
                        </Typography>
                    </Grid>

                    {/* Subtotal */}
                    <Grid item xs={3}>
                        <Typography variant="body1" component="div">
                            R$ {subtotal.toFixed(2)}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
