'use client';
import { useContext } from 'react';
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

import * as yup from 'yup';
import { useFormik, ErrorMessage } from 'formik';

import Copyright from '@/components/Copyright';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/contexts/AuthContext';

const validationSchema = yup.object({
  firstName: yup
    .string('Digite seu nome')
    .required('O nome é obrigatório'),
  lastName: yup
    .string('Digite seu sobrenome')
    .required('O sobrenome é obrigatório'),
  address: yup
    .string('Digite seu endereço')
    .required('O endereço é obrigatório'),
  email: yup
    .string('Digite seu email')
    .email('Digite um email válido')
    .required('O email é obrigatório'),
  login: yup
    .string('Digite um nome de usuário')
    .min(3,'Seu usuário deve ter ao menos 3 caracteres')
    .required('O nome de usuário é obritatório'),
  password: yup
    .string('Digite seu password')
    .min(8,'A senha precisa conter no mínimo 8 caracteres')
    .required('A senha é obrigatória'),
  terms: yup
    .boolean().oneOf([true], 'Aceite nossos termos e condições')
})

/**
 * SignUp Page Component with form
 *
 * @returns {JSXReact} [A rendered component of the page]
 */
export default function SignUp() {

  const router = useRouter();
  const { setUser } = useContext(AuthContext);
  const form = useFormik({
    initialValues:{
      firstName:'',
      lastName:'',
      address:'',
      email:'',
      login:'',
      password:'',
      admin:false,
      terms:false,
    },
    validationSchema: validationSchema,
    onSubmit: async (formData) => {
      // Removing the checkbox state for now because our
      // BE doesnt have this feature
      const dataToSubmit = {
        nome: formData.firstName + " " + formData.lastName,
        email: formData.email,
        endereco: formData.address,
        login: formData.login,
        senha: formData.password,
        admin: formData.admin,
      }
      
      try {
        const data = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSubmit)
        })
       
        const userId =  await data.json();
        
        try {
            const userReq = await fetch(`${process.env.NEXT_PUBLIC_API}/usuarios/esp/${userId.usuarioUUID}`)
            const userData = await userReq.json();
            setUser(userData);
            router.push("/")
        } catch (e) {
          console.log("Não conseguiu entrar!")
            router.push("/login")
        }


      } catch (e){
        console.log(e.message);
      }
    }
  });

  return (
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
          <Box
            component="form"
            onSubmit={form.handleSubmit}
            noValidate
            sx={{ mt: 2 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="firstName"
                  id="firstName"
                  label="Nome"
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
            <Box display="flex" flexDirection="column">
              <FormControlLabel
                sx={{marginTop:"8px",marginX:"4px"}}
                control={
                  <Checkbox
                    checked={form.values.terms}
                    onChange={form.handleChange}
                    name="terms"
                    color="primary"
                  />
                }
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
              {form.errors.terms && form.touched.terms && (
                <Typography sx={{marginTop:"0px",marginX:"16px"}} color="error" variant="body2">
                  {form.errors.terms}
                </Typography>
              )}
              <FormControlLabel
                sx={{marginTop:"8px",marginX:"4px"}}
                control={
                  <Checkbox
                    checked={form.values.admin}
                    onChange={form.handleChange}
                    name="admin"
                    color="primary"
                  />
                }
                label="Usuário Administrador"
              />
            </Box>
            <Box
              sx={{
                display:'flex',
                justifyContent:'flex-end'
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2, mr: 2, backgroundColor:"button.buttonModest"}}
                href="/"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2,color:"white", backgroundColor:"button.buttonFlashy" }}
                disabled={form.isSubmitting}
              >
                {form.isSubmitting?"Cadastrando...":"Cadastrar"}
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
  );
}
