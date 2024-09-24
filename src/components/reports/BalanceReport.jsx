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

export default function BalanceReport({setData, dates, setDate, isPrinting}) {

    const [balance, setBalance] = React.useState();
    const today = new Date().toISOString().split('T')[0];
    const [startDate, setStartDate] = React.useState(dates[0]);
    const [endDate, setEndDate] = React.useState(dates[1]);
    const [rowSalesModesModel, setRowSalesModesModel] = React.useState({});

    // READ SALES
    React.useEffect(() => {
        const fetchData = async () => {
            const start = startDate.toISOString().split('T')[0];
            const end = endDate.toISOString().split('T')[0];
            try {
                const response = await fetch(`http://localhost:8080/relatorio/totalValorDia?data=${start}&endData=${end}`, {
                })

                if (response.status === 200) {
                    const balance = await response.json()
                    const data = balance.map( (value,index) => {return {id:index,data:value.data.reverse().join('/'),valorTotal:value.valorTotal}} )
                    setBalance(data)
                    setData(data)
                }

            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [startDate,endDate])

    const columns = [
        {
          field: 'data',
          headerName: 'Data do Balanço',
          headerAlign: 'left',
          width: 160,
        },
        {
            field: 'valorTotal',
            headerName: 'Valor Total Recebido (R$)',
            headerAlign: 'left',
            type: 'string',
            flex: isPrinting ? 0 : 1,
            width: isPrinting? 160: null,
            editable: false,
        },
    ];



    return (
      <Box marginX={"auto"} width={"75%"} marginTop={"8px"} sx={{
                  height: 500,
      }}>
          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DatePicker
              format="DD/MM/YYYY"
              label="Período Inicial"
              value={startDate}
              onChange={
                (newValue) => {
                  setStartDate(newValue)
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
                  setStartDate(newValue)
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
                  height: 500,
                  mt:2,
                  width: '100%',
                  '& .actions': {
                      color: 'text.secondary',
                  },
                  '& .textPrimary': {
                      color: 'text.primary',
                  },
              }}
          >
              <DataGrid
                  rows={balance}
                  sx={{
                    width:"100%"
                  }}
                  columns={columns}
                  rowModesModel={rowSalesModesModel}
                  getRowId={row => row.id}
                  autosizeOnMount={isPrinting}
                  pageSizeOptions={5}
                  hideFooter={isPrinting}
                  disableColumnMenu={isPrinting}
              />
          </Box>
      </Box>
    );
}
