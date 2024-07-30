// Import styles from './page.module.css'
'use client';
import { Stack, Button, FormControl, InputLabel, OutlinedInput, FormHelperText, Typography } from '@mui/material';
import { AuthContext } from '@/contexts/AuthContext';
import { useContext } from 'react';

export default function AccountForm() {
  const { user } = useContext(AuthContext);
  console.log(user)
  return (
    <Stack padding={2} gap={2} sx={{width:"30%"}}>
      <Typography variant="h5"> Dados Cadastrais </Typography>
      <FormControl>
        <InputLabel htmlFor="nome">Nome</InputLabel>
        <OutlinedInput id="nome" aria-describedby="nome-helper" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="email">Email</InputLabel>
        <OutlinedInput id="email" aria-describedby="email-helper" />
        <FormHelperText id="email-helper">We&apos;ll never share your email.</FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="address">Endereço</InputLabel>
        <OutlinedInput id="address" aria-describedby="address-helper" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="login">Login</InputLabel>
        <OutlinedInput id="login" aria-describedby="login-helper" />
        <FormHelperText error id="login-helper">Nome indisponível</FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="password">Senha</InputLabel>
        <OutlinedInput id="password" aria-describedby="password-helper" />
        <FormHelperText error id="password-helper">Senha deve ter no mínimo 8 characteres</FormHelperText>
      </FormControl>
      <Stack direction='row' justifyContent='flex-end' gap={2}>
        <Button
          variant='outlined'
          onClick={()=>{console.log("Conta Excluida!")}}
          sx={{
            color:'black'
          }}
        >
          Excluir Conta
        </Button>
        <Button
          type='submit'
          variant='contained'
          sx={{
            background:(theme)=>theme.palette.button.buttonFlashy,
            color:'white'
          }}
        >
          Alterar Dados
        </Button>
      </Stack>
    </Stack>
  );
}
