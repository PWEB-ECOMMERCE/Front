'use client';
import { useState, useEffect, useContext } from 'react';
import { useTheme } from '@mui/material/styles';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ShoppingCartIconOutlined from '@mui/icons-material/ShoppingCartOutlined';
import { useMediaQuery, AppBar, Badge, Toolbar, Button, Box, Typography, Link as MUILink } from '@mui/material';

import Link from 'next/link';

import { AuthContext } from '@/contexts/AuthContext';
import Inicio from '../app/(shop)/Inicio';
import CartPage from '../app/(shop)/CartPage';


const getInitialState = () => {
  const items = localStorage.getItem("cart");
  return items ? JSON.parse(items) : null;
}

export default function Header({handleContentChange}) {

  const { user, isAuthenticated, signOut } = useContext(AuthContext);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [cart, setCart] = useState();
  const cartQnt = cart?.length;

  useEffect(() => {
    const updateCart = () => {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCart(storedCart);
    };

    updateCart();

    window.addEventListener('cartUpdated', updateCart);

    return () => window.removeEventListener('cartUpdated', updateCart);
  },[]);

  // UseEffect(() => {
  //   Const items = getInitialState();
  //   If(items){
  //     SetCart(items);
  //   }
  //
  // },[]);

  return (
    <AppBar elevation={0}  position='fixed' sx={{  borderBottom: '1px groove #cccccc', zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: (theme) => theme.palette.primary.lighter }}>
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
                <MUILink underline="none" href="/login" component={Link}>Entrar</MUILink>
              </Button>
              <Button variant='outlined' sx={{ my: '20px', borderColor:'grey' }} color='secondary'>
                <MUILink underline="none" href="/signup" component={Link}>Cadastrar</MUILink>
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
                <Button
                  variant='outlined'
                  color='secondary' onClick={()=>{signOut();handleContentChange(<Inicio/>)}}>
                <MUILink underline="none" href="/" component={Link}>Sair</MUILink>
                </Button>
                <Typography alignSelf='center'>Bem vindo, {user.nome}</Typography>
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
              <Button color='primary' onClick={()=>{handleContentChange(<CartPage/>)}}>
                <Badge badgeContent={cartQnt} color='secondary'>
                  <ShoppingCartIconOutlined></ShoppingCartIconOutlined>
                </Badge>
              </Button>
            )}
            {!user?.isAdmin && !isSmallScreen && (
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
