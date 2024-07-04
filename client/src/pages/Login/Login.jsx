import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';

function Login(props) {
  const [input, setInput] = useState({
    email: '',
    password: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInput(prev => {
      return {
        ...prev,
        [name]: value
      }
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = e.target;
    
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.value, password: password.value })
    });
    // console.log(response)
    const data = await response.json();
    console.log(data)
    props.login();
  }

  return (
    <div>
      <Navbar />
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email:</label>
        <input
          type='text'
          id='email'
          name='email'
          value={input.email}
          onChange={handleChange}
        />
        <label htmlFor='password'>Password:</label>
        <input
          type='text'
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