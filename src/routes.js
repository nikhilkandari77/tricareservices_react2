import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import Usermanagement from './pages/Usermanagement';
import Admin from './pages/Admin';
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
import TaskHistory from './pages/TaskHistory';
import DashboardAppPage from './pages/DashboardAppPage';
import TaskHistoryDetail from './pages/TaskHistoryDetail';
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
        {path:'task-history',element:<TaskHistory/>},
        {path: 'taskdetail', element: <Taskdetail/>},
        {path:'task-history-details', element:<TaskHistoryDetail/>},
        { path: 'customerdetail', element: <Customerdetail /> },
        {path: 'engineers', element: <Engineers />},
        {path:'engineersdetail', element: <Engineersdetail/>},
        {path:'login', element: <Login/>},
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        {path: 'admin', element: <Admin/> },
        {path: 'usermanagement', element: <Usermanagement/>},
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
