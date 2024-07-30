'use client';
import { Box, Stack, List, ListItemButton, Link } from '@mui/material';
import { useState, useContext } from 'react';

import { AuthContext } from '@/contexts/AuthContext';

// Just for testing purposes
// The structure should be a list of objects {label, href}
const clientButtons = [
  {name:'Inicio',to:'/'},
  {name:'Meus Pedidos',to:'/'},
  {name:'Produtos',to:'/'},
  {name:'Conta',to:"/account"},
  {name:'Sair',to:'/logout'},
];
const anonymousButtons = [
  {name:'Inicio',to:'/'},
  {name:'Produtos',to:'/'},
];
const adminButtons = [
  {name:'Inicio',to:'/'},
  {name:'Produtos e Categorias',to:'/'},
  {name:'Vendas',to:'/'},
  {name:'Conta',to:'/'},
  {name:'Sair',to:'/logout'},
];

export default function SideBar() {

  const { user } = useContext(AuthContext);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const data = user ? (user?.isAdmin ? adminButtons : clientButtons) : anonymousButtons;
  const handleListItemClick = (event,index) => {
    setSelectedIndex(index)
    console.log(user);
  }
  return (
    <Stack sx={{border: '1px solid grey', borderWidth: '0 1px 0 1px', width: 248 }} direction='row'>
      <Stack
        sx={{
          flexGrow: 1,
          minHeight: '100%',
          width:'100%',
        }}>
        <List sx={{ py: 0 }}>
          {data.map((item, index) => {
              return (
                <ListItemButton
                  key={index}
                  selected={index === selectedIndex}
                  onClick={(event)=> handleListItemClick(event,index)}
                  background='primary'
                  component={Link}
                  to={item.to}
                  sx={{
                    px: 2,
                    py: '10px',
                  }}>
                  {item.name}
                </ListItemButton>
              );
          })}
        </List>
      </Stack>
      <Box sx={{ flexGrow: 3 }}></Box>
    </Stack>
  );
}
