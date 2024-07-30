// Import styles from './page.module.css'
'use client';
import { useContext } from 'react';
import { Box,Grid,Button,Typography } from '@mui/material';
import ProductCard from "@/components/ProductCard"


import { AuthContext } from '@/contexts/AuthContext';

const list = [1,2,3,4,5,6,7]
const categoryButtons = [
  {name:'Eletrônicos',to:'/'},
  {name:'Cozinha',to:'/'},
  {name:'Ferramenta',to:'/'},
  {name:'Livros',to:"/account"},
];

export default function Shop() {
  const { user, isAuthenticated } = useContext(AuthContext);
  return (
    <Box height={"full"} margin={"auto"} width={"100%"} textAlign={"center"} >
      {isAuthenticated
      ?
      (<Box>
        <Box>Olá, <b>{user?.nome}</b></Box>
        <Box>Seus dados são: </Box>
        <Box>email: {user?.email}</Box>
        <Box>endereco: {user?.endereco}</Box>
        <Box>id: {user?.id}</Box>
      </Box>)
          :
          <Box my={2} mx={2}>
            <Grid container spacing={1} my={4}>
              {categoryButtons.map( (value,index) => {
                return (
                  <Grid key={value} item xs={4} md={3}>
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
              {list.map( (value,index) => {
                return (
                  <Grid key={value} item xs={4} md={4}>
                    <ProductCard ></ProductCard>
                  </Grid>
                )
              } )}
            </Grid>
          </Box>
    }
    </Box>
  );
}
