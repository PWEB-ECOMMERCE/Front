'use client';
import { useState, useEffect, useContext } from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ShoppingCartIconOutlined from '@mui/icons-material/ShoppingCartOutlined';
import { AppBar, Badge, Toolbar, Button, Box, Typography, Link as MUILink } from '@mui/material';

import Link from 'next/link';

import { AuthContext } from '@/contexts/AuthContext';

const getInitialState = () => {
  const items = localStorage.getItem("cart");
  return items ? JSON.parse(items) : null;
}

export default function Header() {

  const { user, isAuthenticated, signOut } = useContext(AuthContext);

  const [cart, setCart] = useState();
  const cartQnt = cart?.length;

  useEffect(() => {
    const items = getInitialState();
    if(items){
      setCart(items);
    }
  },[]);

  return (
    <AppBar elevation={0} color='transparent' position='static' sx={{ height: 64, border: '1px solid grey' }}>
      <Toolbar>
        <Typography
          variant='h6'
          noWrap
          component='div'
          bgcolor={(theme) => theme.palette.secondary.main}
          color='white'
          sx={{ px: 3, py: 1, borderRadius: 2 }}>
          AWAZON
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexGrow: 1,
            justifyContent: 'space-between',
          }}>
          {
            !isAuthenticated
            ?
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 2,
                mx: 2,
              }}>
              <Button variant='outlined' sx={{ my: '20px', borderColor:'grey' }} color='secondary'>
                <MUILink underline="none" href="/login" component={Link}>Login</MUILink>
              </Button>
              <Button variant='outlined' sx={{ my: '20px', borderColor:'grey' }} color='secondary'>
                <MUILink underline="none" href="/signup" component={Link}>Signup</MUILink>
              </Button>
            </Box>
              :
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 2,
                mx: 2,
              }}>
              <Button variant='outlined' sx={{ my: '20px', borderColor:'grey' }} color='secondary' onClick={signOut}>
                <MUILink underline="none" href="/" component={Link}>Sign Out</MUILink>
              </Button>
            </Box>
          }
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              flexDirection: 'row-reverse',
              alignItems: 'center',
              gap: 2,
            }}>
            {!user?.isAdmin && (
              <Button color='primary'>
                <Badge badgeContent={cartQnt} color='secondary'>
                  <ShoppingCartIconOutlined></ShoppingCartIconOutlined>
                </Badge>
              </Button>
            )}
            {!user?.isAdmin && (
              <Autocomplete
                disableClearable
                freeSolo
                id='search-bar'
                size='small'
                sx={{
                  width: 482,
                }}
                options={[]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Buscar'
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                  />
                )}
              />
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
