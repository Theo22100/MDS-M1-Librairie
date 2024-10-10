import { Navigate } from 'react-router-dom';
import { getUserAdminFromToken } from '../utils/tokenUtils'; 

const AdminRoute = ({ element: Component }) => {
  const isAdmin = getUserAdminFromToken(); 

  return isAdmin ? <Component /> : <Navigate to="/home" />; 
};

export default AdminRoute;
