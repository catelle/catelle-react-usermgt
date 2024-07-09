import { createBrowserRouter } from 'react-router-dom';
import Login from './views/Login.jsx';
import Register from './views/Register.jsx';
import DefaultLayout from './Components/DefaultLayout.jsx';
import GuestLayout from './Components/GuestLayout.jsx';
import Users from './views/Users.jsx';
import Notfoundview from './views/Notfounview.jsx';
import Dashboard from './views/Dashboard.jsx';
import UserForm from './views/UserForm.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'users/new',
        element: <UserForm  key='userCreate'/>,
      },
      {
        path: 'users/:id',
        element: <UserForm  key='userUpdate'/>,
      },
      
    ],
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
  {
    path: '*',
    element: <Notfoundview />,
  },
]);

export default router;
