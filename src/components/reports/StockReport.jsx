/* eslint-disable */
import * as React from 'react';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import {
    DataGrid,
    GridActionsCellItem,
    useGridApiContext,
} from '@mui/x-data-grid';

export default function StockReport({setData, dates, setDate, isPrinting}) {

    const [products, setProducts] = React.useState();
    const [rowSalesModesModel, setRowSalesModesModel] = React.useState({});

    // READ SALES
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/relatorio/produtosEsgotados`, {
                credentials: 'include'
                })

                if (response.status === 200) {
                    const products = await response.json()
                    console.log(products)
                    setProducts(products)
                    setData(products);
                }

            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])

    const columns = [
      {
        field: 'id',
        headerName: 'ID',
        width: 60,
      },
      {
        field: 'nome',
        headerName: 'Nome',
        width: 240,
        align: 'left',
        headerAlign: 'left',
        editable: true,
      },
      {
        field: 'descricao',
        headerName: 'Descrição',
        width: 160,
        align: 'left',
        headerAlign: 'left',
        editable: true,
      },
      {
        field: 'categoria',
        headerName: 'Categoria',
        width: 160,
        valueGetter: (value) => value.descricao
      },
      {
        field: 'quantidade',
        headerName: 'Quantidade',
        type: 'number',
        width: 80,
        align: 'left',
        headerAlign: 'left',
        editable: true,
      },
      {
        field: 'preco',
        headerName: 'Preço',
        type: 'number',
        width: 180,
        editable: true,
      },
    ];



    return (
      <Box marginX={"auto"} width={"75%"}>
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
                  rows={products}
                  columns={columns}
                  rowModesModel={rowSalesModesModel}
                  pageSizeOptions={5}
                  hideFooter={isPrinting}
                  disableColumnMenu={isPrinting}
              />
          </Box>
      </Box>
    );
}
