import { Link } from 'react-router-dom';

function Navbar({ checkAuth, user }) {
  

  function handleClick(e) {
    console.log(e.target)
    logout();
  }

  async function logout() {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST'
      });
      if (!response.ok) {
        console.log(response);
      } else {
        await checkAuth();
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/login'>Login</Link>
      <Link to='/register'>Register</Link>
      <Link to='/dashboard'>Dashboard</Link>
      {user.isAuthenticated ? <button onClick={handleClick}>Logout</button> : null}
    </nav>
  );
}

export default Navbar;