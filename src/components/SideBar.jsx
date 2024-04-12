'use client';
import { Box, Stack, List, ListItemButton } from '@mui/material';
import { useState } from 'react';

// Just for testing purposes
// The structure should be a list of objects {label, href}
const clientButtons = ['Inicio', 'Meus Pedidos', 'Produtos', 'Conta'];
const anonymousButtons = ['Inicio','Produtos','List Item','List Item','List Item'];
const adminButtons = ['Inicio', 'Produtos e Categorias', 'Vendas', 'Conta', 'Sair'];

export default function SideBar({userStatus, options}) {

  const data = userStatus === 'admin' ? adminButtons : userStatus === 'client' ? clientButtons : anonymousButtons;
  const [selectedIndex, setSelectedIndex] = useState(1);
  const handleListItemClick = (event,index) => {
    setSelectedIndex(index)
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
                  sx={{
                    px: 2,
                    py: '10px',
                  }}>
                  {item}
                </ListItemButton>
              );
          })}
        </List>
      </Stack>
      <Box sx={{ flexGrow: 3 }}></Box>
    </Stack>
  );
}
