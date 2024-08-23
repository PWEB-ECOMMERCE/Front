// Import styles from './page.module.css'
'use client';
import { useContext, useEffect, useState } from 'react';
import { Box,Grid,Container, Button,Typography } from '@mui/material';
import ProductCard from "@/components/ProductCard"
import { productsMock } from "@/mocks/productsMock";


import { AuthContext } from '@/contexts/AuthContext';


const categoryButtons = [
  {name:'Eletrônicos',to:'/'},
  {name:'Cozinha',to:'/'},
  {name:'Ferramenta',to:'/'},
  {name:'Livros',to:"/account"},
];

export default function Shop() {
  const [produtos, setProdutos] = useState([])
  const [categorias, setCategorias] = useState([])
  const { user, isAuthenticated } = useContext(AuthContext);
  const getProdutos = async () => {
    const produtosData = await fetch(`${process.env.NEXT_PUBLIC_API}/produto`, {
      method: "GET",
      credentials: "include"
    })
    const prodData = await produtosData.json();
    setProdutos(prodData);
    
  }
  const getCategorias = async () => {
    const categoriasData = await fetch(`${process.env.NEXT_PUBLIC_API}/categoria`, {
      method: "GET",
      credentials: "include"
    })
    const catData = await categoriasData.json();
    setCategorias(catData);
  }

  useEffect(() => {
    getProdutos();
    getCategorias();
    
  }, [])
  

  return (
    <Box height={"full"} margin={"auto"} width={"100%"} textAlign={"center"} >
      {isAuthenticated
      ?
      user.admin ?
      (
        <Container style={{ textAlign: 'center' }}>
              <Typography variant="h2" gutterBottom>
                Em Construção
              </Typography>
              <Box component="img" src="/construction.png" alt="Em Construção" sx={{ width: '100%', margin: 'auto' }} />
            </Container>
      )
          :
          <Box my={2} mx={2}>
            <Grid container spacing={1} my={4}>
              {categoryButtons.map( (value,index) => {
                return (
                  <Grid key={index} item xs={4} md={3}>
                    <Button
                      style={{
                        background:"linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(51,51,133,1) 65%)"
                      }}
                      sx={{
                        width:"100%",
                        height:100,
                      }}
                    >
                      <Typography color="white">{value.name}</Typography>
                    </Button>
                  </Grid>
                )
              } )}
            </Grid>
            <Grid container spacing={8}>
              
              {produtos.map( (value,index) => {
                return (
                  <Grid key={index} item xs={4} md={4}>
                    <ProductCard data={value.name}></ProductCard>
                  </Grid>
                )
              } )}
            </Grid>
          </Box>
          :
          <Box my={2} mx={2}>
            <Grid container spacing={1} my={4}>
              
              {categorias.map( (value,index) => {
                return (
                  <Grid key={index} item xs={4} md={3}>
                    <Button
                      style={{
                        background:"linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(51,51,133,1) 65%)"
                      }}
                      sx={{
                        width:"100%",
                        height:100,
                      }}
                    >
                      <Typography color="white">{value.descricao}</Typography>
                    </Button>
                  </Grid>
                )
              } )}
            </Grid>
            <Grid container spacing={8}>
              {produtos.map( (value,index) => {
                return (
                  <Grid key={index} item xs={4} md={4}>
                    <ProductCard data={value} hide></ProductCard>
                  </Grid>
                )
              } )}
            </Grid>
          </Box>
    }
    </Box>
  );
}
