/* eslint-disable */
import * as React from 'react';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';

import {
    DataGrid,
} from '@mui/x-data-grid';

export default function ClientOrders() {
    const [sales, setSales] = React.useState([]);
    const [rowSalesModesModel, setRowSalesModesModel] = React.useState({});
    
    const user = localStorage.getItem('user');
        const userJson = JSON.parse(user);
        console.log(userJson.id)

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:8080/venda/esp/${userJson.id}`, {credentials:"include"});
            console.log(response);

            if (response.ok) { 
              const sales = await response.json();
              console.log(sales);
              setSales(sales);
            } else {
              console.error(`Erro na requisição: ${response.status}`);
            }
    
          } catch (error) {
            console.error('Erro ao buscar as compras:', error);
          }
        };
            fetchData(); 
          
        }, []);

      

    const columns = [
        { field: 'id', headerName: 'ID do Pedido', width: 90 },
        {
            field: 'data_hora',
            headerName: 'Data e Hora',
            type: 'Date',
            width: 150,
            editable: false,
        },
    ];



    return (
        <Box marginX={"auto"} width={"75%"}>
            <Box
                sx={{
                    height: 500,
                    width: '100%',
                    '& .actions': {
                        color: 'text.secondary',
                    },
                    '& .textPrimary': {
                        color: 'text.primary',
                    },
                }}
            >
                <div>
                    <h1>Meus Pedidos</h1>
                </div>
                <DataGrid
                    rows={sales}
                    columns={columns}
                    rowModesModel={rowSalesModesModel}
                />
            </Box>
        </Box>
    );
}