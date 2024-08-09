import { Box, Typography } from '@mui/material';

function IconWithText({ icon: Icon, color, days, text }) {
  return (
    <Box sx={{ width: '121px', height: '121px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Icon fontSize='large' sx={{ color }} />
      <Typography>
        <Typography variant='h5' fontWeight='bold' component='span'>{days}</Typography>
        <Typography variant='caption' component='span'> {days === 1 ? 'Day' : 'Days'}</Typography>
      </Typography>
      <Typography variant='body2'>{text}</Typography>
    </Box>
  )
}

export default IconWithText;