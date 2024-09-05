// Import styles from './page.module.css'
'use client';
import { Stack, Button, Grid, TextField, Typography} from '@mui/material';
import { AuthContext } from '@/contexts/AuthContext';
import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import * as yup from 'yup';
import { useFormik, ErrorMessage } from 'formik';

const validationSchema = yup.object({
  firstName: yup
    .string('Digite o novo nome'),
  lastName: yup
    .string('Digite o novo sobrenome'),
  address: yup
    .string('Digite o novo endereço'),
  email: yup
    .string('Digite seu email'),
  login: yup
    .string('Digite um nome de usuário')
    .min(3,'Seu usuário deve ter ao menos 3 caracteres'),
  password: yup
    .string('Digite seu password')
    .min(8,'A senha precisa conter no mínimo 8 caracteres')
})

export default function AccountForm() {
  const { user, setUser, signOut } = useContext(AuthContext);
  const [edit, setEdit] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
      try {
        const data = await fetch(`${process.env.NEXT_PUBLIC_API}/usuarios/esp/${user?.id}`, {
          method: "DELETE",
          credentials: 'include',
        })
        signOut();
      } catch (e){
        console.log(e.message);
      }
  }

  useEffect(() => {
      if (user) {
        const nameData = user?.nome.split(" ") || [];
        const name = nameData[0];
        const lastName = nameData.splice(1).join(" ");
        setInitialValues({
          firstName: name,
          lastName: lastName,
          address: user?.endereco,
          email: user?.email,
          login: user?.username,
          password: '',
        });
      }
    }, [user]);

  const form = useFormik({
    initialValues: initialValues || {
          firstName: '',
          lastName: '',
          address: '',
          email: '',
          login: '',
          password: '',
    },
    enableReinitialize:true,
    validationSchema: validationSchema,
    onSubmit: async (form) => {
      const dataToSubmit = {
        nome: form.firstName + " " + form.lastName,
        email: form.email,
        endereco: form.address,
        login: form.login,
        senha: form.password,
      }
      try {
        const data = await fetch(`${process.env.NEXT_PUBLIC_API}/usuarios/esp/${user?.id}`, {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSubmit)
        })

        const userReq = await fetch(`${process.env.NEXT_PUBLIC_API}/usuarios/esp/${user.id}`, {
          method: "GET",
          credentials: "include"
        })
        const userData = await userReq.json();

        setUser(userData);

      } catch (e){
        console.log(e.message);
      }
    }
  })

  return (
    <Stack component="form" onSubmit={form.handleSubmit} padding={2} gap={2} sx={{width:"30%"}}>
      <Typography variant="h5"> Dados Cadastrais </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="firstName"
              id="firstName"
              label="Nome"
              disabled={!edit}
              value={form.values.firstName}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.firstName && Boolean(form.errors.firstName)}
              helperText={form.touched.firstName && form.errors.firstName}
              autoComplete="given-name"
              fullWidth
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="lastName"
              name="lastName"
              label="Sobrenome"
              disabled={!edit}
              value={form.values.lastName}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.lastName && Boolean(form.errors.lastName)}
              helperText={form.touched.lastName && form.errors.lastName}
              fullWidth
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address"
              name="address"
              label="Endereço"
              disabled={!edit}
              value={form.values.address}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.address && Boolean(form.errors.address)}
              helperText={form.touched.address && form.errors.address}
              fullWidth
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="email"
              name="email"
              label="Email"
              disabled={!edit}
              value={form.values.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.email && Boolean(form.errors.email)}
              helperText={form.touched.email && form.errors.email}
              fullWidth
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="login"
              name="login"
              label="Login"
              disabled={!edit}
              value={form.values.login}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.login && Boolean(form.errors.login)}
              helperText={form.touched.login && form.errors.login}
              fullWidth
              autoComplete="username"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="password"
              id="password"
              label="Senha"
              type="password"
              disabled={!edit}
              value={form.values.password}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.password && Boolean(form.errors.password)}
              helperText={form.touched.password && form.errors.password}
              fullWidth
              autoComplete="new-password"
            />
          </Grid>
        </Grid>
      <Stack direction='row' justifyContent='flex-end' gap={2}>
        <Button
          variant='outlined'
          onClick={()=>{handleDelete()}}
          sx={{
            color:'red'
          }}
        >
          Excluir Conta
        </Button>
          {!edit
          ?
              (<Button
                type='button'
                variant='contained'
                onClick={()=>setEdit(true)}
                sx={{
                  background:(theme)=>theme.palette.button.buttonFlashy,
                  color:'white'
                }}
              >
              Editar Dados
          </Button>)
              :
            (<Button
              type='submit'
              onClick={() => {
                router.push("/");
              }}
              variant='contained'
              sx={{
                background:'green',
                color:'white'
              }}
          >
          Alterar Dados
      </Button>)}
      </Stack>
    </Stack>
  );
}
