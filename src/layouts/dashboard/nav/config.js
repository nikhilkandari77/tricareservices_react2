// component
// import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

// const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

// Custom component for rendering PNG icons
// eslint-disable-next-line react/prop-types
import { NavLink } from "react-router-dom";


const Icon = ({ src, alt }) => <img src={src} alt={alt} />;





const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: <Icon src='/assets/icons/navbar/NavIconDashboard.png' alt="Dashboard" />,
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: <Icon src='/assets/icons/navbar/NavIconProducts.png' alt="Products" />,
  },
 {
    title: 'Active Complaints',
    path: '/dashboard/task',
    icon: <Icon src='/assets/icons/navbar/NavIconTasks.png' alt="Complaints" />,
  },
  {
    title: 'Closed Complaints',
    path: '/dashboard/task-history',
    icon: <Icon src='/assets/icons/navbar/closedComplaints.png' alt="Complaints" />,
  }, 



  {
    title: 'Customers',
    path: '/dashboard/customers',
    icon: <Icon src='/assets/icons/navbar/NavIconCustomers.png' alt="Customers" />,
  },
  {
    title: 'Engineers',
    path: '/dashboard/engineers',
    icon: <Icon src='/assets/icons/navbar/NavIconEngineer.png' alt="Engineer" />,
  },
  {
    title: 'User Management',
    path: '/dashboard/usermanagement',
    icon: <Icon src='/assets/icons/navbar/NavIconCustomers.png' alt="Engineer" />,
  },
  // {
  //   title: 'Reports',
  //   path: '/dashboard/reports',
  //   icon:<Icon src='/assets/icons/navbar/NavIconTasks.png' alt="Tasks" />,
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
