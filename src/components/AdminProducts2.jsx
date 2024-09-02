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

const randomCreatedValue = (min = 1, max = 1000, currency = 'BRL') => {
  const randomValue = (Math.random() * (max - min) + min).toFixed(2);
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(randomValue);
};

const randomId = () => Math.floor(Math.random() * 100000);

const initialRows = [
  {
    id: randomId(),
    descricao: 'Produto',
    quantidade: 25,
    preco: randomCreatedValue(),
  },
  {
    id: randomId(),
    descricao: 'Produto',
    quantidade: 36,
    preco: randomCreatedValue(),
  },
  {
    id: randomId(),
    descricao: 'Produto',
    quantidade: 19,
    preco: randomCreatedValue(),
  },
  {
    id: randomId(),
    descricao: 'Produto',
    quantidade: 28,
    preco: randomCreatedValue(),
  },
  {
    id: randomId(),
    descricao: 'Produto',
    quantidade: 23,
    preco: randomCreatedValue(),
  },
];

function EditToolbar(props) {
  const { rows, setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId()
    setRows((oldRows) => [...oldRows, { id, descricao: '', quantidade: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'descricao' },
    }));
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
  const [rowsCategory, setRowsCategory] = React.useState(initialRows);
  const [rowProductsModesModel, setRowProductsModesModel] = React.useState({});
  const [rowCategoryModesModel, setRowCategoryModesModel] = React.useState({});

  // Uma vez assim que a pagina carrega
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
    // const fetchData = async () => {
    //   const response = await fetch('localhost:8080/produto', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(
    //       {
    //         nome: "Nome do produto",
    //         descricao: "Descrição do produto",
    //         foto: "tananan.png",
    //         preco: 200,
    //         quantidade: 100,
    //         categoria: 1,
    //       }
    //     )
    //     }
    //   )
    // }

    // console.log("Hello")
  }, [] )


  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id, setter) => () => {
    setter((rowModesModel) => ({ ...rowModesModel, [id]: { mode: GridRowModes.View } }));
  };

  const handleDeleteClick = (id, rows) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
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
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={`${id}-cancel`}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
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
            onClick={handleEditClick(id)}
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
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={`${id}-cancel`}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
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
            onClick={handleEditClick(id)}
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
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={(newRow) => processRowUpdate(newRow, rowsProducts, setRowsProducts)}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { rows:rowsProducts,setRows:setRowsProducts, setRowModesModel:setRowProductsModesModel },
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
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={(newRow) => processRowUpdate(newRow, rowsCategory, setRowsCategory)}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows:setRowsCategory, setRowModesModel:setRowCategoryModesModel },
        }}
      />
    </Box>

  );
}
