/* eslint-disable */
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';


function EditToolbar(props) {
  const { rows, setRows, setRowModesModel } = props;

  const handleClick = async () => {
    // Cria o produto com valores padrão
    const novoProduto = {
      id: '',
      nome: '',
      descricao: '',
      preco: '',
      imagem_url: '',
      quantidade: '',
      cat_id: ''
    };

    try {
      // Faz uma requisição POST para criar o produto no banco de dados
      const response = await fetch('http://localhost:8080/produto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoProduto)
      });

      if (!response.ok) {
        throw new Error('Erro ao criar o produto');
      }

      // Obtém o ID do produto recém-criado a partir da resposta do backend
      const data = await response.json();
      const id = data.id; // Supondo que o backend retorne o id no campo 'id'

      // Atualiza as linhas com o novo produto
      setRows((oldRows) => [
        ...oldRows,
        { ...novoProduto, id, isNew: true }
      ]);

      // Configura o modo de edição para o novo produto
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit},
      }));
    } catch (error) {
      console.error('Erro ao criar o produto:', error);
    }
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Adicionar elemento novo
      </Button>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const [rowsProducts, setRowsProducts] = React.useState();
  const [rowsCategory, setRowsCategory] = React.useState();
  const [rowProductsModesModel, setRowProductsModesModel] = React.useState({});
  const [rowCategoryModesModel, setRowCategoryModesModel] = React.useState({});

  // READ PRODUCTS
  React.useEffect( () => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/produto', {
        })

        if (response.status === 200){
          const lista = await response.json()
          setRowsProducts(lista)
        }

      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [] )

    // UPDATE PRODUCT
    const updateProduct = async (id, updatedProduct) => {
      try {
        const response = await fetch(`http://localhost:8080/produto/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome: '',
            descricao: '',
            imagem: '',
            preco: '',
            quantidade: '',
            IDcategoria: '',
          }
          ),
        });
    
        if (response.status === 200) {
          const updatedProductData = await response.json();
          setRowsProducts((prevProducts) =>
            prevProducts.map((produto) =>
              produto.id === id ? updatedProductData : produto
            )
          );
        }
      } catch (error) {
        console.error('Erro ao atualizar o produto:', error);
      }
    };

    //DELETE PRODUCT
    const deleteProduct = async (id) => {
      try {
        const response = await fetch(`http://localhost:8080/produto/${id}`, {
          method: 'DELETE',
        });
    
        if (response.status === 204) {
          setRowsProducts((prevProducts) =>
            prevProducts.filter((produto) => produto.id !== id)
          );
        }
      } catch (error) {
        console.error('Erro ao deletar o produto:', error);
      }
    };

    // READ CATEGORY
    React.useEffect( () => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:8080/categoria', {
          })
  
          if (response.status === 200){
            const lista = await response.json()
            setRowsCategory(lista)
          }
  
        } catch (error) {
          console.error(error)
        }
      }
      fetchData()
    }, [] )
  
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id, setter, row) => () => {
    setter({ ...row, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id, setter, row) => () => {
    setter((row) => ({ ...row, [id]: { mode: GridRowModes.View } }));
  };

  const handleDeleteClick = (id, rows) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id, setter, row, rows) => () => {
    setter({
      ...row,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow, rows, setter) => {
    const updatedRow = { ...newRow, isNew: false };
    setter(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columnsProducts = [
    {
      field: 'index',
      headerName: 'Index',
      width: 80,
      // This valueGetter returns the index of the row in the `rows` array
      renderCell: (params) =>
          params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
    },
    {
      field: 'nome',
      headerName: 'Nome',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'descricao',
      headerName: 'Descrição',
      width: 180,
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
    {
      field: 'imagem',
      headerName: 'Imagem',
      width: 180,
      align: 'left',
      headerAlign: 'left',
      editable: true,
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
      field: 'indexCat',
      headerName: 'Index Categoria',
      width: 80,
      // This valueGetter returns the index of the row in the `rows` array
      renderCell: (params) =>
          params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Ações',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowProductsModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={`${id}-save`}
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id, setRowProductsModesModel, rowProductsModesModel)}
            />,
            <GridActionsCellItem
              key={`${id}-cancel`}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id, setRowProductsModesModel, rowProductsModesModel, rowsProducts)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={`${id}-edit`}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id, setRowProductsModesModel, rowProductsModesModel)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={`${id}-delete`}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id, rowsProducts)}
            color="inherit"
          />,
        ];

      },
    },
  ];

  const columnsCategory = [
    {
      field: 'index',
      headerName: 'Index',
      width: 80,
      // This valueGetter returns the index of the row in the `rows` array
      renderCell: (params) =>
          params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
    },
    { field: 'descricao', headerName: 'Descricao', width: 180, editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Ações',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowCategoryModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={`${id}-save`}
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id, setRowCategoryModesModel, rowCategoryModesModel)}
            />,
            <GridActionsCellItem
              key={`${id}-cancel`}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id, setRowCategoryModesModel, rowCategoryModesModel, rowsCategory)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={`${id}-edit`}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id, setRowCategoryModesModel, rowCategoryModesModel)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={`${id}-delete`}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id, rowsCategory)}
            color="inherit"
          />,
        ];

      },
    },
  ];

  return (
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
        <h1>Produtos</h1>
      </div>
      <DataGrid
        rows={rowsProducts}
        columns={columnsProducts}
        editMode="row"
        rowModesModel={rowProductsModesModel}
        onRowModesModelChange={(newRowProductsModesModel, _) => setRowProductsModesModel(newRowProductsModesModel)}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={(newRow) => processRowUpdate(newRow, rowsProducts, setRowsProducts)}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { rows:rowsProducts, setRows:setRowsProducts, setRowModesModel:setRowProductsModesModel },
        }}
      />
      <div>
        <h1>Categoria</h1>
      </div>
      <DataGrid
        rows={rowsCategory}
        columns={columnsCategory}
        editMode="row"
        rowModesModel={rowCategoryModesModel}
        onRowModesModelChange={(newRowCategoryModesModel, _) => setRowCategoryModesModel(newRowCategoryModesModel)}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={(newRow) => processRowUpdate(newRow, rowsCategory, setRowsCategory)}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: {rows:rowsCategory, setRows:setRowsCategory, setRowModesModel:setRowCategoryModesModel },
        }}
      />
    </Box>

  );
}
