'use client';
import { Box, Stack, List, ListItemButton, Link, CircularProgress } from '@mui/material';
import { useState, useEffect, useContext } from 'react';

import NextLink from 'next/link'

import { AuthContext } from '@/contexts/AuthContext';
import { SideBarContext } from '@/contexts/SideBarContext';

export default function SideBar() {

  const { user, loading } = useContext(AuthContext);
  const { links } = useContext(SideBarContext);
  const data = user ? (user?.isAdmin ? links.admin : links.authenticated) : links.anonymous;

  return (
    <Stack sx={{border: '1px solid grey', borderWidth: '0 1px 0 1px', width: 248 }} direction='row'>
      <Stack
        sx={{
          flexGrow: 1,
          minHeight: '100%',
          width:'100%',
        }}>
        <List sx={{ py: 0 }}>
          {data?.map((item, index) => {
              return (
                <ListItemButton
                  key={index}
                  // Selected={index === selected}
                  background='primary'
                  component={NextLink}
                  // To={{'pathname':item.to,'query':{selected:index}}}
                  to={item.to}
                  sx={{
                    px: 2,
                    py: '10px',
                  }}>
                  {item.name}
                </ListItemButton>
              );
          })}
        </List>
      </Stack>
      <Box sx={{ flexGrow: 3 }}></Box>
    </Stack>
  );
}
