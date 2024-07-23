import { useState } from 'react';
import { format } from 'date-fns';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
};

function CreateHabitModal({ getUserHabits, setSelectedDate }) {
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  const initialInputState = {
    name: '',
    description: '',
    icon: '',
    color: '#000000',
    amount: '',
    unit: '',
    frequency: '',
    created_at: format(new Date(), "yyyy-MM-dd"),
    expired_at: '9999-12-31'
  }
  const [input, setInput] = useState(initialInputState);

  function handleChange(e) {
    const { name, value } = e.target;
    setInput(prev => {
      return { ...prev, [name]: value}
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    createHabit(input);
    setSelectedDate(new Date());
    await getUserHabits();
    setOpen(false);
    setInput(initialInputState);
  }

  async function createHabit(input) {
    try {
      const response = await fetch('/api/new/habit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input)
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <>
    <Button sx={{ marginTop: '8px' }} onClick={handleModalOpen}>
      Create a new habit
      <AddCircleOutlineIcon />
    </Button>
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Box
          component='form'
          onSubmit={handleSubmit}
          noValidate
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5
          }}
        >
          <TextField
            label='Name'
            type='text'
            id='name'
            name='name'
            size='small'
            value={input.name}
            onChange={handleChange}
          />
          <TextField
            label='Description'
            type='text'
            id='description'
            name='description'
            size='small'
            value={input.description}
            onChange={handleChange}
          />
          <Grid container spacing={0} sx={{ margin: '0px' }}>
            <Grid item xs={3} style={{ padding: '0px' }}>
              <TextField
                label='Icon'
                type='text'
                id='icon'
                name='icon'
                size='small'
                value={input.icon}
                onChange={handleChange}
              />
              
            </Grid>
            <Grid item xs={3} style={{ padding: '0px' }}>
              <InputLabel htmlFor='color'>Color</InputLabel>
              <input
                type="color"
                id="color"
                name="color"
                value={input.color}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={0} sx={{ margin: '0px' }}>
            <Grid item xs={5} style={{ padding: '0px' }}>
              <TextField
                label='Amount'
                type='number'
                id='amount'
                name='amount'
                size='small'
                value={input.amount}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={2} style={{ padding: '0px' }} >
              <TextField
                label='Unit'
                type='text'
                id='unit'
                name='unit'
                size='small'
                value={input.unit}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={5} style={{ padding: '0px' }} >
              <TextField
                label='Frequency'
                type='text'
                id='frequency'
                name='frequency'
                size='small'
                value={input.frequency}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <FormControl variant='standard'>
            <InputLabel htmlFor='created_at' shrink={true}>Start</InputLabel>
            <Input
              type='date'
              id='created_at'
              name='created_at'
              value={input.created_at}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl variant='standard'>
            <InputLabel htmlFor='expired_at' shrink={true}>End</InputLabel>
            <Input
              type='date'
              id='expired_at'
              name='expired_at'
              value={input.expired_at}
              onChange={handleChange}
            />
          </FormControl>
          <Button type='submit' variant="contained">Create</Button>   
        </Box>
      </Box>
    </Modal>
    </>
  )
}

export default CreateHabitModal;