import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';

function Home({user}) {
  return (
    <div>
      <Navbar user={user} />
      <h1>Welcome to Progresspal!</h1>
      <Link to='/login'>Login</Link>
      <Link to='/register'>Register</Link>
    </div>
  );
}

export default Home;