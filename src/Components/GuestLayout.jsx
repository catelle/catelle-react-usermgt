import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../contexts/contextprovider';

const GuestLayout = () => {
  const {token}= useStateContext();
  if(token){
    return <Navigate to='/'/>}
  return (
    <div className="login-signup-form animated fadeInDown">

					<div className="form">
            <Outlet /> {/* Renders the matched child route */}
          </div>
    </div>
  );
};

export default GuestLayout;
