import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import Customerdetail from './pages/Customerdetail';
import Complaintdetail from './pages/Complaintdetail';
import Engineers from './pages/Engineers'
import Engineersdetail from './pages/Engineersdetail';
import Login from './pages/Login'

import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import Task from './pages/Task';
import Taskdetail from './pages/Taskdetail';
import DashboardAppPage from './pages/DashboardAppPage';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout  />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'customers', element: <UserPage /> },
        {path: 'task', element: <Task /> },
        {path: 'taskdetail', element: <Taskdetail/>},
        {path:'complaintdetail', element:<Complaintdetail/>},
        { path: 'customerdetail', element: <Customerdetail /> },
        {path: 'engineers', element: <Engineers />},
        {path:'engineersdetail', element: <Engineersdetail/>},
        {path:'login', element: <Login/>},
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
