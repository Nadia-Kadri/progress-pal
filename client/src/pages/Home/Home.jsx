import Dashboard from './Dashboard/Dashboard';
import Welcome from './Welcome/Welcome';

function Home({ checkAuth, user }) {
  if (user.isAuthenticated) {
    return <Dashboard checkAuth={checkAuth} user={user} />;
  } else {
    return <Welcome checkAuth={checkAuth} user={user} />;
  }
}

export default Home;