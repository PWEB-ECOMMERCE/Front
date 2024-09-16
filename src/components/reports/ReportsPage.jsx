/* eslint-disable */
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PrintIcon from '@mui/icons-material/Print';
import { useTheme } from '@mui/material/styles';

import SalesReport from "@/components/reports/SalesReport"
import BalanceReport from "@/components/reports/BalanceReport"
import StockReport from "@/components/reports/StockReport"


export default function ReportsPage() {
    const [tab, setTab] = React.useState("1");
    const theme = useTheme();

    const handleChange = (event, newValue) => {
      setTab(newValue);
    }

    return (
      <Box sx={{width:"100%"}}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="Abas de Relatórios" variant="fullWidth" centered>
              <Tab label="Vendas" value="1" />
              <Tab label="Produtos em Falta" value="2" />
              <Tab label="Saldo" value="3" />
            </TabList>
          </Box>
            <TabPanel value="1">
              <SalesReport/>
            </TabPanel>
            <TabPanel value="2">
              {/* <BalanceReport/> */}
              <StockReport/>
            </TabPanel>
            <TabPanel value="3">
              <BalanceReport/>
            </TabPanel>

        </TabContext>
        <Box
          sx={{
            position: 'fixed',
            bottom: 16, // Adjust as needed
            right: 16, // Adjust as needed
            zIndex: 1000, // Ensures it is above other content
          }}
        >
          <IconButton size="large" sx={{
            width: 80,
            height: 80,
            background:(theme) => theme.palette.secondary.main,
            color:'white',
          }} variant="outlined">
            <PrintIcon />
          </IconButton>
        </Box>
      </Box>
    );
}
