// Import styles from './page.module.css'
"use client";
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

import Header from '@/components/Header';

export default function Home() {
	return (
    <Box
      sx={{
        padding:'0px',
        margin:'0px',
      }}
    >
      <Header search={true} cart={true}/>
    </Box>
	);
}
