'use client';
// Import styles from './page.module.css'
import React from 'react';
import Switch from '@mui/material/Switch';
import { Button } from '@mui/material';
import { styled } from '@mui/system';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const Page = styled('div')({
	color: 'darkslategray',
	backgroundColor: 'black',
	padding: 8,
	borderRadius: 4,
	height: '100vh',
});

export default function Home() {
	return (
		<Page>
			<div>
				<span>With default Theme:</span> <Button sx={{ color: 'dante.dark' }}>Hello World</Button>
			</div>
			<Switch {...label} defaultChecked />
			<Switch {...label} />
			<Switch {...label} disabled defaultChecked />
		</Page>
	);
}
