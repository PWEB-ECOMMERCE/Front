'use client';
import { Box, Drawer, Stack, List, ListItem, ListItemText, ListItemButton, Link, Toolbar, CircularProgress } from '@mui/material';
import { useState, useEffect, useContext } from 'react';

import NextLink from 'next/link'

import { AuthContext } from '@/contexts/AuthContext';
import { SideBarContext } from '@/contexts/SideBarContext';

const drawerWidth = 248;

export default function SideBar({handleContentChange}) {

  const { user, loading } = useContext(AuthContext);
  const [ selected, setSelected ] = useState(0);
  const { links } = useContext(SideBarContext);
  const data = user ? (user?.isAdmin ? links.admin : links.authenticated) : links.anonymous;

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', borderRight: '1px solid #cccccc' },
      }}
    >
      <Toolbar />
        <List >
          {data.map((item, index) => (
            <ListItem key={index} selected={selected === index} disablePadding>
              <ListItemButton onClick={() => {handleContentChange(item.component); setSelected(index)}}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
    </Drawer>
  )

}

