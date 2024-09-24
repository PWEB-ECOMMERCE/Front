import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Snackbar, Alert } from '@mui/material';
import CardCart from '@/components/CardCart';
import Inicio from './Inicio';

export default function CartPage({ handleContentChange }) {
    const [products, setProducts] = useState([]);
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false); 

    useEffect(() => {
        const savedProducts = localStorage.getItem('cart');
        if (savedProducts) {
            setProducts(JSON.parse(savedProducts));
        }
    }, []);

    const updateQuantity = (id, newQuantity) => {
        setProducts((prevProducts) => {
            const updatedProducts = prevProducts
                .map(product => 
                    product.id === id ? { ...product, quant: newQuantity } : product
                )
                .filter(product => product.quant > 0); 
    
            localStorage.setItem('cart', JSON.stringify(updatedProducts));
            return updatedProducts;
        });
    };

    const calculateTotal = () => {
        return products.reduce((acc, product) => acc + product.preco * product.quant, 0).toFixed(2);
    };

    const handleFinalizePurchase = async () => {
        
        if (products.length === 0 || products.every(product => product.quant === 0)) {
            setErrorMessage(true); 
            return;
        }

        const user = localStorage.getItem('user');
        const userJson = JSON.parse(user);

        const items = products.map(product => ({
            id: product.id,
            qtd: product.quant,
        }));
        const purchaseData = {
            userId: userJson.id,
            itensCarrinho: items,
        };

        try {
            const response = await fetch('http://localhost:8080/venda', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(purchaseData),
            });

            if (!response.ok) {
                throw new Error('Erro ao finalizar a compra');
            }

            // Limpa o carrinho após a compra
            localStorage.removeItem('cart');
            setProducts([]);

            // Mostra a mensagem de sucesso
            setSuccessMessage(true);
        } catch (error) {
            console.error('Erro:', error);
        }
        window.dispatchEvent(new Event('cartUpdated'));
    };

    return (
        <Container sx={{
            height: 500,
            width: '100%',
            '& .actions': {
                color: 'text.secondary',
            },
            '& .textPrimary': {
                color: 'text.primary',
            },
        }}>
            <div>
                <h1>Meu Carrinho</h1>
            </div>

            {products.map((product) => (
                <CardCart
                    key={product.id}
                    id={product.id}
                    name={product.nome}
                    price={product.preco}
                    quant={product.quant}
                    stock={product.quantidade}
                    onUpdateQuantity={updateQuantity}
                />
            ))}

            <Typography variant="h5" mt={2}>
                Total: R$ {calculateTotal()}
            </Typography>

            <Button sx={{ color: 'white', marginRight: 1 }} variant="contained" onClick={() => handleContentChange(<Inicio />)}>
                Voltar à Página Inicial
            </Button>

            <Button
                sx={{ backgroundColor: "button.buttonFlashy", color: "white" }}
                variant="contained"
                onClick={handleFinalizePurchase}
            >
                Finalizar Compra
            </Button>

            
            <Snackbar
                open={successMessage}
                autoHideDuration={4000}
                onClose={() => setSuccessMessage(false)}
            >
                <Alert onClose={() => setSuccessMessage(false)} severity="success">
                    Compra realizada com sucesso!
                </Alert>
            </Snackbar>

            
            <Snackbar
                open={errorMessage}
                autoHideDuration={4000}
                onClose={() => setErrorMessage(false)}
            >
                <Alert onClose={() => setErrorMessage(false)} severity="error">
                    O carrinho está vazio ou a quantidade de produtos é zero!
                </Alert>
            </Snackbar>
        </Container>
    );
}
