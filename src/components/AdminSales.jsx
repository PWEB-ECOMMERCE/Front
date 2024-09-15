/* eslint-disable */
import * as React from 'react';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import {
    DataGrid,
    GridActionsCellItem,
    useGridApiContext,
} from '@mui/x-data-grid';

export default function AdminSales() {
    const [sales, setSales] = React.useState();
    const [rowSalesModesModel, setRowSalesModesModel] = React.useState({});


    // READ SALES
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/venda', {
                })

                if (response.status === 200) {
                    const sales = await response.json()
                    console.log(sales)
                    setSales(sales)
                }

            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])

    const handleDeleteClick = (id, setter, rows, onDelete) => () => {
        onDelete(id)
        setter(rows.filter((row) => row.id !== id));
    };

    const deleteSale = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/venda/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (response.ok) {
                setSales((prevSales) =>
                    prevSales.filter((venda) => venda.id !== id)
                );
            }
        } catch (error) {
            console.error('Erro ao deletar a venda:', error);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'data_hora',
            headerName: 'Data e Hora',
            type: 'Date',
            width: 150,
            editable: false,
        },
        {
            field: 'usuario_id',
            headerName: 'ID Usuário',
            type: 'number',
            width: 90,
            editable: false,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Ações',
            width: 100,
            cellClassName: 'actions',
            getActions: (params) => {
                const apiRef = useGridApiContext();
                const id = params.id;


                return [
                    <GridActionsCellItem
                        key={`${id}-delete`}
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id, setSales, sales, deleteSale)}
                        color="inherit"
                    />,
                ];

            },
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
                    <h1>Vendas</h1>
                </div>
                <DataGrid
                    rows={sales}
                    columns={columns}
                    rowModesModel={rowSalesModesModel}
                    pageSizeOptions={[5]}
                />
            </Box>
        </Box>
    );
}