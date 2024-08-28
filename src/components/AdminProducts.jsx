import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import BasicMenu from './BasicMenu.jsx';
import Table from '@mui/material/Table';

export default function AdminProducts() {
  const menu = BasicMenu;
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'descricao',
      headerName: 'Descrição',
      width: 150,
      editable: false,
    },
    {
      field: 'quantidade',
      headerName: 'Quantidade',
      type: '',
      width: 150,
      editable: false,
    },
    {
      field: 'preco',
      headerName: 'Preço',
      width: 150,
    },
    {
      field: 'categoriaID',
      headerName: 'ID Categoria',
      width: 150,
    },
  ];

  const rows = [
    { id: 1, descricao: 'Produto', quantidade: 2, preco: 0, categoriaID: null },
    { id: 2, descricao: 'Produto', quantidade: 3, preco: 31, categoriaID: null },
    { id: 3, descricao: 'Produto', quantidade: 8, preco: 31, categoriaID: null },
    { id: 4, descricao: 'Produto', quantidade: 1, preco: 11, categoriaID: null },
    { id: 5, descricao: 'Produto', quantidade: 2, preco: null, categoriaID: null },
  ];


  return (
    <div style={{ width: '100%' }}>
      <div>
        <h1>Produtos</h1>
      </div>
      <Box sx={{ height: 400, width: '100%' }}>
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
      {/* <BasicMenu></BasicMenu> */}
      </Box>
      <br></br>
      <Stack spacing={4} direction="row" justifyContent='flex-end' gap={2}>
        <Button
          variant="contained"
          onClick={() => {
            alert('clicked');
          }}
          sx={{
            background: (theme) => theme.palette.button.buttonFlashy,
            color: 'white'
          }}
        >Adicionar Produto
        </Button>
      </Stack>
      <br></br>
      <h1>Categorias</h1>
      <Box sx={{ height: 400, width: '100%' }}>
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
      <br></br>
      <Stack direction="row" justifyContent='flex-end' gap={2}>
        <Button
          variant="contained"
          onClick={() => {
            alert('clicked');
          }}
          sx={{
            background: (theme) => theme.palette.button.buttonFlashy,
            color: 'white'
          }}
        >Adicionar Categoria
        </Button>
      </Stack>
    </div>

  );
}

