import Navbar from '../../components/Navbar/Navbar';

function Register({ user }) {
  return (
    <div>
      <Navbar user={user}/>
      <h1>Register Form</h1>
    </div>
  );
}

export default Register;