/* eslint-disable */
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import ModalProduto from './ModalProduto';
import ModalCategoria from './ModalCategoria';

import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  useGridApiContext,
} from '@mui/x-data-grid';


function EditToolbar(props) {
  const { rows, setRows, setRowModesModel, onOpenModal} = props;

  const handleClick = async () => {
    onOpenModal();
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
  const [openProductModal, setOpenProductModal] = React.useState(false);
  const handleOpenProductModal = () => setOpenProductModal(true);
  const handleCloseProductModal = () => setOpenProductModal(false);

  const handleSaveProductModal = async (product) => {
    try {
      // Faz uma requisição POST para criar o produto no banco de dados
      const response = await fetch('http://localhost:8080/produto', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });

      if ( response.ok ){
        const newProduct = await response.json()
        setProducts((oldRows) => [
          ...oldRows,
          { ...newProduct, id:newProduct.id, isNew: true }
        ]);
      }

    } catch (error) {
      console.error('Erro ao criar o produto:', error);
    }
  };

  const [openCategoryModal, setOpenCategoryModal] = React.useState(false);
  const handleOpenCategoryModal = () => setOpenCategoryModal(true);
  const handleCloseCategoryModal = () => setOpenCategoryModal(false);

  const handleSaveCategoryModal = async (categoria) => {
    try {
      // Faz uma requisição POST para criar o produto no banco de dados
      const response = await fetch('http://localhost:8080/categoria', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoria)
      });

      if ( response.ok ){
        const newCategory = await response.json()
        setCategories((oldRows) => [
          ...oldRows,
          { ...newCategory, id:newCategory.id, isNew: true }
        ]);
      }

    } catch (error) {
      console.error('Erro ao criar o produto:', error);
    }
  };


  const [products, setProducts] = React.useState();
  const [categories, setCategories] = React.useState();
  const [rowProductsModesModel, setRowProductsModesModel] = React.useState({});
  const [rowCategoryModesModel, setRowCategoryModesModel] = React.useState({});
  const [ toUpdate, setToUpdate ] = React.useState();

  React.useEffect( () => {
    if (toUpdate){
      // console.log(toUpdate.api.current.state.editRows[toUpdate.id]);
      // toUpdate.update(toUpdate.api.current.getRow(toUpdate.id))
    }
  }, [toUpdate] )

  // READ PRODUCTS
  React.useEffect( () => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/produto', {
        })

        if (response.status === 200){
          const lista = await response.json()
          setProducts(lista)
        }

      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [] )


    // READ CATEGORY
    React.useEffect( () => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:8080/categoria', {
          })

          if (response.status === 200){
            const lista = await response.json()
            setCategories(lista)
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

  const handleEditClick = (id, setter, rows, onEdit) => () => {
    setter({ ...rows, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (api, itemId, setter,onSave) => () => {
    api.current.stopRowEditMode({id:itemId});
    setter((row) => ({ ...row, [itemId]: { mode: GridRowModes.View } }));
    const item = api.current.state.editRows[itemId]
    const editedItem = {
      id:itemId,
      ...item
    }
    onSave(editedItem)
    setToUpdate({ api:api, id:itemId, update:(item) => {onSave(item)}})
  };

  const handleDeleteClick = (id, setter, rows, onDelete) => () => {
    onDelete(id)
    setter(rows.filter((row) => row.id !== id));
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
    // onSave(updatedRow)
    setter(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/produto/esp/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setProducts((prevProducts) =>
          prevProducts.filter((produto) => produto.id !== id)
        );
      }
    } catch (error) {
      console.error('Erro ao deletar o produto:', error);
    }
  };

  const editProduct = async (product) => {
    // console.log(product)
    const id = product.id
    const editedItem = {
      descricao:product.descricao.value,
      foto:product.foto.value,
      nome:product.nome.value,
      preco:product.preco.value,
      quantidade:product.quantidade.value,
    }
    try {
      const response = await fetch(`http://localhost:8080/produto/esp/${id}`, {
        method: 'PATCH',
        headers:{
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(editedItem)
      });

    } catch (error) {
      console.error('Erro ao alterar o produto:', error);
    }
  };

  const editCategory = async (category) => {
    const id = category.id
    const editedItem = {
      descricao:category.descricao.value,
    }
    try {
      const response = await fetch(`http://localhost:8080/categoria/esp/${id}`, {
        method: 'PATCH',
        headers:{
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(editedItem)
      });

    } catch (error) {
      console.error('Erro ao alterar a descrição:', error);
    }
  };
  const deleteCategory = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/categoria/esp/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.status === 204) {
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category.id !== id)
        );
      }
    } catch (error) {
      console.error('Erro ao deletar a categoria:', error);
    }
  };

  const columnsProducts = [
    {
      field: 'index',
      headerName: 'Index',
      width: 60,
      // This valueGetter returns the index of the row in the `rows` array
      renderCell: (params) =>
          params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
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
      field: 'foto',
      headerName: 'Imagem',
      width: 180,
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
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Ações',
      width: 100,
      cellClassName: 'actions',
      getActions: (params) => {
        const apiRef = useGridApiContext();
        const id = params.id;
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
              onClick={handleSaveClick(apiRef, id, setRowProductsModesModel, editProduct)}
            />,
            <GridActionsCellItem
              key={`${id}-cancel`}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id, setRowProductsModesModel, rowProductsModesModel, products)}
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
            onClick={handleEditClick(id, setRowProductsModesModel, rowProductsModesModel, editProduct)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={`${id}-delete`}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id, setProducts, products, deleteProduct)}
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
      getActions: (params) => {
        const apiRef = useGridApiContext();
        const id = params.id;
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
              onClick={handleSaveClick(apiRef, id, setRowCategoryModesModel, editCategory)}
            />,
            <GridActionsCellItem
              key={`${id}-cancel`}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id, setRowCategoryModesModel, rowCategoryModesModel, categories)}
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
            onClick={handleDeleteClick(id, setCategories, categories, deleteCategory)}
            color="inherit"
          />,
        ];

      },
    },
  ];

  return (
    <Box  marginX={"auto"} width={"75%"}>
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
        <ModalProduto open={openProductModal} handleClose={handleCloseProductModal} onSave={handleSaveProductModal} />
        <DataGrid
          rows={products}
          columns={columnsProducts}
          editMode="row"
          rowModesModel={rowProductsModesModel}
          onRowModesModelChange={(newRowProductsModesModel, _) => setRowProductsModesModel(newRowProductsModesModel)}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={(newRow) => processRowUpdate(newRow, products, setProducts)}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { rows:products, setRows:setProducts, setRowModesModel:setRowProductsModesModel, onOpenModal:handleOpenProductModal },
          }}
        />
        <div>
          <h1>Categoria</h1>
        </div>
        <ModalCategoria open={openCategoryModal} handleClose={handleCloseCategoryModal} onSave={handleSaveCategoryModal} />
        <DataGrid
          rows={categories}
          columns={columnsCategory}
          editMode="row"
          rowModesModel={rowCategoryModesModel}
          onRowModesModelChange={(newRowCategoryModesModel, _) => setRowCategoryModesModel(newRowCategoryModesModel)}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={(newRow) => processRowUpdate(newRow, categories, setCategories)}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: {rows:categories, setRows:setCategories, setRowModesModel:setRowCategoryModesModel, onOpenModal:handleOpenCategoryModal },
          }}
        />
      </Box>
    </Box>

  );
}
