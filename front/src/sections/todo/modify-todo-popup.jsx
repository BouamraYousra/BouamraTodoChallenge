import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { useAddTodo } from 'src/hooks/use-todo-requests';

export default function ModifyTodoPopup({ setTodosData }) {
  const [open, setOpen] = useState(false);
  const [taskContent, setTaskContent] = useState('');
  
  const { addTodo } = useAddTodo();
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setTaskContent(event.target.value);
  };

  const handleSubmitModif = async (event) => {
    event.preventDefault();
    const todos = await addTodo(taskContent);
    if(todos != null) {
      setTodosData(todos)
      handleClose();
    }
  };

  return (

    
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmitModif,
        }}
      >
        <DialogTitle>New Task</DialogTitle>
        <DialogContent>
          <DialogContentText>update your task</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="content"
            name="content"
            label="Task"
            type="text"
            fullWidth
            variant="standard"
            value={taskContent}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button type="submit" onClick={handleSubmitModif}>
            Modify
          </Button>
        </DialogActions>
      </Dialog>
  );
}
