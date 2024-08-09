import React from 'react'
import { Box } from '@mui/material';


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
