import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ user, children }) {
  if (!user) {
    console.log(user)
    return <Navigate to="/Landing" replace />;
  }

  return children;
}