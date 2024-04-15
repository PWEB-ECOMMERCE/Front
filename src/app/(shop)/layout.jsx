import { useContext } from 'react'
import { Box } from '@mui/material';

import Header from '@/components/Header';
import SideBar from '@/components/SideBar';

export default async function RootLayout({ children }) {

  return (
    <div>
      <Header search={false} cart={false}/>
      <Box
        sx={{
          padding: '0px',
          margin: '0px',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'row',
        }}>
        <SideBar></SideBar>
        {children}
      </Box>
    </div>
  )
}
