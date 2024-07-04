import Navbar from '../../components/Navbar/Navbar';

function Dashboard({ user }) {
  return (
    <div>
      <Navbar />
      <h1>User Dashboard</h1>
      <h2>Hello, {user.first_name}</h2>
      {console.log(user.first_name)}
    </div>
  );
}

export default Dashboard;