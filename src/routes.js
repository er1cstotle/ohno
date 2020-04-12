import Login from 'pages/login';
import Dashboard from 'pages/dashboard';
import RetroShow from 'pages/retros/show';

export default [
  { path: '/login', page: Login },
  { path: '/', page: Dashboard, private: true },
  { path: '/r/:retroID', page: RetroShow, private: true }
];

export const loginPath = () => '/login';
export const dashboardPath = () => '/';
export const retroPath = (id) => `/r/${id}`;
