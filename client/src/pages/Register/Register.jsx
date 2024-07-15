import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function Register({ checkAuth, user }) {
  const [input, setInput] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setInput(prev => { 
      return { ...prev, [name]: value }
     });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { first_name, last_name, email, password } = e.target;

    register(first_name.value, last_name.value, email.value, password.value)
  }

  async function register(first_name, last_name, email, password) {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name, last_name, email, password })
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      await checkAuth();
      setRedirectToDashboard(true);
    } catch (err) {
      console.error(err.message);
    }
  }

  if (redirectToDashboard || user.isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <>
    <Navbar user={user}/>
    <Container maxWidth='xs'>
      <Box sx={{
        my: 4, 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5' sx={{ mb: '14px' }}>Sign Up</Typography>
        <Box
          component='form'
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label='First Name'
                type='text'
                id='first_name'
                name='first_name'
                value={input.first_name}
                onChange={handleChange}
                autoComplete='given-name'
                size='small'
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label='Last Name'
                type='text'
                id='last_name'
                name='last_name'
                value={input.last_name}
                onChange={handleChange}
                autoComplete='family-name'
                size='small'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Email'
                type='email'
                id='email'
                name='email'
                value={input.email}
                onChange={handleChange}
                autoComplete='email'
                size='small'
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Password'
                type='password'
                id='password'
                name='password'
                value={input.password}
                onChange={handleChange}
                autoComplete="new-password"
                size='small'
                sx={{ width: '100%' }}
              />
            </Grid>
          </Grid>
          <Button type='submit' variant="contained">Register</Button>
          <Link to="/login">Already have an account? Sign In</Link>
        </Box>
      </Box>
    </Container>
    </>
  );
}

export default Register;