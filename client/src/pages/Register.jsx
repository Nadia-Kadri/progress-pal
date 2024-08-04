import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Container, Box, Grid, TextField, Button, Typography, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Register({ checkAuth, user }) {
  const [input, setInput] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [emailValidation, setEmailValidation] = useState('');
  const [passwordError, setPasswordError] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setInput(prev => { 
      return { ...prev, [name]: value }
     });

    if (name === 'email') {
      setEmailError('');
      setEmailValidation('');
    }

    if (name === 'password') {
      setPasswordError('');
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!emailRegex.test(input.email)) {
      setEmailValidation('Invalid email address');
      return;
    }

    if (input.password.length < 6) {
      setPasswordError('Minimum 6 characters required.');
      return;
    }

    register(input.first_name, input.last_name, input.email, input.password);
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
      const data = await response.json();
      if (!response.ok) {
        setEmailError(data.message);
        throw new Error(`Response status: ${response.status}`);
      }
      await checkAuth();
      setRedirectToHome(true);
    } catch (err) {
      console.error(err.message);
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
                inputProps={{ maxLength: 50 }}
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
                inputProps={{ maxLength: 50 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!emailValidation || !!emailError}
                helperText={
                  emailValidation || (
                    emailError ? (
                      <>
                        Email is already in use. Please use a different email or
                        <Link to="/login"> log in.</Link>
                      </>
                    ) : ''
                  )
                }
                label='Email'
                type='email'
                id='email'
                name='email'
                value={input.email}
                onChange={handleChange}
                autoComplete='email'
                size='small'
                sx={{ width: '100%' }}
                inputProps={{ maxLength: 254 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!!passwordError}
                helperText={passwordError || 'Passwords must be at least 6 characters.'}
                label='Password'
                type='password'
                id='password'
                name='password'
                value={input.password}
                onChange={handleChange}
                autoComplete="new-password"
                size='small'
                sx={{ width: '100%' }}
                inputProps={{ maxLength: 255 }}
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