// Import styles from './page.module.css'
'use client';
import { useContext, useState, useEffect } from 'react';
import { styled, Box,Grid,Container, Button,Typography } from '@mui/material';

import ProductCard from "@/components/ProductCard"
import ReportsPage from "@/components/reports/ReportsPage";
import { AuthContext } from '@/contexts/AuthContext';

const ScrollableBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  overflowX: 'auto',
  whiteSpace: 'nowrap',
  maxWidth: '100%',
  mb: 3,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  marginBottom: theme.spacing(2),
  gap: theme.spacing(1),


  '&::-webkit-scrollbar': {
    height: '8px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'transparent',
    borderRadius: '10px',
  },
  '&:hover::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.primary.main,
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: theme.palette.secondary.main,
  },
  '&::-webkit-scrollbar-button': {
    display: 'none',
  },
  '&::-webkit-scrollbar-corner': {
    backgroundColor: 'transparent',
  },
  '&::-webkit-scrollbar-thumb:vertical': {
    width: '6px',
  },
  '&::-webkit-scrollbar-thumb:horizontal': {
    height: '6px',
  },
}));

export default function Inicio() {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [ products, setProducts ] = useState([]);
  const [ categoryButtons, setCategoryButtons ] = useState();
  const [ categoryID, setCategoryID ] = useState(-1);

  const handleCategoryClick = (value) =>{
    setCategoryID(value);
    console.log("Click:",value)
  }

  useEffect( () => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8080/categoria', {
        })

        if (response.status === 200){
          const lista = await response.json()
          setCategoryButtons([{id:-1,name:"Todos"},...lista.map( (value) => {return {name:value.descricao, id:value.id}} )])
          setCategoryID(-1)
        }
      } catch (error) {
        console.error(error)
      }
    }
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/produto', {
        })

        if (response.status === 200){
          const lista = await response.json()
          setProducts(lista)
        }


      } catch (error) {
        console.error(error)
      }
    }
    fetchCategories();
  }, [] )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/produto', {
        })

        if (response.status === 200){
          const lista = await response.json()
          setProducts(lista)
        }


      } catch (error) {
        console.error(error)
      }
    }
    const fetchProductsByCategory = async (id) => {
      try {
        const response = await fetch(`http://localhost:8080/produto/cat/${id}`, {
        })

        if (response.status === 200){
         const lista = await response.json()
          setProducts(lista)
        }


      } catch (error) {
        console.error(error)
      }
    }
    if(categoryID === -1){
      fetchData();
    } else {
      fetchProductsByCategory(categoryID)
    }
  }, [categoryID] )

  return (
    <Box height={"full"} margin={"auto"} sx={{overflowX:"hidden"}} width={"100%"} textAlign={"center"} >
      {isAuthenticated
      ?
      user.admin ?
      (
        <Box minHeight="100vh">
          <ReportsPage></ReportsPage>
        </Box>
      )
          :
          <Box my={2} mx={2} minHeight="100vh">
            <ScrollableBox>
                {categoryButtons?.map( (value,index) => {
                  return (
                      <Button
                        key={index}
                        style={{
                          background:categoryID===value.id?"linear-gradient(0deg, rgba(20,0,20,1) 0%, rgba(51,51,51,1) 65%)":"linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(51,51,133,1) 65%)"
                        }}
                        onClick={() => handleCategoryClick(value.id)}
                        sx={{
                          minWidth:350,
                          height:100,
                        }}
                      >
                        <Typography color="white">{value.name}</Typography>
                      </Button>
                  )
                } )}
            </ScrollableBox>
            <Grid container spacing={8}>
              {products.map( (value,index) => {
                if (value.quantidade > 0){
                  return (
                    <Grid key={index} item xs={4} md={4}>
                      <ProductCard data={value} outOfStock></ProductCard>
                    </Grid>
                  )
                }
                return (
                  <Grid key={index} item xs={4} md={4}>
                    <ProductCard data={value}></ProductCard>
                  </Grid>
                )
              } )}
            </Grid>
          </Box>
          :
          <Box my={2} mx={2} minHeight="100vh">
            <ScrollableBox>
              {categoryButtons?.map( (value,index) => {
                return (
                    <Button
                      key={index}
                      style={{
                          background:categoryID===value.id?"linear-gradient(0deg, rgba(20,0,20,1) 0%, rgba(51,51,51,1) 65%)":"linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(51,51,133,1) 65%)"
                      }}
                      onClick={() => handleCategoryClick(value.id)}
                      sx={{
                        minWidth:350,
                        height:100,
                      }}
                    >
                      <Typography color="white">{value.name}</Typography>
                    </Button>
                )
              } )}
            </ScrollableBox>
            <Grid container spacing={8}>
              {products.map( (value,index) => {
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
