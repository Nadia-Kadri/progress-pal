import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

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
        console.log(response);
      }
    } catch (err) {
      console.error(err);
    }
    await checkAuth();
    setRedirectToDashboard(true);
  }

  if (redirectToDashboard || user.isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <div>
      <Navbar user={user}/>
      <h1>Register Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='first_name'>First Name:</label>
        <input
          type='text'
          id='first_name'
          name='first_name'
          value={input.first_name}
          onChange={handleChange}
        />
        <label htmlFor='last_name'>Last Name:</label>
        <input
          type='text'
          id='last_name'
          name='last_name'
          value={input.last_name}
          onChange={handleChange}
        />
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
        <button type='submit'>Register</button>
      </form>
    </div>
  );
}

export default Register;