import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Dashboard from '../pages/Dashboard/Dashboard';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [user, setUser] = useState({ isAuthenticated: false, user: null });

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch('api/auth/check');
  //     if (!response.ok) {
  //       throw new Error(`Response status: ${response.status}`);
  //     }
  //     const result = await response.json();
  //     setUser({ isAuthenticated: result.isAuthenticated, user: result.user });
  //   }
  //   fetchData();
  // }, []);
  
  async function login() {
    const response = await fetch('api/auth/check');
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    setUser({ isAuthenticated: result.isAuthenticated, user: result.user });
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: 'login',
      element: <Login login={() => login()} />
    },
    {
      path: 'register',
      element: <Register />
    },
    {
      path: 'dashboard',
      element: (
        <ProtectedRoute isAuthenticated={user.isAuthenticated} user={user.user}>
          <Dashboard />
        </ProtectedRoute>
      )
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
