import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

export default function AdminSales() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'data',
            headerName: 'Data',
            type: 'Date',
            width: 150,
            editable: false,
        },
        {
            field: 'idCliente',
            headerName: 'ID Cliente',
            type: 'number',
            width: 90,
            editable: false,
        },
        {
            field: 'idProduto',
            headerName: 'ID Produto',
            type: 'number',
            width: 150,
            editable: false,
        },
        {
            field: 'quantidade',
            headerName: 'Quantidade',
            type: 'number',
            width: 150,
        },
        {
            field: 'total',
            headerName: 'Total',
            type: 'number',
            width: 90,
            valueGetter: (value, row) => `${row.valor*row.quantidade}`,
        }
    ];

    const rows = [
        { id: 1, data: '12/08/2024', idCliente: 2, idProduto: 123, valor: 1, quantidade: 1, total: null },
        { id: 2, data: '12/08/2024', idCliente: 3, idProduto: 321, valor: 2, quantidade: 2, total: null },
        { id: 3, data: '12/08/2024', idCliente: 8, idProduto: 122, valor: 3, quantidade: 3, total: null },
        { id: 4, data: '12/08/2024', idCliente: 1, idProduto: 221, valor: 4, quantidade: 4, total: null },
        { id: 5, data: '12/08/2024', idCliente: 2, idProduto: 321, valor: 5, quantidade: 5, total: null },
    ];


    return (
        <div style={{ width: '100%' }}>
            <div>
                <h1>Vendas</h1>
            </div>
            <Box sx={{ height: 400, width: '1000%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
        </div>
    );
}