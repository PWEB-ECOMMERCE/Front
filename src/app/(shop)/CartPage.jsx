import React, { useState, useEffect } from 'react';
import { Container, Typography, Divider, Button } from '@mui/material';
import CardCart from '@/components/CardCart';

export default function CartPage() {
    const [products, setProducts] = useState([]);

    // Função para carregar os produtos do localStorage
    useEffect(() => {
        const savedProducts = localStorage.getItem('cart');
        if (savedProducts) {
            setProducts(JSON.parse(savedProducts));
        }
    }, []);

    const calculateTotal = () => {
        return products.reduce((acc, product) => acc + product.preco * product.quantidade, 0).toFixed(2);
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
                    name={product.nome}
                    price={product.preco}
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
