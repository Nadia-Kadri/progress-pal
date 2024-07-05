import { Navigate } from 'react-router-dom';

function ProtectedRoute({ user, render }) {
  if (!user.isAuthenticated) {
    return <Navigate to='/' />;
  }
  return render(user);
}

export default ProtectedRoute;