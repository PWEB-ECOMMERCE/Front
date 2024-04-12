// -import './global.css'
import React from 'react'
import { Inter } from 'next/font/google'
import ThemeRegistry from '@/utils/ThemeRegistry'
import { Box } from '@mui/material';

import Header from '@/components/Header';
import SideBar from '@/components/SideBar';

const getUserStatus = async () => {
  return 'none';
}
const getPage = async () => {
  return 0;
}

const inter = Inter({subsets: [ 'latin' ]})
export default async function RootLayout({ children }) {
  let status = await getUserStatus();
  let page = await getPage();
  return (
    <div>
      {
        status === ('client' || 'none')
        ? <Header search={true} cart={true}/>
        : <Header search={false} cart={false}/>
      }
      <Box
        sx={{
          padding: '0px',
          margin: '0px',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'row',
        }}>
        <SideBar options={page} userStatus={status}></SideBar>
        {children}
      </Box>
    </div>
  )
}
