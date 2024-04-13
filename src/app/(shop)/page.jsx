// Import styles from './page.module.css'
'use client';
import { useContext } from 'react';
import { Box } from '@mui/material';

import Header from '@/components/Header';
import SideBar from '@/components/SideBar';

import { AuthContext } from '@/contexts/AuthContext';

export default function Shop() {
  const { user } = useContext(AuthContext);
  return (
    <Box>
      Olá, {user?.nome}
    </Box>
  );
}
