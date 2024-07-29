import { useState } from 'react';
import { Box, Menu, MenuItem, IconButton } from '@mui/material';

const colorOptions = [
  '#FF6633', '#00B3E6', '#E6B333', '#3366E6', '#999966', 
  '#99FF99', '#B34D4D', '#80B300', '#809900', '#E6B3B3', 
  '#6680B3', '#66991A', '#CCFF1A', '#FF1A66', '#E6331A', 
  '#33FFCC', '#66994D', '#B366CC', '#4D8000', '#B33300', 
  '#66664D', '#991AFF', '#4DB3FF', '#1AB399', '#E666B3', 
  '#33991A', '#FFB399', '#FF33FF', '#FF3380', '#4D80CC'
];

function ColorPicker({ selectedColor, onChange }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSelectColor = (color) => {
    onChange(color);
    handleClose();
  };

  return (
    <Box>
      <IconButton
        onClick={handleClick}
        style={{
          backgroundColor: selectedColor,
          width: '25px',
          height: '25px',
          borderRadius: '50%',
          border: '1px solid #ccc'
        }}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridTemplateRows: 'repeat(6, 1fr)' }}>
          {colorOptions.map((color, index) => (
            <MenuItem key={index} onClick={() => handleSelectColor(color)}>
              <Box
                sx={{
                  backgroundColor: color,
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  margin: '4px',
                  cursor: 'pointer'
                }}
              />
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </Box>
  );
}

export default ColorPicker;
