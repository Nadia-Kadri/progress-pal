import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

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
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          id='email'
          name='email'
          value={input.email}
          onChange={handleChange}
        />
        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          id='password'
          name='password'
          value={input.password}
          onChange={handleChange}
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}

export default Login;