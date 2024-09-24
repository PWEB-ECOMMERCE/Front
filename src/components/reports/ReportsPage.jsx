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
import dayjs from 'dayjs';
import ReactToPrint from 'react-to-print';
import { Typography } from "@mui/material";

import SalesReport from "@/components/reports/SalesReport";
import BalanceReport from "@/components/reports/BalanceReport";
import StockReport from "@/components/reports/StockReport";

export default function ReportsPage() {
    const [tab, setTab] = React.useState("1");
    const theme = useTheme();
    const today = new Date().toISOString().split('T')[0];
    const [salesData, setSalesData] = React.useState([]);
    const [salesDate, setSalesDate] = React.useState([dayjs(today), dayjs(today)]);
    const [balanceData, setBalanceData] = React.useState([]);
    const [balanceDate, setBalanceDate] = React.useState([dayjs(today), dayjs(today)]);
    const [stockData, setStockData] = React.useState([]);
    const [stockDate, setStockDate] = React.useState([dayjs(today), dayjs(today)]);

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };


    console.log(salesData)

    // Ref for printing
    const printRef = React.useRef();

    // Printable content
    const PrintableContent = React.forwardRef((props, ref) => (
        <Box ref={ref} flex alignContent="center">
            <Typography variant='h5' sx={{ marginBottom: '20px', marginLeft: '40px', marginTop: '40px' }}>Vendas Report</Typography>
            <table style={{ width: '80%', borderCollapse: 'collapse', margin:'0 auto',marginBottom: '40px',pageBreakAfter: 'always' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '8px' }}>ID</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Nome do cliente</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Quantity de Compras</th>
                    </tr>
                </thead>
                <tbody>
                    {salesData.map((row) => (
                        <tr key={row.id}>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{row.idCliente}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{row.nomeDoCliente}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{row.qtdCompras}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Typography variant='h5' sx={{ marginBottom: '20px', marginLeft: '40px', marginTop: '40px' }}>Produtos em Falta Report</Typography>
            <table style={{ width: '80%', borderCollapse: 'collapse', margin:'0 auto',marginBottom: '40px',pageBreakAfter: 'always' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '8px' }}>ID</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Nome do Produto</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Quantidade em Estoque</th>
                    </tr>
                </thead>
                <tbody>
                    {stockData.map((row) => (
                        <tr key={row.id}>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{row.id}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{row.nome}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{row.quantidade}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Typography variant='h5' sx={{ marginBottom: '20px', marginLeft: '40px', marginTop: '40px' }}>Saldo Report</Typography>
            <table style={{ width: '80%', borderCollapse: 'collapse', margin:'0 auto',marginBottom: '40px',pageBreakAfter: 'always' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Data</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Valor Total</th>
                    </tr>
                </thead>
                <tbody>
                    {balanceData.map((row) => (
                        <tr key={row.id}>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{row.data}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{row.valorTotal}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Box>
    ));

    return (
        <Box sx={{ width: "100%" }}>
            <TabContext value={tab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="Abas de Relatórios" variant="fullWidth" centered>
                        <Tab label="Vendas" value="1" />
                        <Tab label="Produtos em Falta" value="2" />
                        <Tab label="Saldo" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <SalesReport setData={setSalesData} dates={salesDate} setDate={setSalesDate} />
                </TabPanel>
                <TabPanel value="2">
                    <StockReport setData={setStockData} dates={stockDate} setDate={setStockDate} />
                </TabPanel>
                <TabPanel value="3">
                    <BalanceReport setData={setBalanceData} dates={balanceDate} setDate={setBalanceDate} />
                </TabPanel>
            </TabContext>

            {/* Print Button */}
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 16, // Adjust as needed
                    right: 16, // Adjust as needed
                    zIndex: 1000, // Ensures it is above other content
                }}
            >
                <ReactToPrint
                    trigger={() => (
                        <IconButton size="large" sx={{
                            width: 80,
                            height: 80,
                            background: (theme) => theme.palette.secondary.main,
                            color: 'white',
                        }}>
                            <PrintIcon />
                        </IconButton>
                    )}
                    content={() => printRef.current}
                />
            </Box>

            {/* Hidden Printable Content */}
            <div style={{ display: 'none', height:"100%" }}>
                <PrintableContent ref={printRef} />
            </div>
        </Box>
    );
}
