// -import './global.css'
import React from 'react'
import { Inter } from 'next/font/google'
import ThemeRegistry from '@/utils/ThemeRegistry'
import { Box } from '@mui/material';

import Header from '@/components/Header';
import SideBar from '@/components/SideBar';

const inter = Inter({subsets: [ 'latin' ]})
export default function RootLayout({ children }) {
  return (
    <Box
      sx={{
        padding: '0px',
        margin: '0px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'row',
      }}>
      {children}
    </Box>
  )
}
