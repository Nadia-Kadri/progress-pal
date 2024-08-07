import { useState } from 'react';
import { format } from 'date-fns';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Modal, Box, Button, InputLabel, Input, FormControl, TextField, Grid, Autocomplete } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ColorPicker from './ColorPicker';

function CreateHabitModal({ getUserHabits, setSelectedDate }) {
  const today = new Date();
  const expireDate = new Date(today);
  expireDate.setFullYear(today.getFullYear() + 1);

  const initialInputState = {
    name: '',
    description: '',
    icon: '',
    color: '#90caf9',
    amount: '',
    unit: '',
    created_at: format(today, "yyyy-MM-dd"),
    expired_at: format(expireDate, "yyyy-MM-dd")
  }

  const [input, setInput] = useState(initialInputState);
  const [open, setOpen] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [unitAutoVal, setUnitAutoVal] = useState('');

  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setInput(prev => {
      return { ...prev, [name]: value}
    });
  }
  
  const handleEmojiSelect = (emoji) => {
    setInput(prev => {
      return { ...prev, icon: emoji.native }
    });
    setShowPicker(false);
  }

  const handleColorChange = (color) => {
    setInput(prev => {
      return { ...prev, color: color }
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    await createHabit(input);
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
    <Button sx={{ py: '8.75px', width: '100%' }} onClick={handleModalOpen}>
      Create a new habit
      <AddCircleOutlineIcon />
    </Button>
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={modalStyle}>
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
            label='Habit Name'
            type='text'
            id='name'
            name='name'
            size='small'
            value={input.name}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            autoComplete='off'
          />
          <TextField
            label='Description (Optional)'
            type='text'
            id='description'
            name='description'
            size='small'
            value={input.description}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            autoComplete='off'
          />
          <Grid container spacing={0} sx={{ margin: '0px' }}>
            <Grid item xs={3} style={{ padding: '0px' }}>
              <TextField
                label='Icon & Color'
                type='text'
                id='icon'
                name='icon'
                size='small'
                value={input.icon}
                onChange={handleChange}
                onClick={() => setShowPicker(!showPicker)}
                InputLabelProps={{
                  shrink: true,
                }}
                autoComplete='off'
              />
              {showPicker && (
                <div style={{ position: 'absolute', top: '50%', left: '22px', transform: 'translateY(-50%)', zIndex: 1000 }}>
                  <Picker
                    data={data}
                    onEmojiSelect={handleEmojiSelect}
                    theme='light'
                    skinTonePosition='search'
                    previewPosition='none'
                    emojiButtonSize='30'
                    emojiSize='22'
                    categories='people, nature, foods, activity, places, objects, symbols, flags'
                  />
                </div>
              )}
            </Grid>
            <Grid item xs={3} style={{ padding: '0px', display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
              <ColorPicker selectedColor={input.color} onChange={handleColorChange} />
            </Grid>
          </Grid>
          <Grid container spacing={0} sx={{ margin: '0px' }}>
            <Grid item xs={3} style={{ padding: '0px' }}>
              <TextField
                label='Goal'
                type='number'
                id='amount'
                name='amount'
                size='small'
                value={input.amount}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                autoComplete='off'
              />
            </Grid>
            <Grid item xs={5} style={{ padding: '0px' }} >
              <Autocomplete
                freeSolo
                disablePortal
                options={unitOptions}
                value={unitAutoVal}
                onChange={(event, newVal) => {
                  const unit = newVal ? newVal.label : '';
                  setUnitAutoVal(unit);
                  setInput(prev => ({ ...prev, unit }));
                }}
                inputValue={unitAutoVal}
                onInputChange={(event, newVal) => {
                  setUnitAutoVal(newVal);
                  setInput(prev => ({ ...prev, unit: newVal }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Unit'
                    type='text'
                    id='unit'
                    name='unit'
                    size='small'
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>

          <FormControl variant='standard'>
            <InputLabel htmlFor='created_at'>Start</InputLabel>
            <Input
              type='date'
              name='created_at'
              id='created_at'
              value={input.created_at}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl variant='standard'>
            <InputLabel htmlFor='expired_at'>End</InputLabel>
            <Input
              type='date'
              name='expired_at'
              id='expired_at'
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

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
};

const unitOptions = [
  { label: 'count' },
  { label: 'steps' },
  { label: 'm' },
  { label: 'km' },
  { label: 'mile' },
  { label: 'sec' },
  { label: 'min' },
  { label: 'hr' },
  { label: 'ml' },
  { label: 'oz' },
  { label: 'cal' },
  { label: 'g' },
  { label: 'mg' }
];

export default CreateHabitModal;