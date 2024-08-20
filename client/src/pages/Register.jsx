import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Container, Box, Grid, TextField, Button, Typography, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function Register({ checkAuth, user }) {
  const [input, setInput] = useState({ first_name: '', last_name: '', email: '', password: '' });
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput(prev => ({ ...prev, [name]: value }));
    if (name === 'email' || name === 'password') {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateInput = () => {
    let isValid = true;
    if (!emailRegex.test(input.email)) {
      setErrors(prev => ({ ...prev, email: 'Invalid email address' }));
      isValid = false;
    }
    if (input.password.length < 6) {
      setErrors(prev => ({ ...prev, password: 'Minimum 6 characters required.' }));
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateInput()) return;
    register(input);
  };

  const register = async ({ first_name, last_name, email, password }) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ first_name, last_name, email, password })
      });
      if (!response.ok) {
        setErrors(prev => ({ ...prev, email: 'Email is already in use. Please use a different email or login.' }));
        throw new Error(`Response status: ${response.status}`);
      }
      await checkAuth();
      setRedirectToHome(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  if (redirectToHome || user.isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
    <Container maxWidth='xs'>
      <Box sx={styles.box}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5' sx={{ mb: '14px' }}>Sign Up</Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={styles.form}>
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
                error={!!errors.email}
                helperText={errors.email}
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
                error={!!errors.password}
                helperText={errors.password || 'Passwords must be at least 6 characters.'}
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
          <Link to="/login" style={{ textDecoration: 'none' }}>Already have an account? Sign In</Link>
        </Box>
      </Box>
    </Container>
  );
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const styles = {
  box: {
    my: 4, 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3
  }
};

export default Register;