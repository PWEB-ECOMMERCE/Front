import React, { useState } from 'react';
import { Container, Typography, Divider, Button } from '@mui/material';
import CardCart from '@/components/CardCart';

export default function CartPage() {
    const [products, setProducts] = useState([]);

    const calculateTotal = () => {
        return products.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Carrinho de Compras
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />

            {products.map((product) => (
                <CardCart
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    initialQuantity={product.quantity}
                />
            ))}

            <Divider sx={{ margin: '20px 0' }} />


            <Typography variant="h5">Total: R$ {calculateTotal()}</Typography>


            <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                Finalizar Compra
            </Button>


            <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                    Voltar à Página Inicial
                
            </Button>

        </Container>
    );
}
