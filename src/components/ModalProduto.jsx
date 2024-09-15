import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const ModalProduto = ({ open, handleClose, onSave }) => {
  const [categories, setCategories] = useState([])
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    onSave(data);
    handleClose();
  };

  useEffect( () => {
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

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} component="form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Adicionar Produto</h2>

        <TextField
          fullWidth
          margin="normal"
          label="Nome"
          {...register('nome', { required: 'Nome é obrigatório' })}
          error={!!errors.nome}
          helperText={errors.nome?.message}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Descrição"
          {...register('descricao', { required: 'Descrição é obrigatória' })}
          error={!!errors.descricao}
          helperText={errors.descricao?.message}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Imagem URL"
          {...register('foto', { required: 'URL da imagem é obrigatória' })}
          error={!!errors.imagem}
          helperText={errors.imagem?.message}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Categoria</InputLabel>
          <Select
            defaultValue=""
            {...register('categoria', { required: 'Categoria é obrigatória' })}
            error={!!errors.categoria}
          >
            {categories.map((category,index) => (
              <MenuItem key={index} value={category}>
                {category.descricao}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          label="Quantidade"
          type="number"
          {...register('quantidade', { required: 'Quantidade é obrigatória' })}
          error={!!errors.quantidade}
          helperText={errors.quantidade?.message}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Preço"
          type="number"
          {...register('preco', { required: 'Preço é obrigatório' })}
          error={!!errors.preco}
          helperText={errors.preco?.message}
        />

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Salvar
        </Button>
        <Button onClick={handleClose} sx={{ mt: 2, ml: 2 }}>
          Cancelar
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalProduto;
