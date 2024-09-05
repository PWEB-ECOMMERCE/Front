import React from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
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

const ModalCategoria = ({ open, handleClose, onSave }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    onSave(data);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} component="form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Adicionar Categoria</h2>

        <TextField
          fullWidth
          margin="normal"
          label="Descrição"
          {...register('descricao', { required: 'Descrição é obrigatória' })}
          error={!!errors.descricao}
          helperText={errors.descricao?.message}
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

export default ModalCategoria;
