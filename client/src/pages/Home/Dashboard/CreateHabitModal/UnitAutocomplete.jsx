import { TextField, Autocomplete } from '@mui/material';

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

function UnitAutocomplete() {

  return (
    <Autocomplete
      disablePortal
      options={unitOptions}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Unit'
          size='small'
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
    />
  );
}

export default UnitAutocomplete;