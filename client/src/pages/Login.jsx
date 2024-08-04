import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function Login({ checkAuth, user }) {
  const [input, setInput] = useState({ email: '', password: '' });
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setInput(prev => {
      return { ...prev, [name]: value }
    });
    setErrorMessage('');
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await login(input.email, input.password);
  }

  async function login(email, password) {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (!response.ok) {
        setErrorMessage(data.message);
        throw new Error(`Response status: ${response.status}`);
      }
      await checkAuth();
      setRedirectToHome(true);
    } catch (err) {
      console.error(err);
    }
  }

  if (redirectToHome || user.isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
    <>
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
        <Typography component='h1' variant='h5' sx={{ mb: '14px' }}>
          Sign in
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            width: '100%'
            }}
        >
          <TextField
            error={errorMessage ? true : false}
            label='Email'
            type='email'
            id='email'
            name='email'
            value={input.email}
            onChange={handleChange}
            autoComplete='email'
            size='small'
            inputProps={{ maxLength: 254 }}
          />
          <TextField
            error={errorMessage ? true : false}
            helperText = {errorMessage ? 'Invalid email or password' : ''}
            label='Password'
            type='password'
            id='password'
            name='password'
            value={input.password}
            onChange={handleChange}
            autoComplete="current-password"
            size='small'
            inputProps={{ maxLength: 255 }}
          />
          <Button type='submit' variant="contained">Login</Button>
          <Link to="/register">Don&#39;t have an account? Sign Up</Link>
        </Box>
      </Box>
    </Container>
    </>
  );
}

export default Login;