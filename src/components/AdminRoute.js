import { Route,  NavLink, Navigate } from 'react-router-dom';
import AdminOrders from './AdminOrders';

const AdminRoute = ({  isAdmin, component}) => {
  if(!isAdmin) {
    return <Navigate to={'/dashboard'} replace></Navigate>
  }
  return component?component:<AdminOrders/>
};
export default AdminRoute;