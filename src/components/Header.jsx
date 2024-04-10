'use client';
import {useState, useEffect} from 'react';
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import ShoppingCartIconOutlined from '@mui/icons-material/ShoppingCartOutlined';
import {
  AppBar,
  Badge,
  Toolbar,
  Button,
  Box,
  Container,
  Typography
} from '@mui/material';

export default function Header(search,cart){

  const [enableSearch,setEnableSearch] = useState(search);
  const [enableCart,setEnableCart] = useState(cart);

  return (
    <AppBar position="static" sx={{height:64}}>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          bgcolor={theme => theme.palette.secondary.main}
          sx={{px:3,py:1, borderRadius:2}}
        >
          AWAZON
        </Typography>
        <Box  sx={{
          display:'flex',
          flexDirection:'row',
          flexGrow:1,
          justifyContent:'space-between'
        }}>
          <Box
            sx={{
              display:'flex',
              flexDirection:'row',
              justifyContent:'center',
              gap:2,
              mx:2,
            }}
          >
            <Button
              variant='outlined'
              sx={{my:"20px"}}
              color='secondary'>Login</Button>
            <Button
              variant='outlined'
              sx={{my:"20px"}}
              color='secondary'>Signup</Button>
          </Box>
          <Box
            sx={{
              display:'flex',
              flexGrow:1,
              flexDirection:'row-reverse',
              alignItems:'center',
              gap:2
            }}
          >
            {
              enableCart &&
              <Badge badgeContent={2} color="secondary">
                <ShoppingCartIconOutlined></ShoppingCartIconOutlined>
              </Badge>
            }
            {
              enableSearch &&
              <Autocomplete
                disableClearable
                freeSolo
                id="search-bar"
                size='small'
                sx={{
                  width:482,
                }}
                options={[]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Buscar"
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                  />
                )}
              />
            }
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
