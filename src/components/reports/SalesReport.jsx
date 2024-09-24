/* eslint-disable */
import * as React from 'react';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import {
    DataGrid,
    GridActionsCellItem,
    useGridApiContext,
} from '@mui/x-data-grid';

export default function SalesReport({setData, dates, setDate, isPrinting}) {

    const [sales, setSales] = React.useState([]);
    const today = new Date().toISOString().split('T')[0];
    const [startDate, setStartDate] = React.useState(dates[0]?dates[0]:null);
    const [endDate, setEndDate] = React.useState(dates[1]);
    const [rowSalesModesModel, setRowSalesModesModel] = React.useState({});

    // READ SALES
    React.useEffect(() => {
        const fetchData = async () => {
            const start = startDate.toISOString().split('T')[0];
            const end = endDate.toISOString().split('T')[0];
            try {
                const response = await fetch(`http://localhost:8080/relatorio/compras?data=${start}&endData=${end}`, {
                credentials: 'include'
                })

                if (response.status === 200) {
                    const sales = await response.json()
                    setSales(sales)
                    setData(sales);
                }

            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [startDate,endDate])

    const columns = [
        {
          field: 'idCliente',
          headerName: 'Id do Cliente',
          headerAlign: 'left',
          width: 160,
        },
        {
            field: 'nomeDoCliente',
            headerName: 'Nome do Cliente',
            headerAlign: 'left',
            type: 'string',
            flex: 1,
            editable: false,
        },
        {
            field: 'qtdCompras',
            headerName: 'Quantidade de Compras',
          headerAlign: 'left',
            type: 'number',
            flex: 1,
            editable: false,
        },
    ];



    return (
      <Box marginX={"auto"} marginTop={"8px"} width={"75%"} height={"500px"}>
          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DatePicker
              format="DD/MM/YYYY"
              label="Período Inicial"
              value={startDate}
              onChange={
                (newValue) => {
                  setStartDate(newValue);
                  setDate((prev) => {
                    // Create a copy of the previous state array
                    const newState = [...prev];

                    // Update the first element
                    newState[0] = newValue;  // Replace 'new value' with the actual value you want to set

                    // Return the updated state
                    return newState;
                  });
                }
              }
              sx={{mr:2}}
            ></DatePicker>
            <DatePicker
              format="DD/MM/YYYY"
              label="Período Final"
              value={endDate}
              onChange={
                (newValue) => {
                  setEndDate(newValue)

                  setDate((prev) => {
                    // Create a copy of the previous state array
                    const newState = [...prev];

                    // Check if the array has at least two elements
                    if (newState.length >= 2) {
                      // Update the second element (index 1) if it exists
                      newState[1] = newValue;  // Replace 'new value' with the actual value you want to set
                    } else {
                      // If the second element doesn't exist, you can choose to add it or handle it some other way
                      newState[1] = newValue;  // This will add a second element if needed
                    }

                    // Return the updated state
                    return newState;
                    });
                }

              }
            ></DatePicker>
          </LocalizationProvider>
          <Box
              sx={{
                  height: isPrinting ? 200 : 500,
                  mt:2,
                  width: isPrinting ? '100vw' :'100%',
                  '& .actions': {
                      color: 'text.secondary',
                  },
                  '& .textPrimary': {
                      color: 'text.primary',
                  },
                  '@media print': {
                    '.MuiDataGrid-root': {
                        width: '100% !important',
                        overflow: 'visible !important',
                    },
                    '.MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
                        padding: '4px',
                    },
                    '.MuiDataGrid-virtualScroller': {
                        height: 'auto !important',
                    },
                },
              }}
          >
              <DataGrid
                  rows={sales}
                  columns={columns}
                  getRowId={(row) => row.idCliente}
                  rowModesModel={rowSalesModesModel}
                  pageSizeOptions={5}
                  pageSize={isPrinting ? sales.length : 10}
                  hideFooter={isPrinting}
                  disableColumnMenu={isPrinting}
              />
          </Box>
      </Box>
    );
}
