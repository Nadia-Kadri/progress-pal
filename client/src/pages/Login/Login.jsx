import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Login({checkAuth, user}) {
  const [input, setInput] = useState({ email: '', password: '' });
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setInput(prev => {
      return { ...prev, [name]: value }
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = e.target;

    login(email.value, password.value);
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
    <div>
      <Navbar user={user}/>
      <Container maxWidth='xs'>
        <Box sx={{ my: 4 }}>
          <Card variant='outlined' sx={{ padding: '14px'}}>
            <Typography component='h1' variant='h4' sx={{ mb: '14px' }}>
              Sign in
            </Typography>
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
              <FormControl>
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
              <FormControl>
                <FormLabel htmlFor='password'>Password:</FormLabel>
                <TextField
                  type='password'
                  id='password'
                  name='password'
                  value={input.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  sx={{
                    height: '40px',
                    '& .MuiInputBase-root': {
                      height: '100%'
                    }
                  }}
                />
              </FormControl>
              <Button type='submit' variant="outlined">Login</Button>
            </Box>
          </Card>
        </Box>
      </Container>
    </div>
  );
}

export default Login;