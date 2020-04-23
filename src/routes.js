import Login from 'pages/login';
import Dashboard from 'pages/dashboard';
import BoardShow from 'pages/boards/show';

export const privateRoutes = [
  { path: '/', page: Dashboard, private: true },
  { path: '/b/:boardID', page: BoardShow, private: true }
];

export const publicRoutes = [
  { path: '/login', page: Login }
];

export const loginPath = () => '/login';
export const dashboardPath = () => '/';
export const boardPath = (id) => `/r/${id}`;
