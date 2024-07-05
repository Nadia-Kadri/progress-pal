import Navbar from '../../components/Navbar/Navbar';

function Dashboard({ checkAuth, user }) {
  const userData = user.user;

  return (
    <div>
      <Navbar checkAuth={() => checkAuth()} user={user}/>
      <h1>User Dashboard</h1>
      <h2>Hello, {userData.first_name}</h2>
    </div>
  );
}

export default Dashboard;