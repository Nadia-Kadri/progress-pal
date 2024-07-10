import Navbar from '../../components/Navbar/Navbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function Dashboard({ checkAuth, user }) {
  const userData = user.user;

  return (
    <>
    <Navbar checkAuth={() => checkAuth()} user={user}/>
    <Container maxWidth='xs'>
      <Box sx={{  my: 4 }}>
        <h1>User Dashboard</h1>
        <h2>Hello, {userData.first_name}</h2>
      </Box>
    </Container>
    </>
  );
}

export default Dashboard;