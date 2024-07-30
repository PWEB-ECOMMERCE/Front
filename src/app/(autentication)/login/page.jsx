'use client';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import * as yup from 'yup';
import { useFormik } from 'formik';

import Copyright from '@/components/Copyright';
import { AuthContext } from '@/contexts/AuthContext';


const validationSchema = yup.object({
  email: yup
    .string('Digite seu email')
    .email('Digite um email válido')
    .required('O email é obrigatório'),
  password: yup
    .string('Digite seu password')
    .min(8,'A senha precisa conter no mínimo 8 caracteres')
    .required('A senha é obrigatória'),
})

/**
 * Login Page Component with form
 *
 * @returns {JSXReact} [A rendered component of the page]
 */
function Login() {

  const { signIn, error, loading } = useContext(AuthContext);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      admin: false,
      remember: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { email, password } = values;
      try{
        const result = await signIn({email,password})
        router.push("/")
      } catch (err) {
        console.log(err);
      } finally{
        console.log(error);
      }
    }
  })

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent:'center',
            margin: 'auto',
            height: '100vh',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              type="password"
              id="password"
              label="Senha"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              autoComplete="current-password"
            />
            <Box
              sx={{
                display:'flex',
                flexDirection:'column',
                marginX: '12px'
              }}
            >
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Sou administrador"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Lembrar de mim"
              />
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color:'white', backgroundColor:"button.buttonFlashy" }}
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting?"Logando....":"Entrar"}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueceu a senha?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Não tem conta ainda? Cadastre-se"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}
export default Login;
