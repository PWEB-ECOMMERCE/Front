import React, { useState, useEffect } from 'react';
import { Container, Typography, Button } from '@mui/material';
import CardCart from '@/components/CardCart';
import { useRouter } from 'next/navigation';

export default function CartPage() {
    const [products, setProducts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const savedProducts = localStorage.getItem('cart');
        if (savedProducts) {
            setProducts(JSON.parse(savedProducts));
        }
    }, []);


    const updateQuantity = (id, newQuantity) => {
        setProducts((prevProducts) => {
            const updatedProducts = prevProducts.map(product =>
                product.id === id ? { ...product, quant: newQuantity } : product
            );

            localStorage.setItem('cart', JSON.stringify(updatedProducts));

            return updatedProducts;
        });

        console.log(calculateTotal());
    };

    const calculateTotal = () => {
        return products.reduce((acc, product) => acc + product.preco * product.quant, 0).toFixed(2);
    };

    
    
    const handleFinalizePurchase = async () => {
        
        const user = localStorage.getItem('user');
        const userJson = JSON.parse(user)   
        console.log(userJson)

        const items = products.map(product => ({
            id: product.id,
            qtd: product.quant,
        }));
        const purchaseData = {
            userId: userJson.id,
            itensCarrinho: items,
        };
        console.log(purchaseData)

        try {
            const response = await fetch('http://localhost:8080/venda', {
                method: 'POST',
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
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const goToHome = () => {
        router.push('/Inicio'); 
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

            <Button sx={{ color: 'white', marginRight: 1 }} variant="contained"  onClick={goToHome} >
                Voltar à Página Inicial
            </Button>

            <Button
                sx={{ backgroundColor: "button.buttonFlashy", color: "white" }}
                variant="contained"
                onClick={handleFinalizePurchase}
            >
                Finalizar Compra
            </Button>
        </Container>
    );
}
