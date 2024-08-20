'use client'
import { useContext, useState } from 'react'
import { Box } from '@mui/material';

import Header from '@/components/Header';
import SideBar from '@/components/SideBar';
import Inicio from './Inicio'

export default function RootLayout({ children }) {
  const [content, setContent] = useState(<Inicio/>);

  return (
    <div>
      <Header search={false} cart={false}/>
      <Box
        sx={{
          padding: '0px',
          marginTop: '64px',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'row',
        }}>
        <SideBar handleContentChange={setContent}></SideBar>
        {content}
      </Box>
    </div>
  )
}
