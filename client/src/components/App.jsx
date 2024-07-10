import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Dashboard from '../pages/Dashboard/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import '../styles/global.css';
import '@fontsource/roboto/400.css';


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
    checkAuth();
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home checkAuth={() => checkAuth()} user={user} />
    },
    {
      path: 'login',
      element: <Login checkAuth={() => checkAuth()} user={user} />
    },
    {
      path: 'register',
      element: <Register checkAuth={() => checkAuth()} user={user} />
    },
    {
      path: 'dashboard',
      element: (
        <ProtectedRoute
          user={user}
          render={(user) => <Dashboard checkAuth={() => checkAuth()} user={user} />}
        />
      )
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
