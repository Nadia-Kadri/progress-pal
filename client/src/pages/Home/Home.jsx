import Dashboard from './Dashboard/Dashboard';
import Welcome from './Welcome';

function Home({ user }) {
  if (user.isAuthenticated) {
    return <Dashboard user={user} />;
  } else {
    return <Welcome />;
  }
}

export default Home;