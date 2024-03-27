'use client';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { ThemeProvider } from '@mui/material/styles';
import theme from 'utils/theme'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.


export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent:'center',
            margin:'auto',
            height:'100vh'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Box
            sx={{
              alignSelf:'start',
            }}
          >
            <Typography component="h1" variant="h5">
              Cadastre-se
            </Typography>
            <Typography component="h1" variant="body2">
              Insira suas informações
            </Typography>
          </Box>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Nome"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Sobrenome"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Endereço"
                  name="address"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="login"
                  label="Login"
                  name="login"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <FormControlLabel
              sx={{marginY:"8px",marginX:"4px"}}
              control={<Checkbox value="remember" color="primary" />}
              label={
                <p>
                  Eu aceito os
                  <Link
                    href="/login"
                  >
                    {" Termos de Condições"}
                  </Link>
                </p>
              }
            />
            <Box
              sx={{
                display:'flex',
                justifyContent:'flex-end'
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2, mr: 2, backgroundColor:"button.buttonModest"}}
                href="/login"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2,color:"white", backgroundColor:"button.buttonFlashy" }}
              >
                Cadastrar
              </Button>
            </Box>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Já tem uma conta? Clique aqui
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
