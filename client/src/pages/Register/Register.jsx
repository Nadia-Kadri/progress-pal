import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
      <Box sx={{  my: 4 }}>
        <Card variant='outlined' sx={{ padding: '14px' }}>
          <Typography component='h1' variant='h4' sx={{ mb: '14px' }}>Sign Up</Typography>
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
              <FormControl>
                <FormLabel htmlFor='first_name'>First Name:</FormLabel>
                <TextField
                  type='text'
                  id='first_name'
                  name='first_name'
                  value={input.first_name}
                  onChange={handleChange}
                  autoComplete='given-name'
                  sx={{
                    height: '40px',
                    '& .MuiInputBase-root': {
                      height: '100%'
                    }
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <FormLabel htmlFor='last_name'>Last Name:</FormLabel>
                <TextField
                  type='text'
                  id='last_name'
                  name='last_name'
                  value={input.last_name}
                  onChange={handleChange}
                  autoComplete='family-name'
                  sx={{
                    height: '40px',
                    '& .MuiInputBase-root': {
                      height: '100%'
                    }
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ width: '100%' }}>
                <FormLabel htmlFor='email'>Email:</FormLabel>
                <TextField
                  type='email'
                  id='email'
                  name='email'
                  value={input.email}
                  onChange={handleChange}
                  autoComplete='email'
                  sx={{
                    height: '40px',
                    '& .MuiInputBase-root': {
                      height: '100%'
                    }
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ width: '100%' }}>
                <FormLabel htmlFor='password'>Password:</FormLabel>
                <TextField
                  type='password'
                  id='password'
                  name='password'
                  value={input.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  sx={{
                    height: '40px',
                    '& .MuiInputBase-root': {
                      height: '100%'
                    }
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
            
            <Button type='submit' variant="outlined">Register</Button>
          </Box>
        </Card>
      </Box>
    </Container>
    </>
  );
}

export default Register;