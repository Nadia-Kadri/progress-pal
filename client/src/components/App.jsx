import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Navbar from './Navbar';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import '@fontsource/roboto/400.css';
import '../styles/global.css';

function App() {
  const [user, setUser] = useState({ isAuthenticated: false, user: null });
  
  async function checkAuth() {
    const response = await fetch('api/auth/check');
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    setUser({ isAuthenticated: result.isAuthenticated, user: result.user });
  }

  useEffect(() => {
    async function fetchAuthStatus() {
      await checkAuth();
    }
    fetchAuthStatus();
  }, []);

  return (
    <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar checkAuth={checkAuth} user={user} />
        <Routes>
          <Route path='/' element={<Home user={user} />} />
          <Route path='login' element={<Login checkAuth={checkAuth} user={user} />} />
          <Route path='register' element={<Register checkAuth={checkAuth} user={user} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </>
  );
}

export default App;
