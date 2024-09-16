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

export default function BalanceReport() {

    const [balance, setBalance] = React.useState();
    const today = new Date().toISOString().split('T')[0];
    const [startDate, setStartDate] = React.useState(dayjs(today));
    const [endDate, setEndDate] = React.useState(dayjs(today));
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
                    console.log(balance)
                    setBalance(balance)
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
            flex: 1,
            editable: false,
        },
    ];



    return (
      <Box marginX={"auto"} width={"75%"}>
          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DatePicker format="DD/MM/YYYY" label="Período Inicial" value={startDate} onChange={(newValue) => setStartDate(newValue)} sx={{mr:2}}></DatePicker>
            <DatePicker format="DD/MM/YYYY" label="Período Final" value={endDate} onChange={(newValue) => setStartDate(newValue)}></DatePicker>
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
                  columns={columns}
                  rowModesModel={rowSalesModesModel}
                  pageSizeOptions={5}
              />
          </Box>
      </Box>
    );
}
