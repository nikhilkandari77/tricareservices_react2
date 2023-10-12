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
    title: 'Dashboard',
    path: '/admin/dashboard',
    icon: <Icon src='/assets/icons/navbar/NavIconDashboard.png' alt="Dashboard" />,
  },
  {
    title: 'Products',
    path: '/admin/products',
    icon: <Icon src='/assets/icons/navbar/NavIconProducts.png' alt="Products" />,
  },
  {
    title: 'Active Complaints',
    path: '/admin/task',
    icon: <Icon src='/assets/icons/navbar/NavIconTasks.png' alt="Complaints" />,
  },
  {
    title: 'Closed Complaints',
    path: '/admin/task-history',
    icon: <Icon src='/assets/icons/navbar/closedComplaints.png' alt="Complaints" />,
  },
  {
    title: 'Customers',
    path: '/admin/customers',
    icon: <Icon src='/assets/icons/navbar/NavIconCustomers.png' alt="Customers" />,
  },
  {
    title: 'Engineers',
    path: '/admin/engineers',
    icon: <Icon src='/assets/icons/navbar/NavIconEngineer.png' alt="Engineer" />,
  },
  {
    title: 'User Management',
    path: '/admin/usermanagement',
    icon: <Icon src='/assets/icons/navbar/UserMngmnt.png' alt="Engineer" />,
  },
    // {
  //   title: 'Reports',
  //   path: '/dashboard/reports',
  //   icon:<Icon src='/assets/icons/navbar/NavIconTasks.png' alt="Tasks" />,
  // },
];

export default navConfig;
