import { TextField } from '@mui/material';

function TextInput({ label, name, value, handleChange }) {
  return (
    <TextField
      label={label}
      type='text'
      id={name}
      name={name}
      size='small'
      value={value}
      onChange={handleChange}
      InputLabelProps={{
        shrink: true,
      }}
      autoComplete='off'
    />
  );
}

export default TextInput;