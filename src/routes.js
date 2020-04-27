import Login from 'pages/login';
import Dashboard from 'pages/dashboard';
import BoardShow from 'pages/boards/show';

export const privateRoutes = [
  { path: '/', page: Dashboard },
  { path: '/b/:boardID', page: BoardShow }
];

export const publicRoutes = [
  { path: '/login', page: Login }
];

export const loginPath = () => '/login';
export const dashboardPath = () => '/';
export const boardPath = (id) => `/b/${id}`;
